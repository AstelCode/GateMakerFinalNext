import { useState, useRef, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ImageGalleryUploadProps {
  onChange: (files: File[]) => void;
}

export function ImageGalleryUpload({ onChange }: ImageGalleryUploadProps) {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newImages = newFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      // 1. Calculamos el nuevo estado directamente
      const updatedImages = [...images, ...newImages];

      // 2. Actualizamos el estado local del componente
      setImages(updatedImages);

      // 3. Notificamos al componente padre (efecto secundario fuera del setter)
      onChange(updatedImages.map((img) => img.file));

      // Limpiar el input
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeImage = (indexToRemove: number) => {
    // 1. Calculamos el estado actualizado
    const updatedImages = images.filter((_, index) => index !== indexToRemove);

    // Liberamos memoria
    URL.revokeObjectURL(images[indexToRemove].preview);

    // 2. Actualizamos el estado local
    setImages(updatedImages);

    // 3. Notificamos al componente padre
    onChange(updatedImages.map((img) => img.file));
  };

  // Limpiar URLs al desmontar el componente
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Image Gallery</Label>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 flex-wrap">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />

        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border/50 rounded-xl bg-muted/20 flex flex-col items-center justify-center min-w-[200px] h-[150px] cursor-pointer hover:bg-muted/40 transition-colors shrink-0 group"
        >
          <ImagePlus className="h-8 w-8 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Add Image</span>
        </div>

        {images.map((img, index) => (
          <div
            key={`${img.file.name}-${index}`}
            className="relative border border-border/50 rounded-xl bg-muted/20 min-w-[200px] h-[150px] shrink-0 overflow-hidden group"
          >
            <img
              src={img.preview}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
