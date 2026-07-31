import { ServicesContext } from "../../ports/ServicesContext";

export class DeletePackUseCase {
  constructor(
    private readonly deps: Pick<
      ServicesContext,
      "packRepository" | "tokenService" | "fileRepository"
    >,
  ) {}

  async execute(token: string, packId: bigint): Promise<void> {
    const { packRepository, tokenService, fileRepository } = this.deps;
    const { userId } = await tokenService.verify(token);

    const pack = await packRepository.findById(packId);
    if (!pack || pack.toPersistance().authorId !== userId)
      throw new Error("Unauthorized.");

    await packRepository.delete(packId);

    const destPath = `packs/${packId}`;
    await fileRepository.deleteFolder(destPath);
  }
}
