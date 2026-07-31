import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Download,
  Heart,
  Eye,
  Calendar,
  User,
  MessageSquare,
  Star,
  Shield,
  Cpu,
  HardDrive,
  MonitorSmartphone,
  Gamepad2,
  ChevronLeft,
  Share2,
  Flag,
  ThumbsUp,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { ModImageGallery } from "@/components/features/mod-detail/ModImageGallery";
import { ModComments } from "@/components/features/mod-detail/ModComments";

// --- Mock Data ---
const MOD_DATA = {
  id: "dark-souls-overhaul",
  name: "Dark Souls: Complete Overhaul",
  version: "2.4.1",
  author: {
    name: "NexusCrafter",
    avatar: "https://placehold.co/100x100/2d2d2d/10b981?text=NC",
    modsCount: 24,
  },
  description:
    "A massive overhaul mod that transforms the entire game experience. Includes redesigned enemy AI, rebalanced combat mechanics, new weapon movesets, overhauled lighting system, and 4K texture replacements for all major assets. This mod has been carefully crafted over 3 years of development to deliver the ultimate Dark Souls experience.",
  shortDescription: "The ultimate Dark Souls transformation experience",
  category: "Overhaul",
  tags: ["Combat", "Graphics", "AI", "Textures", "Lighting"],
  stats: {
    downloads: 184520,
    favorites: 12340,
    views: 892100,
    rating: 4.8,
    ratingsCount: 3241,
  },
  dates: {
    published: "2024-03-15",
    updated: "2025-07-28",
  },
  requirements: [
    { label: "Game Version", value: "1.15 or later" },
    { label: "Mod Loader", value: "ForgeLoader v3.2+" },
    { label: "RAM", value: "8 GB minimum" },
    { label: "VRAM", value: "4 GB minimum" },
    { label: "Disk Space", value: "12 GB free" },
    { label: "OS", value: "Windows 10/11" },
  ],
  compatibility: [
    { name: "HD Texture Pack", compatible: true },
    { name: "Better Shadows", compatible: true },
    { name: "Classic UI", compatible: false },
    { name: "Enhanced Audio", compatible: true },
  ],
  images: [
    {
      src: "https://placehold.co/800x450/1a1a2e/e94560?text=Combat+Overhaul",
      alt: "Combat system overhaul showcase",
    },
    {
      src: "https://placehold.co/800x450/16213e/0f3460?text=New+Lighting",
      alt: "New lighting engine demonstration",
    },
    {
      src: "https://placehold.co/800x450/1b1a2e/e94560?text=Boss+Fight",
      alt: "Redesigned boss fight encounter",
    },
    {
      src: "https://placehold.co/800x450/0f3460/e94560?text=4K+Textures",
      alt: "4K texture comparison",
    },
    {
      src: "https://placehold.co/800x450/2d2d2d/10b981?text=World+Map",
      alt: "Expanded world map",
    },
  ],
  downloadUrl: "#",
  fileSize: "3.2 GB",
  changelog: [
    "v2.4.1 - Fixed crash on boss encounter in Chapter 7",
    "v2.4.0 - Added 15 new weapon movesets",
    "v2.3.0 - Complete lighting engine overhaul",
  ],
};

const COMMENTS_DATA = [
  {
    id: "1",
    author: {
      name: "ShadowBlade99",
      avatar: "https://placehold.co/80x80/1a1a2e/e94560?text=SB",
    },
    content:
      "This mod completely changed how I experience the game. The combat feels so much more responsive and the AI actually challenges you now. Highly recommended!",
    date: "2025-07-25",
    likes: 47,
  },
  {
    id: "2",
    author: {
      name: "PixelHunter",
      avatar: "https://placehold.co/80x80/16213e/0f3460?text=PH",
    },
    content:
      "The 4K textures are stunning. My only suggestion would be to add an option for medium-res textures for people with less VRAM. Otherwise, fantastic work!",
    date: "2025-07-20",
    likes: 32,
  },
  {
    id: "3",
    author: {
      name: "ModExplorer",
      avatar: "https://placehold.co/80x80/2d2d2d/10b981?text=ME",
    },
    content:
      "Had a small issue with compatibility with Classic UI mod, but after disabling it everything works perfectly. The new lighting is jaw-dropping.",
    date: "2025-07-18",
    likes: 18,
  },
  {
    id: "4",
    author: {
      name: "DarkLord42",
      avatar: "https://placehold.co/80x80/0f3460/e94560?text=DL",
    },
    content:
      "Been waiting for an update and v2.4.1 fixed the crash I was experiencing. Thank you for the consistent support!",
    date: "2025-07-15",
    likes: 24,
  },
];

