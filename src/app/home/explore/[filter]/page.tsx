import { ItemCard } from "@/components/features/explore/ItemCard";
import { ModJson } from "@/core/dominio/model/Mod";
import { PackJson } from "@/core/dominio/model/Pack";

type Props = {
  params: Promise<{
    filter: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};
export default async function Page({ params, searchParams }: Props) {
  const { filter } = await params;
  const { q = "" } = await searchParams;

  const mods: ModJson[] = [
    {
      id: BigInt(1),
      name: "hola",
      description: "hola",
      images: [],
      version: "1.20.1",
      versionType: "Forge",
      type: "SHADER",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    },
  ];

  const packs: PackJson[] = [
    {
      id: BigInt(1),
      name: "hola",
      description: "hola",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: "1.20.1",
      versionType: "Forge",
    },
  ];

  return (
    <div className="h-full max-h-[calc(100dvh-64px)] overflow-y-auto p-4 w-full">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(0px,240px))] gap-4">
        {/* Agregué varias copias para que puedas probar el scroll */}

        {(filter == "packs" || filter == "all") &&
          packs.map((item) => (
            <ItemCard pack={item} key={item.id.toString() + "_pack"} />
          ))}

        {(filter == "mods" || filter == "all") &&
          mods.map((item) => (
            <ItemCard mod={item} key={item.id.toString() + "_mod"} />
          ))}
      </div>
    </div>
  );
}
