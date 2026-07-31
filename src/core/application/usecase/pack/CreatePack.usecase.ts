import { Version } from "@/core/dominio/types/Version.type";
import { VersionType } from "@/core/dominio/types/VersionType.type";
import { ServicesContext } from "../../ports/ServicesContext";
import { Pack } from "@/core/dominio/model/Pack";

type Deps = Pick<ServicesContext, "packRepository" | "tokenService">;

interface CreatePackData {
  name: string;
  description: string;
  version: Version;
  versionType: VersionType;
}

export class CreatePackUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string, data: CreatePackData): Promise<void> {
    const { packRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);

    const pack = new Pack({
      ...data,
      authorId: userId,
    });

    await packRepository.save(pack);
  }
}
