-- Erstelle Testkonten in der profiles Tabelle
INSERT INTO profiles (id, role, updated_at)
SELECT 
  au.id,
  CASE 
    WHEN au.email = 'testuser@papricar.de' THEN 'user'
    WHEN au.email = 'dealer@papricar.de' THEN 'dealer'
  END as role,
  NOW() as updated_at
FROM auth.users au
WHERE au.email IN ('testuser@papricar.de', 'dealer@papricar.de')
ON CONFLICT (id) DO UPDATE
SET 
  role = EXCLUDED.role,
  updated_at = NOW(); 