CREATE POLICY "Owner can update portfolio images" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'::public.app_role));