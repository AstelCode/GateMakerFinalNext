"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ModImage = {
  src: string;
  alt: string;
};

export function ModImageGallery({ images }: { images: ModImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-muted/30 transition-all hover:border-primary/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute right-4 top-4 rounded-full bg-background/20 p-2 text-white transition-colors hover:bg-background/40"
          >
            <X className="size-6" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                selectedIndex > 0 ? selectedIndex - 1 : images.length - 1
              );
            }}
            className="absolute left-4 rounded-full bg-background/20 p-2 text-white transition-colors hover:bg-background/40"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Image */}
          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                selectedIndex < images.length - 1 ? selectedIndex + 1 : 0
              );
            }}
            className="absolute right-4 rounded-full bg-background/20 p-2 text-white transition-colors hover:bg-background/40"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-6 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(i);
                }}
                className={`size-2 rounded-full transition-colors ${
                  i === selectedIndex
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
