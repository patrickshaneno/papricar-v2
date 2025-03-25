-- Create saved_vehicles table
CREATE TABLE IF NOT EXISTS public.saved_vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicle_profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'dealer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, vehicle_id)
);

-- Enable RLS
ALTER TABLE public.saved_vehicles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own saved vehicles"
  ON public.saved_vehicles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved vehicles"
  ON public.saved_vehicles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved vehicles"
  ON public.saved_vehicles FOR DELETE
  USING (auth.uid() = user_id); 