CREATE OR REPLACE FUNCTION public.sync_confirmed_sandy_owner()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  IF lower(NEW.email) = 'shirin@thesdhome.com' AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSIF TG_OP = 'UPDATE' THEN
    IF lower(OLD.email) = 'shirin@thesdhome.com' OR lower(NEW.email) = 'shirin@thesdhome.com' THEN
      DELETE FROM public.user_roles WHERE user_id = NEW.id AND role = 'admin'::public.app_role;
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;
REVOKE ALL ON FUNCTION public.sync_confirmed_sandy_owner() FROM PUBLIC, anon, authenticated;
COMMENT ON FUNCTION public.sync_confirmed_sandy_owner() IS 'Only the exact case-insensitive confirmed owner email (shirin@thesdhome.com) receives admin automatically. No website role writes or first-user claims.';
DELETE FROM public.user_roles WHERE role = 'admin'::public.app_role AND user_id IN (SELECT id FROM auth.users WHERE lower(email) = 'sandy_deboer@yahoo.com');
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users WHERE lower(email) = 'shirin@thesdhome.com' AND email_confirmed_at IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;