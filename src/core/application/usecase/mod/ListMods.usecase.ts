import { ModFilter } from "@/core/dominio/repositories";
import { ServicesContext } from "../../ports/ServicesContext";
import { ModJson } from "@/core/dominio/model/Mod";

type Deps = Pick<ServicesContext, "modRepository">;

export class ListModsUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(filter: ModFilter): Promise<ModJson[]> {
    const { modRepository } = this.deps;

    const mods = await modRepository.listWithFilter(filter);
    return mods.map((mod) => mod.toJson());
  }
}
