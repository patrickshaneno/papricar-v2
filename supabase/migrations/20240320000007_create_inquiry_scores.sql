-- Create inquiry_scores table
CREATE TABLE IF NOT EXISTS public.inquiry_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_id UUID REFERENCES public.vehicle_inquiries(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicle_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dealer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
ALTER TABLE public.inquiry_scores ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own inquiry scores"
  ON public.inquiry_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Dealers can view scores for their inquiries"
  ON public.inquiry_scores FOR SELECT
  USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can insert scores for their inquiries"
  ON public.inquiry_scores FOR INSERT
  WITH CHECK (auth.uid() = dealer_id);

CREATE POLICY "Dealers can update scores for their inquiries"
  ON public.inquiry_scores FOR UPDATE
  USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can delete scores for their inquiries"
  ON public.inquiry_scores FOR DELETE
  USING (auth.uid() = dealer_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_inquiry_scores_updated_at
  BEFORE UPDATE ON public.inquiry_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at(); 