CREATE OR REPLACE FUNCTION public.sync_confirmed_sandy_owner()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  IF lower(NEW.email) = 'sandy_deboer@yahoo.com' AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSIF TG_OP = 'UPDATE' THEN
    IF lower(OLD.email) = 'sandy_deboer@yahoo.com' OR lower(NEW.email) = 'sandy_deboer@yahoo.com' THEN
      DELETE FROM public.user_roles WHERE user_id = NEW.id AND role = 'admin'::public.app_role;
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;
REVOKE ALL ON FUNCTION public.sync_confirmed_sandy_owner() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER sync_confirmed_sandy_owner
AFTER INSERT OR UPDATE OF email, email_confirmed_at, last_sign_in_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.sync_confirmed_sandy_owner();
COMMENT ON FUNCTION public.sync_confirmed_sandy_owner() IS 'Only the exact case-insensitive confirmed Sandy email receives admin automatically. No website role writes or first-user claims.';