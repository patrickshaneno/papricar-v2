-- Create vehicle_inquiries table
CREATE TABLE IF NOT EXISTS public.vehicle_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES public.vehicle_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dealer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.vehicle_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own inquiries"
  ON public.vehicle_inquiries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Dealers can view inquiries for their vehicles"
  ON public.vehicle_inquiries FOR SELECT
  USING (auth.uid() = dealer_id);

CREATE POLICY "Users can create inquiries"
  ON public.vehicle_inquiries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Dealers can update inquiries for their vehicles"
  ON public.vehicle_inquiries FOR UPDATE
  USING (auth.uid() = dealer_id);

CREATE POLICY "Users can delete their own inquiries"
  ON public.vehicle_inquiries FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_vehicle_inquiries_updated_at
  BEFORE UPDATE ON public.vehicle_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at(); 