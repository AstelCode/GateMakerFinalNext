import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  "modRepository" | "tokenService" | "fileInfoRepository" | "fileRepository"
>;

export class DeleteImageModUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    token: string,
    modId: bigint,
    fileInfoId: bigint,
  ): Promise<void> {
    const { modRepository, tokenService, fileRepository, fileInfoRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);

    const mod = await modRepository.findById(modId);
    if (!mod) throw new Error("Mod not found.");
    if (mod.toPersistance().authorId !== userId)
      throw new Error("Unauthorized.");

    const fileInfo = await fileInfoRepository.findById(fileInfoId);
    if (!fileInfo) throw new Error("FileInfo not found.");

    await modRepository.deleteImage(modId, fileInfoId);

    await fileRepository.delete(fileInfo.getSrc());
    await fileInfoRepository.delete(fileInfoId);
  }
}
