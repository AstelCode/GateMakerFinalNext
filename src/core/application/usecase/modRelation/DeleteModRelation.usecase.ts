import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  "modRelationRepository" | "modRepository" | "tokenService"
>;

export class DeleteModRelationUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string, relationId: bigint): Promise<void> {
    const { modRelationRepository, modRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);

    const relation = await modRelationRepository.findById(relationId);
    if (!relation) throw new Error("Relation not found.");

    const { modAId } = relation.toPersistance();
    if (!modAId) throw new Error("Invalid relation data.");

    const modA = await modRepository.findById(modAId);
    if (!modA || modA.toPersistance().authorId !== userId) {
      throw new Error("Unauthorized.");
    }

    await modRelationRepository.delete(relationId);
  }
}
