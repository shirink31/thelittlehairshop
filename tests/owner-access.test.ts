import { afterAll, beforeAll, expect, test } from "bun:test";
import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";

const db = new PGlite();
const sandy = "shirin@thesdhome.com";
const oldSandy = "sandy_deboer@yahoo.com";
let sequence = 0;

beforeAll(async () => {
  await db.exec(`
    CREATE ROLE anon; CREATE ROLE authenticated;
    CREATE SCHEMA auth;
    CREATE TABLE auth.users (id uuid PRIMARY KEY, email text, email_confirmed_at timestamptz, last_sign_in_at timestamptz);
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
    CREATE TABLE public.user_roles (user_id uuid, role public.app_role, UNIQUE(user_id, role));
    CREATE SCHEMA storage;
    CREATE TABLE storage.objects (id uuid PRIMARY KEY, bucket_id text, name text);
    GRANT USAGE ON SCHEMA storage, auth TO authenticated, anon;
    GRANT SELECT, UPDATE ON storage.objects TO authenticated, anon;
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$ SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path='' AS $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) $$;
    CREATE POLICY public_read ON storage.objects FOR SELECT USING (bucket_id='portfolio');
    INSERT INTO storage.objects VALUES ('11111111-1111-1111-1111-111111111111', 'portfolio', 'original.jpg');
  `);
  await db.exec(await readFile(new URL("../drizzle/migrations/0002_confirmed_sandy_owner.sql", import.meta.url), "utf8"));
  await db.exec(await readFile(new URL("../drizzle/migrations/0003_owner_update_portfolio_files.sql", import.meta.url), "utf8"));
  await db.exec((await readFile(new URL("../drizzle/migrations/0004_owner_email_shirin.sql", import.meta.url), "utf8")).replace(/--> statement-breakpoint/g, ""));
});
afterAll(async () => { await db.close(); });

async function account(email: string, confirmed = false) {
  const id = `00000000-0000-0000-0000-${String(++sequence).padStart(12, "0")}`;
  await db.query("INSERT INTO auth.users VALUES ($1, $2, $3, NULL)", [id, email, confirmed ? "2026-10-19T22:36:00Z" : null]);
  return id;
}
async function owners(id: string) {
  const { rows } = await db.query<{ count: number }>("SELECT count(*)::int AS count FROM public.user_roles WHERE user_id=$1 AND role='admin'", [id]);
  return rows[0]?.count;
}

test("unconfirmed Sandy receives nothing until email confirmation", async () => {
  const id = await account(sandy);
  expect(await owners(id)).toBe(0);
  await db.query("UPDATE auth.users SET email_confirmed_at=now() WHERE id=$1", [id]);
  expect(await owners(id)).toBe(1);
});
test("exact matching is case-insensitive", async () => {
  const id = await account("SHIRIN@THESDHOME.COM", true);
  expect(await owners(id)).toBe(1);
});
test("no other email including whitespace or aliases receives owner", async () => {
  for (const email of ["visitor@example.com", oldSandy, "shirin+other@thesdhome.com", " shirin@thesdhome.com", "shirin@thesdhome.com ", "shirin@thesdhome.com.evil"]) {
    const id = await account(email, true);
    expect(await owners(id)).toBe(0);
  }
});
test("sign-in assigns only confirmed Sandy and never duplicates the role", async () => {
  const id = await account(sandy, true);
  await db.query("DELETE FROM public.user_roles WHERE user_id=$1", [id]);
  await db.query("UPDATE auth.users SET last_sign_in_at=now() WHERE id=$1", [id]);
  expect(await owners(id)).toBe(1);
  await db.query("UPDATE auth.users SET last_sign_in_at=now() WHERE id=$1", [id]);
  expect(await owners(id)).toBe(1);
  const unconfirmed = await account(sandy);
  await db.query("UPDATE auth.users SET last_sign_in_at=now() WHERE id=$1", [unconfirmed]);
  expect(await owners(unconfirmed)).toBe(0);
});
test("owner access is revoked if Sandy changes to a different email or becomes unconfirmed", async () => {
  const id = await account(sandy, true);
  await db.query("UPDATE auth.users SET email='different@example.com' WHERE id=$1", [id]);
  expect(await owners(id)).toBe(0);
  const unconfirmed = await account(sandy, true);
  await db.query("UPDATE auth.users SET email_confirmed_at=NULL WHERE id=$1", [unconfirmed]);
  expect(await owners(unconfirmed)).toBe(0);
});
test("visitors and signed-in users cannot invoke role assignment directly", async () => {
  const { rows } = await db.query<{ allowed: boolean }>("SELECT has_function_privilege('anon','public.sync_confirmed_sandy_owner()','EXECUTE') OR has_function_privilege('authenticated','public.sync_confirmed_sandy_owner()','EXECUTE') AS allowed");
  expect(rows[0]?.allowed).toBe(false);
});
test("only the owner can replace or rename portfolio files and cannot move them to another bucket", async () => {
  const owner = await account(sandy, true);
  const visitor = await account('not-sandy@example.com', true);
  for (const [role, userId, expected] of [['anon', '', 0], ['authenticated', visitor, 0], ['authenticated', owner, 1]] as const) {
    await db.query("SELECT set_config('request.jwt.claim.sub', $1, false)", [userId]);
    await db.exec(`SET ROLE ${role}`);
    try {
      const result = await db.query("UPDATE storage.objects SET name='updated.jpg' WHERE id='11111111-1111-1111-1111-111111111111' RETURNING id");
      expect(result.rows.length).toBe(expected);
      const read = await db.query("SELECT name FROM storage.objects WHERE bucket_id='portfolio'");
      expect(read.rows.length).toBe(1);
      if (expected === 1) {
        await expect(db.query("UPDATE storage.objects SET bucket_id='other' WHERE id='11111111-1111-1111-1111-111111111111'")).rejects.toThrow();
      }
    } finally {
      await db.exec('RESET ROLE');
    }
  }
});