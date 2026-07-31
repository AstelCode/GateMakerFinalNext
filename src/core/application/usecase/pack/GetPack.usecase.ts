import { PackJson } from "@/core/dominio/model/Pack";
import { ServicesContext } from "../../ports/ServicesContext";
type Deps = Pick<ServicesContext, "packRepository">;
export class GetPackUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(packId: bigint): Promise<PackJson> {
    const { packRepository } = this.deps;
    const pack = await packRepository.findById(packId);
    if (!pack) throw new Error("Pack not found.");
    return pack.toJson();
  }
}
