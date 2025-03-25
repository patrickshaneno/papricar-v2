-- Create canned_messages table
CREATE TABLE IF NOT EXISTS public.canned_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dealer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.canned_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Dealers can view their own canned messages"
  ON public.canned_messages FOR SELECT
  USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can insert their own canned messages"
  ON public.canned_messages FOR INSERT
  WITH CHECK (auth.uid() = dealer_id);

CREATE POLICY "Dealers can update their own canned messages"
  ON public.canned_messages FOR UPDATE
  USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can delete their own canned messages"
  ON public.canned_messages FOR DELETE
  USING (auth.uid() = dealer_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_canned_messages_updated_at
  BEFORE UPDATE ON public.canned_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at(); 