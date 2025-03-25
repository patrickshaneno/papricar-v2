-- Create vehicle_profiles table
CREATE TABLE IF NOT EXISTS public.vehicle_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dealer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  features JSONB,
  images TEXT[],
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.vehicle_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active vehicles"
  ON public.vehicle_profiles FOR SELECT
  USING (status = 'active');

CREATE POLICY "Dealers can view their own vehicles"
  ON public.vehicle_profiles FOR SELECT
  USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can insert their own vehicles"
  ON public.vehicle_profiles FOR INSERT
  WITH CHECK (auth.uid() = dealer_id);

CREATE POLICY "Dealers can update their own vehicles"
  ON public.vehicle_profiles FOR UPDATE
  USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can delete their own vehicles"
  ON public.vehicle_profiles FOR DELETE
  USING (auth.uid() = dealer_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_vehicle_profiles_updated_at
  BEFORE UPDATE ON public.vehicle_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at(); 