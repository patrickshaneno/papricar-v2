import { useState } from 'react'
import Image from 'next/image'

interface VehicleGalleryProps {
  images: {
    url: string
    alt: string
  }[]
}

export default function VehicleGallery({ images }: VehicleGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].alt}
          fill
          className="object-cover cursor-pointer"
          onClick={() => setShowLightbox(true)}
        />
        <button
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          onClick={() => setShowLightbox(true)}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 4v3m4-3h3m-3 4v3m-4 0H7m4-3H7"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
              selectedImage === index
                ? 'ring-2 ring-primary'
                : 'ring-1 ring-gray-200'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-7xl mx-auto px-4">
            <button
              className="absolute top-4 right-4 p-2 text-white hover:text-gray-300"
              onClick={() => setShowLightbox(false)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    selectedImage === index ? 'bg-white' : 'bg-gray-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(index)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 