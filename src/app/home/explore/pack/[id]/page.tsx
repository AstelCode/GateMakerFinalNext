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
  Package,
  Users,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { PackImageGallery } from "@/components/features/pack-detail/PackImageGallery";
import { PackComments } from "@/components/features/pack-detail/PackComments";
import { ConnectedMods } from "@/components/features/pack-detail/ConnectedMods";
import Image from "next/image";

// --- Mock Data ---
const PACK_DATA = {
  id: "ultimate-rpg-pack",
  name: "Ultimate RPG Overhaul Pack",
  version: "3.1.0",
  author: {
    name: "ModMasterX",
    avatar: "https://placehold.co/100x100/2d2d2d/10b981?text=MX",
    packsCount: 8,
  },
  description:
    "The definitive RPG experience pack that bundles 12 carefully curated mods into a single, conflict-free installation. Includes enhanced combat AI, overhauled skill trees, dynamic weather systems, 4K texture replacements, immersive sound design, and a completely reworked quest system. Each mod has been tested for compatibility and optimized for seamless integration, delivering hundreds of hours of fresh content.",
  shortDescription: "12 mods, one seamless RPG transformation",
  category: "Pack",
  tags: ["RPG", "Overhaul", "Combat", "Textures", "Quests", "Audio"],
  stats: {
    downloads: 342800,
    favorites: 28150,
    views: 1520000,
    rating: 4.9,
    ratingsCount: 7823,
    modsIncluded: 12,
  },
  dates: {
    published: "2024-06-10",
    updated: "2025-07-30",
  },
  requirements: [
    { label: "Game Version", value: "1.20 or later" },
    { label: "Mod Loader", value: "ForgeLoader v4.0+" },
    { label: "RAM", value: "16 GB minimum" },
    { label: "VRAM", value: "6 GB minimum" },
    { label: "Disk Space", value: "28 GB free" },
    { label: "OS", value: "Windows 10/11" },
  ],
  images: [
    {
      src: "https://placehold.co/800x450/1a1a2e/e94560?text=Combat+System",
      alt: "Enhanced combat system showcase",
    },
    {
      src: "https://placehold.co/800x450/16213e/0f3460?text=Skill+Trees",
      alt: "Overhauled skill tree interface",
    },
    {
      src: "https://placehold.co/800x450/1b1a2e/e94560?text=Dynamic+Weather",
      alt: "Dynamic weather system in action",
    },
    {
      src: "https://placehold.co/800x450/0f3460/e94560?text=4K+World",
      alt: "4K world textures comparison",
    },
    {
      src: "https://placehold.co/800x450/2d2d2d/10b981?text=Quest+System",
      alt: "Reworked quest journal",
    },
    {
      src: "https://placehold.co/800x450/1a2e1a/10b981?text=NPC+Overhaul",
      alt: "NPC behavior improvements",
    },
  ],
  connectedMods: [
    {
      id: "combat-ai-plus",
      name: "Combat AI Plus",
      image: "https://placehold.co/400x250/1a1a2e/e94560?text=Combat+AI",
      author: "BattleCoder",
      downloads: 89200,
      category: "AI",
    },
    {
      id: "skill-tree-redux",
      name: "Skill Tree Redux",
      image: "https://placehold.co/400x250/16213e/0f3460?text=Skill+Trees",
      author: "RPGDev",
      downloads: 65400,
      category: "Gameplay",
    },
    {
      id: "weather-dynamics",
      name: "Weather Dynamics",
      image: "https://placehold.co/400x250/1b1a2e/e94560?text=Weather",
      author: "SkyForge",
      downloads: 112000,
      category: "Environment",
    },
    {
      id: "hd-texture-pack",
      name: "4K HD Texture Pack",
      image: "https://placehold.co/400x250/0f3460/e94560?text=4K+Textures",
      author: "PixelArtisan",
      downloads: 245000,
      category: "Graphics",
    },
    {
      id: "immersive-audio",
      name: "Immersive Audio Overhaul",
      image: "https://placehold.co/400x250/2d2d2d/10b981?text=Audio",
      author: "SoundScape",
      downloads: 78600,
      category: "Audio",
    },
    {
      id: "quest-expansion",
      name: "Quest Expansion Mod",
      image: "https://placehold.co/400x250/1a2e1a/10b981?text=Quests",
      author: "StoryWeaver",
      downloads: 134500,
      category: "Content",
    },
    {
      id: "npc-overhaul",
      name: "NPC Behavior Overhaul",
      image: "https://placehold.co/400x250/2e1a2e/e94560?text=NPC+AI",
      author: "AIWizard",
      downloads: 56300,
      category: "AI",
    },
    {
      id: "ui-modernize",
      name: "Modern UI Pack",
      image: "https://placehold.co/400x250/1a1a3e/6060ff?text=Modern+UI",
      author: "UXMaster",
      downloads: 198000,
      category: "Interface",
    },
  ],
  downloadUrl: "#",
  fileSize: "8.7 GB",
};

