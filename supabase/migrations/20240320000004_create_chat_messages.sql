-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_id UUID REFERENCES public.vehicle_inquiries(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view messages for their inquiries"
  ON public.chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.vehicle_inquiries
      WHERE id = chat_messages.inquiry_id
      AND (user_id = auth.uid() OR dealer_id = auth.uid())
    )
  );

CREATE POLICY "Users can insert messages for their inquiries"
  ON public.chat_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.vehicle_inquiries
      WHERE id = chat_messages.inquiry_id
      AND (user_id = auth.uid() OR dealer_id = auth.uid())
    )
  );

CREATE POLICY "Users can delete their own messages"
  ON public.chat_messages FOR DELETE
  USING (sender_id = auth.uid()); 