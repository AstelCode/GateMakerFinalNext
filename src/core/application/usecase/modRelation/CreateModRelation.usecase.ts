import { ServicesContext } from "../../ports/ServicesContext";
import { ModRelation, ModRelationType } from "@/core/dominio/model/ModRelation";

type Deps = Pick<
  ServicesContext,
  "modRelationRepository" | "modRepository" | "tokenService"
>;

interface CreateRelationData {
  type: ModRelationType;
  modAId: bigint;
  modBId: bigint;
}

export class CreateModRelationUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string, data: CreateRelationData): Promise<void> {
    const { modRelationRepository, modRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);

    const modA = await modRepository.findById(data.modAId);
    if (!modA) throw new Error("Mod A not found.");
    if (modA.toPersistance().authorId !== userId) {
      throw new Error(
        "Unauthorized: You can only add relations to your own mods.",
      );
    }

    const modB = await modRepository.findById(data.modBId);
    if (!modB) throw new Error("Mod B not found.");

    if (data.modAId === data.modBId) {
      throw new Error("A mod cannot have a relation with itself.");
    }

    const relation = new ModRelation({
      type: data.type,
      modAId: data.modAId,
      modBId: data.modBId,
    });

    await modRelationRepository.save(relation);
  }
}
