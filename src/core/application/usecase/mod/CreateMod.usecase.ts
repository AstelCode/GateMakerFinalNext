import { Version } from "@/core/dominio/types/Version.type";
import { ServicesContext } from "../../ports/ServicesContext";
import { VersionType } from "@/core/dominio/types/VersionType.type";
import { Mod, ModType } from "@/core/dominio/model/Mod";

type Deps = Pick<ServicesContext, "modRepository" | "tokenService">;

interface ModData {
  name: string;
  description: string;
  version: Version;
  versionType: VersionType;
  type: ModType;
}
export class CreateModUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, data: ModData): Promise<void> {
    const { modRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const mod = new Mod({ ...data, autorId: userId });
    await modRepository.save(mod);
  }
}
