import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardAction,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ModJson } from "@/core/dominio/model/Mod";
import { PackJson } from "@/core/dominio/model/Pack";
import { Bookmark, Package, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ItemCard({ mod, pack }: { mod?: ModJson; pack?: PackJson }) {
  const type =
    pack != undefined ? "pack" : mod != undefined ? mod.type : undefined;
  const name =
    pack != undefined ? pack.name : mod != undefined ? mod.name : undefined;
  const description =
    pack != undefined
      ? pack.description
      : mod != undefined
        ? mod.description
        : undefined;
  const version =
    pack != undefined
      ? pack.version
      : mod != undefined
        ? mod.version
        : undefined;

  const versionType =
    pack != undefined
      ? pack.versionType
      : mod != undefined
        ? mod.version
        : undefined;
  const href =
    mod != undefined
      ? `/home/explore/mod/${mod.id}`
      : pack != undefined
        ? `/home/explore/pack/${pack.id}`
        : "";

  return (
    <Link href={href} className="w-fit">
      <Card className="overflow-hidden pt-0 h-full flex flex-col max-w-[300px]">
        <div className="relative">
          <Image
            className="w-full h-40 object-cover"
            width="600"
            height="400"
            src={mod?.principalImageSrc ?? "https://placehold.co/600x400/png"}
            alt="Mod preview"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 z-10 h-8 w-8 rounded-xl bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Bookmark className="size-4 shrink-0 text-foreground" />
          </Button>
          <div className="absolute bottom-1.5 left-1.5 flex gap-2">
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-background/70"
            >
              v{version}
            </Badge>
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-background/70"
            >
              v{versionType}
            </Badge>
          </div>
        </div>

        <CardHeader className="flex-grow">
          <CardAction>
            <Badge variant="default">{type?.toLowerCase()}</Badge>
          </CardAction>
          <CardTitle className="truncate">{name}</CardTitle>
          <CardDescription className="truncate">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
