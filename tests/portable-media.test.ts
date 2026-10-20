import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const expectedFiles = [
  "balayage-1.jpg",
  ...Array.from({ length: 6 }, (_, i) => `bridal-${i + 1}.jpg`),
  ...Array.from({ length: 6 }, (_, i) => `color-${i + 1}.jpg`),
  ...[3340, 3344, 3345, 3348, 7531, 7532, 7533, 7534, 7539, 7540, 8362, 8368].map((n) => `ext-IMG_${n}.jpg`),
  "ext-before-after.jpg",
  "ext-IMG_7536.mp4", "ext-IMG_7538.mp4",
  "ext-IMG_7536-poster.jpg", "ext-IMG_7538-poster.jpg",
  "sandy-portrait.jpg", "salon-interior.jpg",
];

describe("independent media hosting", () => {
  test("all 32 approved originals exist under public/images", () => {
    expect(readdirSync(resolve(root, "public/images")).sort()).toEqual(expectedFiles.sort());
  });

  test("all photo-page media paths resolve locally without hosted asset imports", () => {
    for (const name of ["index", "about", "portfolio"]) {
      const source = readFileSync(resolve(root, `src/routes/${name}.tsx`), "utf8");
      expect(source.includes(".asset.json")).toBe(false);
      expect(source.includes("/__" + "l5e/")).toBe(false);
      const paths = Array.from(source.matchAll(/"(\/images\/[^"\n]+)"/g), (match) => match[1]);
      expect(paths.length).toBeGreaterThan(0);
      for (const path of paths) expect(existsSync(resolve(root, `public${path}`))).toBe(true);
    }
  });

  test("Netlify builds with bun, publishes dist, and selects its Nitro adapter", () => {
    const config = readFileSync(resolve(root, "netlify.toml"), "utf8");
    expect(config).toContain('command = "bun run build"');
    expect(config).toContain('publish = "dist"');
    expect(config).toContain('NITRO_PRESET = "netlify"');
    expect(readFileSync(resolve(root, "vite.config.ts"), "utf8")).toContain('publicDir: "dist"');
  });
});