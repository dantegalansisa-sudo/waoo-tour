-- ============================================================
-- WAOOO Tours — Configuración de Supabase
-- Pega TODO este archivo en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- 1) Tabla de tours (cada tour completo en formato JSON)
create table if not exists public.tours (
  id text primary key,
  data jsonb not null,
  pos int,
  updated_at timestamptz default now()
);

-- 2) Tabla de configuración (contactos, redes)
create table if not exists public.settings (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 3) Seguridad: cualquiera puede LEER, solo el admin (autenticado) puede ESCRIBIR
alter table public.tours enable row level security;
alter table public.settings enable row level security;

drop policy if exists "tours lectura publica" on public.tours;
create policy "tours lectura publica" on public.tours
  for select using (true);

drop policy if exists "tours escritura admin" on public.tours;
create policy "tours escritura admin" on public.tours
  for all to authenticated using (true) with check (true);

drop policy if exists "settings lectura publica" on public.settings;
create policy "settings lectura publica" on public.settings
  for select using (true);

drop policy if exists "settings escritura admin" on public.settings;
create policy "settings escritura admin" on public.settings
  for all to authenticated using (true) with check (true);

-- 4) Bucket de fotos (público para ver, solo admin sube/borra)
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do nothing;

drop policy if exists "fotos lectura publica" on storage.objects;
create policy "fotos lectura publica" on storage.objects
  for select using (bucket_id = 'fotos');

drop policy if exists "fotos subir admin" on storage.objects;
create policy "fotos subir admin" on storage.objects
  for insert to authenticated with check (bucket_id = 'fotos');

drop policy if exists "fotos actualizar admin" on storage.objects;
create policy "fotos actualizar admin" on storage.objects
  for update to authenticated using (bucket_id = 'fotos');

drop policy if exists "fotos borrar admin" on storage.objects;
create policy "fotos borrar admin" on storage.objects
  for delete to authenticated using (bucket_id = 'fotos');

-- Listo. Ahora crea el usuario admin en:
-- Authentication → Users → Add user → (email + contraseña + Auto Confirm ✓)
