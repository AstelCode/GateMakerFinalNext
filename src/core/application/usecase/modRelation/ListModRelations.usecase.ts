import { ServicesContext } from "../../ports/ServicesContext";
import { ModRelationJson } from "@/core/dominio/model/ModRelation";

type Deps = Pick<ServicesContext, "modRelationRepository">;

export class ListModRelationsUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(modId: bigint): Promise<ModRelationJson[]> {
    const { modRelationRepository } = this.deps;

    const relations = await modRelationRepository.listByModId(modId);
    return relations.map((relation) => relation.toJson());
  }
}
