/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesContext } from "../../ports/ServicesContext";
import { FileInfo } from "@/core/dominio/model/FileInfo";

type Deps = Pick<
  ServicesContext,
  | "userRepository"
  | "tokenService"
  | "fileInfoRepository"
  | "fileRepository"
  | "uuidService"
>;
export class SetUserIconUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    userId: bigint,
    fileStream: any,
    contentType: string,
  ): Promise<void> {
    const { userRepository, fileInfoRepository, fileRepository, uuidService } =
      this.deps;

    const user = await userRepository.findBasicById(userId);
    if (!user) throw new Error("User not found.");

    const destPath = `users/${userId}/${uuidService.generate()}`;

    const { src, basePath, weight } = await fileRepository.upload(
      destPath,
      fileStream,
      contentType,
    );

    try {
      const iconId = user.getIconId();
      if (iconId != undefined) {
        const fileInfo = await fileInfoRepository.findById(iconId);
        if (!fileInfo) throw new Error("FileInfo not found");
        await fileRepository.delete(fileInfo.src);
        await fileInfoRepository.update(fileInfo.id!, { src, weight });
      } else {
        const newFileInfo = new FileInfo({
          basePath,
          src,
          weight,
          role: "IMAGE",
        });

        await fileInfoRepository.save(newFileInfo);
        await userRepository.updateIcon(userId, newFileInfo.id!);
      }
    } catch (error) {
      fileRepository.delete(src).catch(console.error);
      throw error;
    }
  }
}
