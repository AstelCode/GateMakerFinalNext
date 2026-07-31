import { ServicesContext } from "../../ports/ServicesContext";

type FileDeps = Pick<
  ServicesContext,
  | "packRepository"
  | "tokenService"
  | "fileInfoRepository"
  | "fileRepository"
  | "uuidService"
>;
export class DeleteImagePackUseCase {
  constructor(private readonly deps: Omit<FileDeps, "uuidService">) {}

  async execute(
    token: string,
    packId: bigint,
    fileInfoId: bigint,
  ): Promise<void> {
    const { packRepository, tokenService, fileRepository, fileInfoRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);

    const pack = await packRepository.findById(packId);
    if (!pack) throw new Error("Pack not found.");
    if (pack.toPersistance().authorId !== userId)
      throw new Error("Unauthorized.");

    const fileInfo = await fileInfoRepository.findById(fileInfoId);
    if (!fileInfo) throw new Error("FileInfo not found.");

    await packRepository.deleteImage(packId, fileInfoId);
    await fileRepository.delete(fileInfo.getSrc());
    await fileInfoRepository.delete(fileInfoId);
  }
}
