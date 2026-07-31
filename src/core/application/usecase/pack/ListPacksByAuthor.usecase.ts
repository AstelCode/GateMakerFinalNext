import { PackJson } from "@/core/dominio/model/Pack";
import { ServicesContext } from "../../ports/ServicesContext";

export class ListPacksByAuthorUseCase {
  constructor(private readonly deps: Pick<ServicesContext, "packRepository">) {}

  async execute(authorId: bigint): Promise<PackJson[]> {
    const { packRepository } = this.deps;
    const packs = await packRepository.listByAuthor(authorId);
    return packs.map((pack) => pack.toJson());
  }
}
