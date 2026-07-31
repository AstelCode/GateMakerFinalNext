/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileInfo } from "@/core/dominio/model/FileInfo";
import { ServicesContext } from "../../ports/ServicesContext";

type FileDeps = Pick<
  ServicesContext,
  | "packRepository"
  | "tokenService"
  | "fileInfoRepository"
  | "fileRepository"
  | "uuidService"
>;

export class UpdatePrincipalImagePackUseCase {
  constructor(private readonly deps: FileDeps) {}

  async execute(
    token: string,
    packId: bigint,
    fileStream: any,
    contentType: string,
  ): Promise<void> {
    const {
      packRepository,
      tokenService,
      fileRepository,
      fileInfoRepository,
      uuidService,
    } = this.deps;
    const { userId } = await tokenService.verify(token);

    const pack = await packRepository.findById(packId);
    if (!pack) throw new Error("Pack not found.");

    const { authorId, principalImageId, principalImageSrc } =
      pack.toPersistance();
    if (authorId !== userId) throw new Error("Unauthorized.");

    const destPath = `packs/${packId}/principal/${uuidService.generate()}`;
    const { src, basePath, weight } = await fileRepository.upload(
      destPath,
      fileStream,
      contentType,
    );

    try {
      if (principalImageId) {
        await fileRepository.delete(principalImageSrc);
        await fileInfoRepository.update(principalImageId, {
          src,
          basePath,
          weight,
        });
      } else {
        const newFileInfo = new FileInfo({
          basePath,
          src,
          weight,
          role: "IMAGE",
        });
        await fileInfoRepository.save(newFileInfo);
        await packRepository.setPrincipalImage(packId, newFileInfo.getId());
      }
    } catch (error) {
      await fileRepository.delete(src).catch(console.error);
      throw error;
    }
  }
}
