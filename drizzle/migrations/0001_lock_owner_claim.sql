CREATE OR REPLACE FUNCTION public.claim_owner()
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$ select auth.uid() is not null and public.has_role(auth.uid(), 'admin') $$;
REVOKE EXECUTE ON FUNCTION public.claim_owner() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_owner() TO authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.portfolio_photos, public.user_roles FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.user_roles FROM authenticated;