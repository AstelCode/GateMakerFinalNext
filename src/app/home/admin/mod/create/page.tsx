"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Importa los componentes creados
import { ImageUpload } from "@/components/customs/ImageUpload";
import { FileUpload } from "@/components/customs/FileUpload";
import {
  RequirementsSection,
  Requirement,
} from "@/components/customs/RequirementsSection";
import { ImageGalleryUpload } from "@/components/customs/ImageGalleryUpload";

export default function CreateModPage() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [modFile, setModFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: 1, label: "Game Version", value: "", isMandatory: true },
    { id: 2, label: "Mod Loader", value: "" },
    { id: 3, label: "RAM", value: "" },
    { id: 4, label: "VRAM", value: "" },
  ]);

  const removeRequirement = (id: number) => {
    setRequirements(requirements.filter((req) => req.id !== id));
  };

  const handleAddRequirement = (newReq: { label: string; value: string }) => {
    setRequirements([
      ...requirements,
      {
        id: Date.now(), // Usamos la fecha actual como ID rápido y único
        label: newReq.label,
        value: newReq.value,
      },
    ]);
  };
  const handleUpdateRequirement = (id: number, newValue: string) => {
    setRequirements(
      requirements.map((req) =>
        req.id === id ? { ...req, value: newValue } : req,
      ),
    );
  };
  const handlePublish = () => {
    console.log("Publishing...", {
      mainImage,
      modFile,
      galleryImages,
      requirements,
    });
  };

  return (
    <div className="h-full max-h-[calc(100dvh-64px)] overflow-y-auto">
      <div className="container mx-auto py-8 max-w-6xl px-4 pb-12">
        <div className="mb-6 space-y-4">
          <Link
            href="/admin/mods"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to manage
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Create New Mod
            </h1>
            <Button size="lg" onClick={handlePublish}>
              Publish Mod
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Main Image Upload Component */}
          <ImageUpload
            label="Main Mod Image"
            recommendedSize="1920x1080px (16:9)"
            onChange={(file) => setMainImage(file)}
          />

          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Mod Name</Label>
              <Input
                id="name"
                placeholder="Enter mod name..."
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what your mod does..."
                className="min-h-[150px] resize-y"
              />
            </div>

            {/* General File Upload Component */}
            <FileUpload
              label="Mod File"
              accept=".zip,.jar"
              description="Upload .zip or .jar file"
              onChange={(file) => setModFile(file)}
            />

            {/* Requirements Section Component */}
            <RequirementsSection
              requirements={requirements}
              onRemove={removeRequirement}
              onAdd={handleAddRequirement}
              onUpdate={handleUpdateRequirement}
            />
          </div>
        </div>

        {/* Image Gallery Component */}
        <ImageGalleryUpload onChange={(files) => setGalleryImages(files)} />
      </div>
    </div>
  );
}
