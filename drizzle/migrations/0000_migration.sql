create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.claim_owner()
returns boolean language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    return public.has_role(auth.uid(), 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end $$;
revoke execute on function public.claim_owner() from public, anon;
grant execute on function public.claim_owner() to authenticated;

create table public.portfolio_photos (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  category text not null check (category in ('Balayage','Extensions','Babylights','Bridal')),
  ai_category text,
  created_at timestamptz not null default now()
);
grant select on public.portfolio_photos to anon, authenticated;
grant insert, update, delete on public.portfolio_photos to authenticated;
grant all on public.portfolio_photos to service_role;
alter table public.portfolio_photos enable row level security;
create policy "Anyone can view portfolio" on public.portfolio_photos for select to anon, authenticated using (true);
create policy "Owner can add photos" on public.portfolio_photos for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Owner can edit photos" on public.portfolio_photos for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Owner can remove photos" on public.portfolio_photos for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Anyone can view portfolio images" on storage.objects for select to anon, authenticated using (bucket_id = 'portfolio');
create policy "Owner can upload portfolio images" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio' and public.has_role(auth.uid(), 'admin'));
create policy "Owner can delete portfolio images" on storage.objects for delete to authenticated using (bucket_id = 'portfolio' and public.has_role(auth.uid(), 'admin'));