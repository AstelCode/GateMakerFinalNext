import { ServicesContext } from "../../ports/ServicesContext";

type PackModDeps = Pick<
  ServicesContext,
  "packRepository" | "modRepository" | "tokenService" | "fileRepository"
>;

export class AddModToPackUseCase {
  constructor(private readonly deps: PackModDeps) {}

  async execute(token: string, packId: bigint, modId: bigint): Promise<void> {
    const { packRepository, modRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);

    const pack = await packRepository.findById(packId);
    if (!pack || pack.toPersistance().authorId !== userId)
      throw new Error("Pack not found or Unauthorized.");

    const mod = await modRepository.findById(modId);
    if (!mod) throw new Error("Mod not found.");

    await packRepository.addMod(packId, modId);
  }
}
