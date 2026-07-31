import { PackJson } from "@/core/dominio/model/Pack";
import { PackFilter } from "@/core/dominio/repositories";
import { ServicesContext } from "../../ports/ServicesContext";

export class ListPacksUseCase {
  constructor(private readonly deps: Pick<ServicesContext, "packRepository">) {}

  async execute(filter: PackFilter): Promise<PackJson[]> {
    const { packRepository } = this.deps;
    const packs = await packRepository.listWithFilter(filter);
    return packs.map((pack) => pack.toJson());
  }
}
