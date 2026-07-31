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

export class UploadModFileUseCase {
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

    const persistance = mod.toPersistance();
    if (persistance.authorId !== userId) throw new Error("Unauthorized.");

    const destPath = `mods/${modId}/files/${uuidService.generate()}`;
    const { src, basePath, weight } = await fileRepository.upload(
      destPath,
      fileStream,
      contentType,
    );

    try {
      if (persistance.fileId) {
        const oldFileInfo = await fileInfoRepository.findById(
          persistance.fileId,
        );
        if (oldFileInfo) {
          await fileRepository.delete(oldFileInfo.getSrc());
          await fileInfoRepository.update(oldFileInfo.getId(), {
            src,
            basePath,
            weight,
          });
        }
      } else {
        const newFileInfo = new FileInfo({
          basePath,
          src,
          weight,
          role: "MOD",
        });
        await fileInfoRepository.save(newFileInfo);

        await modRepository.setFile(modId, newFileInfo.getId());
      }
    } catch (error) {
      await fileRepository.delete(src).catch(console.error);
      throw error;
    }
  }
}
