"use client";
import { useRef, useState } from "react";
import { X, Package, File as FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
interface FileUploadProps {
  label?: string;
  accept?: string;
  description?: string;
  onChange: (file: File | null) => void;
}

export function FileUpload({
  label,
  accept,
  description,
  onChange,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    onChange(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <div className="border border-border/50 rounded-xl bg-muted/20 p-6 flex items-center justify-between transition-colors hover:border-border">
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />

        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-3 bg-background rounded-lg border shrink-0">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div className="overflow-hidden">
            <p className="font-medium truncate">
              {selectedFile ? selectedFile.name : "No file selected"}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {selectedFile
                ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                : description}
            </p>
          </div>
        </div>

        <div className="flex gap-2 shrink-0 ml-4">
          {selectedFile ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-destructive hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" onClick={() => inputRef.current?.click()}>
              <FileIcon className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
