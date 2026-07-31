import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  "modRepository" | "tokenService" | "fileRepository"
>;

export class DeleteModUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string, modId: bigint): Promise<void> {
    const { modRepository, tokenService, fileRepository } = this.deps;
    const { userId } = await tokenService.verify(token);

    const mod = await modRepository.findById(modId);
    if (!mod) throw new Error("Mod not found.");
    if (mod.toPersistance().authorId !== userId)
      throw new Error("Unauthorized.");

    await modRepository.delete(modId);

    const destPath = `mods/${modId}`;
    await fileRepository.deleteFolder(destPath);
  }
}
