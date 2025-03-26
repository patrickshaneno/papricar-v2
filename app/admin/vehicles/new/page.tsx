'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const vehicleSchema = z.object({
  title: z.string().min(3, 'Titel muss mindestens 3 Zeichen lang sein'),
  description: z.string().optional(),
  brand: z.string().min(1, 'Marke ist erforderlich'),
  model: z.string().min(1, 'Modell ist erforderlich'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().min(0),
  mileage: z.number().optional(),
  fuel_type: z.string().optional(),
  transmission: z.string().optional(),
  color: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

export default function NewVehicle() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      status: 'draft',
    },
  });

  const onSubmit = async (data: VehicleFormData) => {
    try {
      setIsLoading(true);

      // Bild hochladen, wenn vorhanden
      let previewImageUrl = null;
      if (previewImage) {
        const fileExt = previewImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `vehicle-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('vehicles')
          .upload(filePath, previewImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('vehicles')
          .getPublicUrl(filePath);

        previewImageUrl = publicUrl;
      }

      // Fahrzeug in Datenbank speichern
      const { error: insertError } = await supabase
        .from('vehicles')
        .insert({
          ...data,
          preview_image_url: previewImageUrl,
        });

      if (insertError) throw insertError;

      toast.success('Fahrzeug erfolgreich gespeichert');
      router.push('/admin/vehicles');
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      toast.error('Fehler beim Speichern des Fahrzeugs');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1024px]">
      <h1 className="text-3xl font-bold mb-8">Neues Fahrzeug anlegen</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Titel</label>
            <Input {...register('title')} />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Beschreibung</label>
            <Textarea {...register('description')} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Marke</label>
              <Input {...register('brand')} />
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Modell</label>
              <Input {...register('model')} />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Baujahr</label>
              <Input
                type="number"
                {...register('year', { valueAsNumber: true })}
              />
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preis</label>
              <Input
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kilometerstand</label>
              <Input
                type="number"
                {...register('mileage', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kraftstoff</label>
              <Select onValueChange={(value) => setValue('fuel_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie den Kraftstoff" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="benzin">Benzin</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="elektro">Elektro</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Getriebe</label>
              <Select onValueChange={(value) => setValue('transmission', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie das Getriebe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Schaltgetriebe</SelectItem>
                  <SelectItem value="automatic">Automatik</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Farbe</label>
              <Input {...register('color')} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Vorschaubild</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setPreviewImage(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <Select
              defaultValue="draft"
              onValueChange={(value) => setValue('status', value as 'draft' | 'published')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie den Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Entwurf</SelectItem>
                <SelectItem value="published">Veröffentlicht</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Abbrechen
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Wird gespeichert...' : 'Speichern'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 