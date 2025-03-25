-- Create dealer_profiles table
CREATE TABLE IF NOT EXISTS public.dealer_profiles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Deutschland',
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (user_id)
);

-- Enable RLS
ALTER TABLE public.dealer_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Dealers can view their own profile"
  ON public.dealer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Dealers can update their own profile"
  ON public.dealer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Dealers can insert their own profile"
  ON public.dealer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_dealer_profiles_updated_at
  BEFORE UPDATE ON public.dealer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at(); 