const COMMENTS_DATA = [
  {
    id: "1",
    author: {
      name: "DragonSlayer77",
      avatar: "https://placehold.co/80x80/1a1a2e/e94560?text=DS",
    },
    content:
      "This pack is absolutely incredible. The way all the mods work together seamlessly is impressive. The combat AI combined with the skill tree changes makes every encounter feel unique. 10/10 would recommend!",
    date: "2025-07-28",
    likes: 89,
  },
  {
    id: "2",
    author: {
      name: "QuestHunter",
      avatar: "https://placehold.co/80x80/16213e/0f3460?text=QH",
    },
    content:
      "The quest expansion alone is worth the download. Adds so much depth to the story. The 4K textures are a nice bonus but you'll need a beefy GPU for sure.",
    date: "2025-07-25",
    likes: 54,
  },
  {
    id: "3",
    author: {
      name: "PixelNinja",
      avatar: "https://placehold.co/80x80/2d2d2d/10b981?text=PN",
    },
    content:
      "Weather dynamics mod in this pack is my favorite. Rain actually affects gameplay now — slippery terrain, reduced visibility, enemies behave differently. Pure genius.",
    date: "2025-07-22",
    likes: 41,
  },
  {
    id: "4",
    author: {
      name: "ModdingVet",
      avatar: "https://placehold.co/80x80/0f3460/e94560?text=MV",
    },
    content:
      "Been modding for years and this is one of the best curated packs I've seen. No conflicts, clean install, and the author keeps it updated. Bravo!",
    date: "2025-07-19",
    likes: 67,
  },
];

// --- Helpers ---
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

// --- Page (Server Component) ---
type Props = {
  params: Promise<{ id: string }>;
};

export default async function PackDetailPage({ params }: Props) {
  const { id } = await params;
  // In a real app, fetch pack data by id
  void id;
  const pack = PACK_DATA;
  const comments = COMMENTS_DATA;

  return (
    <div className="h-full max-h-[calc(100dvh-64px)] overflow-y-auto">
      <div className="mx-auto max-w-5xl space-y-8 p-4 pb-12 pt-0 mt-0">
        {/* Back link */}
        <Link
          href="/home/explore/all"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Back to explore
        </Link>

        {/* ===== Hero Section: Pack Image + Info ===== */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Pack Main Image */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-muted/30">
            <Image
              width={340}
              height={400}
              src="https://placehold.co/800x500/1a1a2e/10b981?text=Ultimate+RPG+Pack"
              alt={pack.name}
              className="h-full w-full object-cover"
              style={{ minHeight: "340px" }}
              unoptimized
            />
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-4">
            {/* Title + Author */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                {pack.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {pack.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="size-9 border border-border">
                <AvatarImage src={pack.author.avatar} alt={pack.author.name} />
                <AvatarFallback>
                  {pack.author.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{pack.author.name}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </h2>
              <p className="text-sm leading-relaxed">{pack.description}</p>
            </div>

            {/* Requirements */}
            <Card className="border-border/50 bg-muted/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {pack.requirements.map((req) => (
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
                Download ({pack.fileSize})
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

            {/* Rating + Stats row
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <StarRating rating={pack.stats.rating} />
                <span className="font-medium text-foreground">
                  {pack.stats.rating}
                </span>
                <span>({formatNumber(pack.stats.ratingsCount)})</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Download className="size-4" />
                <span>{formatNumber(pack.stats.downloads)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="size-4" />
                <span>{formatNumber(pack.stats.favorites)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="size-4" />
                <span>{formatNumber(pack.stats.views)}</span>
              </div>
            </div> */}

            {/* Tags */}
            {/* <div className="flex flex-wrap gap-1.5">
              {pack.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div> */}

            {/* Dates */}
            <div className="flex gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                Published {formatDate(pack.dates.published)}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                Updated {formatDate(pack.dates.updated)}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Image Gallery ===== */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Gallery</h2>
          <PackImageGallery images={pack.images} />
        </section>
        <Separator />

        {/* ===== Connected Mods ===== */}
        <section>
          <div className="mb-4 flex items-center gap-2 w-full overflow-hidden">
            <Package className="size-5" />
            <h2 className="text-lg font-semibold">
              Included Mods ({pack.connectedMods.length})
            </h2>
          </div>
          <ConnectedMods mods={pack.connectedMods} />
        </section>

        <Separator />

        {/* ===== Comments ===== */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="size-5" />
            <h2 className="text-lg font-semibold">
              Comments ({comments.length})
            </h2>
          </div>
          <PackComments comments={comments} />
        </section>
      </div>
    </div>
  );
}
