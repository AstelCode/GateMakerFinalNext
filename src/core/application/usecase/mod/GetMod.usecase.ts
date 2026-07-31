import { ModJson } from "@/core/dominio/model/Mod";
import { ServicesContext } from "../../ports/ServicesContext";

export class GetModUseCase {
  constructor(private readonly deps: Pick<ServicesContext, "modRepository">) {}

  async execute(modId: bigint): Promise<ModJson> {
    const { modRepository } = this.deps;
    const mod = await modRepository.findById(modId);
    if (!mod) throw new Error("Mod not found.");
    return mod.toJson();
  }
}
