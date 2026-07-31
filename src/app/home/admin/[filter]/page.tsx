import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminItemCard } from "@/components/features/admin/AdminItemCard";
import { Plus } from "lucide-react";

// --- Datos de ejemplo ---
const ALL_ITEMS: {
  id: string;
  name: string;
  description: string;
  type: "mod" | "pack";
  image: string;
}[] = [
  {
    id: "1",
    name: "Dead Crowlers",
    description: "Overhaul de enemigos no-muertos",
    type: "mod",
    image: "https://placehold.co/600x400/1a1a2e/e94560?text=Dead+Crowlers",
  },
  {
    id: "2",
    name: "Better UI",
    description: "Mejora la interfaz de usuario",
    type: "mod",
    image: "https://placehold.co/600x400/16213e/0f3460?text=Better+UI",
  },
  {
    id: "3",
    name: "Starter Pack",
    description: "Mods esenciales para principiantes",
    type: "pack",
    image: "https://placehold.co/600x400/2d2d2d/10b981?text=Starter+Pack",
  },
  {
    id: "4",
    name: "Magic Expansion",
    description: "Agrega nuevos hechizos y magias",
    type: "mod",
    image: "https://placehold.co/600x400/0f3460/e94560?text=Magic+Exp",
  },
  {
    id: "5",
    name: "Ultimate Graphics Pack",
    description: "Texturas 4K y shaders mejorados",
    type: "pack",
    image: "https://placehold.co/600x400/1b1a2e/e94560?text=Graphics+Pack",
  },
  {
    id: "6",
    name: "Fast Travel",
    description: "Viaja instantáneamente a cualquier lugar",
    type: "mod",
    image: "https://placehold.co/600x400/1a2e1a/10b981?text=Fast+Travel",
  },
  {
    id: "7",
    name: "Weapon Arsenal Pack",
    description: "100+ armas nuevas en un solo pack",
    type: "pack",
    image: "https://placehold.co/600x400/2e1a2e/e94560?text=Weapon+Pack",
  },
  {
    id: "8",
    name: "No Fall Damage",
    description: "Elimina el daño por caída",
    type: "mod",
    image: "https://placehold.co/600x400/1a1a3e/6060ff?text=No+Fall",
  },
  {
    id: "9",
    name: "Hardcore Mode",
    description: "Aumenta la dificultad del juego",
    type: "mod",
    image: "https://placehold.co/600x400/3e1a1a/ff6060?text=Hardcore",
  },
  {
    id: "10",
    name: "Animal Companions",
    description: "Mascotas y compañeros animales",
    type: "mod",
    image: "https://placehold.co/600x400/1a3e1a/60ff60?text=Companions",
  },
  {
    id: "11",
    name: "Builder's Dream Pack",
    description: "Todo lo que necesitas para construir",
    type: "pack",
    image: "https://placehold.co/600x400/3e3e1a/ffff60?text=Builder+Pack",
  },
  {
    id: "12",
    name: "More Gold",
    description: "Los enemigos sueltan más oro",
    type: "mod",
    image: "https://placehold.co/600x400/3e2e1a/ffc060?text=More+Gold",
  },
];

// --- Configuración de filtros ---
const FILTER_CONFIG: Record<
  string,
  {
    title: string;
    typeFilter: "mod" | "pack" | null;
    showNewMod: boolean;
    showNewPack: boolean;
  }
> = {
  mods: {
    title: "Manage Mods",
    typeFilter: "mod",
    showNewMod: true,
    showNewPack: false,
  },
  packs: {
    title: "Manage Packs",
    typeFilter: "pack",
    showNewMod: false,
    showNewPack: true,
  },
};

export default async function AdminGalleryPage({
  params,
}: {
  params: Promise<{ filter: string }>;
}) {
  const { filter } = await params;
  const config = FILTER_CONFIG[filter] ?? {
    title: filter,
    typeFilter: null,
    showNewMod: true,
    showNewPack: true,
  };

  const filteredItems = config.typeFilter
    ? ALL_ITEMS.filter((item) => item.type === config.typeFilter)
    : ALL_ITEMS;

  return (
    <div className="flex flex-col h-full max-h-[calc(100dvh_-_64px)] w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">{config.title}</h1>
        <div className="flex items-center gap-2">
          {config.showNewPack && (
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/home/admin/pack/create" />}
            >
              <Plus className="size-4" />
              New Pack
            </Button>
          )}
          {config.showNewMod && (
            <Button
              render={<Link href="/home/admin/mod/create" />}
              nativeButton={false}
            >
              <Plus className="size-4" />
              New Mod
            </Button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm mt-1">
              Create your first {config.typeFilter ?? "item"} to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {filteredItems.map((item) => (
              <AdminItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                type={item.type}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
