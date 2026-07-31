"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type GalleryImage = {
  src: string;
  alt: string;
};

export function PackImageGallery({ images }: { images: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      {/* Carousel thumbnails */}
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <button
                onClick={() => setSelectedIndex(index)}
                className="group relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted/30 transition-all hover:border-primary/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3 size-8" />
        <CarouselNext className="-right-3 size-8" />
      </Carousel>

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
                className={`size-2.5 rounded-full transition-colors ${
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