// --- Helper ---
function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// --- Stars ---
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-4 ${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

// --- Requirement icons ---
const requirementIcons: Record<string, React.ReactNode> = {
  "Game Version": <Gamepad2 className="size-4 text-primary" />,
  "Mod Loader": <Shield className="size-4 text-primary" />,
  RAM: <Cpu className="size-4 text-primary" />,
  VRAM: <MonitorSmartphone className="size-4 text-primary" />,
  "Disk Space": <HardDrive className="size-4 text-primary" />,
  OS: <MonitorSmartphone className="size-4 text-primary" />,
};

// --- Page ---
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ModDetailPage({ params }: Props) {
  const { id } = await params;
  // In a real app, fetch mod data by id
  void id;
  const mod = MOD_DATA;
  const comments = COMMENTS_DATA;

  return (
    <div className="h-full max-h-[calc(100dvh-64px)] overflow-y-auto">
      <div className="mx-auto max-w-6xl space-y-6 p-4 pb-12 pt-0 mt-0">
        {/* Back link */}
        <Link
          href="/home/explore/all"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Back to explore
        </Link>

        {/* ===== Hero Section: Image + Info ===== */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Mod Main Image */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-muted/30">
            <img
              src="https://placehold.co/800x500/1a1a2e/e94560?text=Dark+Souls+Overhaul"
              alt={mod.name}
              className="h-full w-full object-cover"
              style={{ minHeight: "320px" }}
            />
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-4">
            {/* Title + Author */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                {mod.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {mod.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="size-9 border border-border">
                <AvatarImage src={mod.author.avatar} alt={mod.author.name} />
                <AvatarFallback>
                  {mod.author.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{mod.author.name}</p>
                {/* <p className="text-xs text-muted-foreground">
                  {mod.author.modsCount} mods published
                </p> */}
              </div>
            </div>

            {/* Rating + Stats row */}
            {/* <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <StarRating rating={mod.stats.rating} />
                <span className="font-medium text-foreground">
                  {mod.stats.rating}
                </span>
                <span>({formatNumber(mod.stats.ratingsCount)})</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Download className="size-4" />
                <span>{formatNumber(mod.stats.downloads)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="size-4" />
                <span>{formatNumber(mod.stats.favorites)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="size-4" />
                <span>{formatNumber(mod.stats.views)}</span>
              </div>
            </div> */}

            <Separator />

            {/* Description */}
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </h2>
              <p className="text-sm leading-relaxed">{mod.description}</p>
            </div>

            {/* Tags */}
            {/* <div className="flex flex-wrap gap-1.5">
              {mod.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div> */}

            {/* Requirements */}
            <Card className="border-border/50 bg-muted/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {mod.requirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2">
                      {requirementIcons[req.label] || (
                        <Shield className="size-4 text-primary" />
                      )}
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {req.label}
                        </p>
                        <p className="text-sm font-medium">{req.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Download + Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1 gap-2">
                <Download className="size-5" />
                Download ({mod.fileSize})
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="lg">
                  <Bookmark className="size-5" />
                </Button>
                {/*             <Button variant="outline" size="lg">
                  <Share2 className="size-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Flag className="size-5" />
                </Button> */}
              </div>
            </div>

            {/* Dates */}
            <div className="flex gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                Published {formatDate(mod.dates.published)}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                Updated {formatDate(mod.dates.updated)}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Image Gallery ===== */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Gallery</h2>
          <ModImageGallery images={mod.images} />
        </section>

        {/* ===== Compatibility ===== */}
        {/* 
        <Separator />
        
        <section>
          <h2 className="mb-4 text-lg font-semibold">Compatibility</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mod.compatibility.map((item) => (
              <Card key={item.name} className="border-border/50 bg-muted/20">
                <CardContent className="flex items-center gap-3 p-4">
                  <div
                    className={`size-2.5 rounded-full ${
                      item.compatible ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.compatible ? "Compatible" : "Incompatible"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        {/* ===== Changelog ===== */}
        {/*
        <Separator />
        <section>
          <h2 className="mb-4 text-lg font-semibold">Changelog</h2>
          <Card className="border-border/50 bg-muted/20">
            <CardContent className="p-4">
              <ul className="space-y-2">
                {mod.changelog.map((entry, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                    {entry}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section> */}

        <Separator />

        {/* ===== Comments ===== */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="size-5" />
            <h2 className="text-lg font-semibold">
              Comments ({comments.length})
            </h2>
          </div>
          <ModComments comments={comments} />
        </section>
      </div>
    </div>
  );
}
