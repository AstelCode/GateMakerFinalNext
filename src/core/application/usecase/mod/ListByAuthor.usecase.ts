import { ServicesContext } from "../../ports/ServicesContext";
import { ModJson } from "@/core/dominio/model/Mod";

type Deps = Pick<ServicesContext, "modRepository">;

export class ListByAuthorUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(authorId: bigint): Promise<ModJson[]> {
    const { modRepository } = this.deps;
    const mods = await modRepository.listByAuthor(authorId);
    return mods.map((mod) => mod.toJson());
  }
}
