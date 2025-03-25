-- Create vehicle_scores table
CREATE TABLE IF NOT EXISTS public.vehicle_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES public.vehicle_profiles(id) ON DELETE CASCADE,
  original_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  market_price DECIMAL(10,2) NOT NULL,
  depreciation_percentage DECIMAL(5,2) NOT NULL,
  price_comparison_percentage DECIMAL(5,2) NOT NULL,
  extra_score INTEGER NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL,
  classification TEXT NOT NULL CHECK (classification IN ('Sehr gut', 'Gut', 'Fair', 'Hochpreisig', 'Nicht empfohlen')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.vehicle_scores ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view vehicle scores"
  ON public.vehicle_scores FOR SELECT
  USING (true);

CREATE POLICY "Dealers can insert scores for their vehicles"
  ON public.vehicle_scores FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.vehicle_profiles
      WHERE id = vehicle_scores.vehicle_id
      AND dealer_id = auth.uid()
    )
  );

CREATE POLICY "Dealers can update scores for their vehicles"
  ON public.vehicle_scores FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.vehicle_profiles
      WHERE id = vehicle_scores.vehicle_id
      AND dealer_id = auth.uid()
    )
  );

CREATE POLICY "Dealers can delete scores for their vehicles"
  ON public.vehicle_scores FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.vehicle_profiles
      WHERE id = vehicle_scores.vehicle_id
      AND dealer_id = auth.uid()
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER handle_vehicle_scores_updated_at
  BEFORE UPDATE ON public.vehicle_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at(); 