import { useRef, useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// --- COMPONENTE PARA IMÁGENES CON PREVIEW ---
interface ImageUploadProps {
  label?: string;
  recommendedSize?: string;
  className?: string;
  onChange: (file: File | null) => void;
}

export function ImageUpload({
  label,
  recommendedSize,
  className,
  onChange,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // Limpiar la URL del objeto cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <Label className="text-base">{label}</Label>}

      <div
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-border/50 rounded-xl bg-muted/20 flex flex-col items-center justify-center h-[500px] cursor-pointer hover:bg-muted/40 transition-all overflow-hidden group"
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="destructive"
                size="icon"
                onClick={handleRemove}
                className="h-10 w-10 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-muted-foreground mb-4 group-hover:scale-110 transition-transform" />
            <p className="font-medium text-lg">Upload mod image</p>
            {recommendedSize && (
              <p className="text-sm text-muted-foreground mt-1">
                Recommended size: {recommendedSize}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
