'use client';

import * as React from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onImagesSelected?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
}

export function ImageUpload({
  className,
  onImagesSelected,
  maxFiles = 5,
  maxSize = 5,
  ...props
}: ImageUploadProps) {
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError(null);

    // Überprüfe Anzahl der Dateien
    if (files.length > maxFiles) {
      setError(`Maximal ${maxFiles} Dateien erlaubt`);
      return;
    }

    // Überprüfe Dateigröße
    const oversizedFiles = files.filter(
      (file) => file.size > maxSize * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setError(`Dateien dürfen maximal ${maxSize}MB groß sein`);
      return;
    }

    // Überprüfe Dateityp
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith('image/')
    );
    if (invalidFiles.length > 0) {
      setError('Nur Bilddateien sind erlaubt');
      return;
    }

    // Erstelle Vorschau-URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Benachrichtige über ausgewählte Dateien
    onImagesSelected?.(files);
  };

  const removeImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          'relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800',
          className
        )}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...props}
        />
        <Upload className="w-8 h-8 mb-2 text-gray-500" />
        <p className="text-sm text-gray-500">
          Klicken Sie zum Hochladen oder ziehen Sie Bilder hierher
        </p>
        <p className="text-xs text-gray-400">
          Max. {maxFiles} Dateien, je {maxSize}MB
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Vorschau ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 