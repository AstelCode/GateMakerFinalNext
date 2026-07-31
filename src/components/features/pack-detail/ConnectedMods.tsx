"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Download } from "lucide-react";
import Link from "next/link";

type ConnectedMod = {
  id: string;
  name: string;
  image: string;
  author: string;
  downloads: number;
  category: string;
};

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function ConnectedMods({ mods }: { mods: ConnectedMod[] }) {
  return (
    /* 1. min-w-0 previene el desbordamiento en contenedores flex/grid. h-full lo adapta a la altura del padre */
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full h-full min-w-0"
    >
      {/* 2. h-full para que el contenedor del carrusel tome toda la altura */}
      <CarouselContent className="-ml-3 h-full">
        {mods.map((mod) => (
          <CarouselItem
            key={mod.id}
            // 3. Añadido h-full al item para que todos los elementos tengan la misma altura
            className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 h-full"
          >
            {/* 4. block -> flex y h-full en el Link para que la tarjeta ocupe el 100% */}
            <Link
              href={`/home/explore/mod/${mod.id}`}
              className="flex group h-full"
            >
              {/* 5. flex y flex-col en la tarjeta para distribuir el espacio verticalmente */}
              <Card className="flex flex-col w-full h-full overflow-hidden border-border/50 bg-muted/10 transition-all hover:border-primary/40 hover:shadow-md">
                {/* shrink-0 evita que la imagen se comprima si hay poco espacio vertical */}
                <div className="relative shrink-0">
                  <img
                    src={mod.image}
                    alt={mod.name}
                    className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-2 right-2 backdrop-blur-sm bg-background/70 text-xs"
                  >
                    {mod.category}
                  </Badge>
                </div>

                {/* 6. flex-1 hace que este contenedor ocupe el espacio sobrante */}
                <CardContent className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {mod.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      by {mod.author}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 mt-auto">
                    <Download className="size-3" />
                    <span>{formatNumber(mod.downloads)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-3 size-8" />
      <CarouselNext className="-right-3 size-8" />
    </Carousel>
  );
}
