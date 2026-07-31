import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<ServicesContext, "modRepository" | "tokenService">;

export class PublishModUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string, modId: bigint): Promise<void> {
    const { modRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);

    const mod = await modRepository.findById(modId);
    if (!mod) throw new Error("Mod not found.");

    const persistance = mod.toPersistance();
    if (persistance.authorId !== userId) throw new Error("Unauthorized.");

    await modRepository.update(mod.getId(), {
      active: true,
    });
  }
}
