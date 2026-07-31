import { ServicesContext } from "../../ports/ServicesContext";
import { ModUpdateData } from "@/core/dominio/repositories";
type Deps = Pick<ServicesContext, "modRepository" | "tokenService">;

export class UpdateModUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    token: string,
    modId: bigint,
    data: ModUpdateData,
  ): Promise<void> {
    const { modRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);

    const mod = await modRepository.findById(modId);
    if (!mod) throw new Error("Mod not found.");

    const { authorId } = mod.toPersistance();
    if (authorId !== userId)
      throw new Error("Unauthorized to update this mod.");

    await modRepository.update(modId, data);
  }
}
