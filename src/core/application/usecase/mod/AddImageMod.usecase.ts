/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesContext } from "../../ports/ServicesContext";
import { FileInfo } from "@/core/dominio/model/FileInfo";

type Deps = Pick<
  ServicesContext,
  | "modRepository"
  | "tokenService"
  | "fileInfoRepository"
  | "fileRepository"
  | "uuidService"
>;

export class AddImageModUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    token: string,
    modId: bigint,
    fileStream: any,
    contentType: string,
  ): Promise<void> {
    const {
      modRepository,
      tokenService,
      fileRepository,
      fileInfoRepository,
      uuidService,
    } = this.deps;
    const { userId } = await tokenService.verify(token);

    const mod = await modRepository.findById(modId);
    if (!mod) throw new Error("Mod not found.");
    if (mod.toPersistance().authorId !== userId)
      throw new Error("Unauthorized.");

    const destPath = `mods/${modId}/gallery/${uuidService.generate()}`;
    const { src, basePath, weight } = await fileRepository.upload(
      destPath,
      fileStream,
      contentType,
    );

    try {
      const newFileInfo = new FileInfo({
        basePath,
        src,
        weight,
        role: "IMAGE",
      });
      await fileInfoRepository.save(newFileInfo);
      await modRepository.addImage(modId, newFileInfo.getId());
    } catch (error) {
      await fileRepository.delete(src).catch(console.error);
      throw error;
    }
  }
}
