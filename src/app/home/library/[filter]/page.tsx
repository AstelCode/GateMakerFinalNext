import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save } from "lucide-react";

function ItemCard() {
  return (
    // Quité max-w-3xs para que auto-fit se adapte bien. Agregué h-full y flex-col para uniformidad.
    <Card className="overflow-hidden pt-0 h-full flex flex-col">
      {/* Contenedor relativo para poder posicionar el botón sobre la imagen */}
      <div className="relative">
        <img
          className="w-full h-40 object-cover"
          src="https://placehold.co/600x400/png"
          alt="Mod preview"
        />
        {/* Botón flotante en la esquina superior derecha */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <Save className="size-4 shrink-0 text-foreground" />
        </Button>
      </div>

      <CardHeader className="flex-grow">
        <CardAction>
          <Badge variant="default">Mod</Badge>
        </CardAction>
        <CardTitle className="truncate">Dead crowlers</CardTitle>
        <CardDescription className="truncate">hoalkdkjl</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default function ModsPage() {
  return (
    <div className="h-full max-h-[calc(100dvh_-_64px)] overflow-y-auto p-4 w-full">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {/* Agregué varias copias para que puedas probar el scroll */}
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
}
