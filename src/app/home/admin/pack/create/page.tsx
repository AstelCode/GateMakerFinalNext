"use client";

import Link from "next/link";
import {
  Upload,
  Plus,
  X,
  ImagePlus,
  ChevronLeft,
  Package,
  File,
  Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function CreatePackPage() {
  return (
    <div className="h-full max-h-[calc(100dvh-64px)] overflow-y-auto">
    <div className="container mx-auto py-8 max-w-6xl space-y-8 px-4 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/packs" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to manage
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Create New Pack</h1>
          <Button size="lg" className="gap-2">
            <Package className="w-4 h-4" />
            Publish Pack
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Main Image Upload */}
        <div className="space-y-4">
          <Label>Pack Cover Image</Label>
          <Card className="border-2 border-dashed border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer h-[400px] flex flex-col items-center justify-center">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="p-4 bg-background rounded-full shadow-sm">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Click to upload pack image</p>
                <p className="text-sm text-muted-foreground mt-1">Recommended size: 1920x1080px (16:9)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Pack Name</Label>
            <Input id="name" placeholder="Enter pack name..." className="text-lg" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe what this pack is about..." 
              className="min-h-[120px] resize-none" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>System Requirements</Label>
              <Button variant="outline" size="sm" className="gap-1 h-8">
                <Plus className="w-3 h-3" />
                Add Requirement
              </Button>
            </div>
            
            <Card className="bg-muted/20 border-border/50">
              <CardContent className="p-4 space-y-3">
                {[
                  { label: "Game Version", value: "1.20+" },
                  { label: "Mod Loader", value: "ForgeLoader v4.0+" },
                  { label: "RAM", value: "16 GB minimum" },
                  { label: "VRAM", value: "6 GB minimum" },
                  { label: "Disk Space", value: "28 GB free" },
                  { label: "OS", value: "Windows 10/11" },
                ].map((req, i) => (
                  <div key={i} className="grid grid-cols-[120px_1fr_auto] gap-3 items-center group">
                    <Input defaultValue={req.label} className="h-8 text-xs font-medium" />
                    <Input defaultValue={req.value} className="h-8 text-xs" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="pt-2">
            <Button variant="secondary" className="w-full gap-2 border-dashed border-2 border-border/50 bg-muted/10 hover:bg-muted/20">
              <File className="w-4 h-4" />
              Upload Pack File (.zip)
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Connected Mods Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Link2 className="w-5 h-5 text-muted-foreground" />
              Connected Mods
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Select which mods are included in this pack.</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {[
            'Combat AI Plus',
            'Skill Tree Redux',
            'Weather Dynamics',
            '4K HD Textures'
          ].map((modName, i) => (
            <Card key={i} className="min-w-[200px] flex-shrink-0 group relative overflow-hidden bg-muted/20 border-border/50">
              <div className="aspect-[4/3] bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground/30" />
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-sm truncate">{modName}</p>
                <p className="text-xs text-muted-foreground mt-1">v2.1.0</p>
              </CardContent>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="destructive" size="icon" className="h-6 w-6 rounded-full shadow-sm">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))}
          
          <Card className="min-w-[200px] flex-shrink-0 border-2 border-dashed border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[160px]">
            <Plus className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm font-medium text-muted-foreground">Add Mod</span>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Image Gallery Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-muted-foreground" />
            Gallery Images
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Add screenshots showcasing the pack.</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[240px] aspect-video rounded-xl bg-muted relative group overflow-hidden border border-border/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImagePlus className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full shadow-sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="min-w-[240px] aspect-video rounded-xl border-2 border-dashed border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer flex flex-col items-center justify-center">
            <Plus className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm font-medium text-muted-foreground">Add Image</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end pt-4 pb-12">
        <Button size="lg" className="gap-2">
          <Package className="w-4 h-4" />
          Publish Pack
        </Button>
      </div>
    </div>
    </div>
  );
}
