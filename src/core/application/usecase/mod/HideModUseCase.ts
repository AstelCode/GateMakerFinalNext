import { ServicesContext } from "../../ports/ServicesContext";

export class HideModUseCase {
  constructor(
    private readonly deps: Pick<
      ServicesContext,
      "modRepository" | "tokenService"
    >,
  ) {}

  async execute(token: string, modId: bigint): Promise<void> {
    const { modRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);

    const mod = await modRepository.findById(modId);
    if (!mod) throw new Error("Mod not found.");

    if (mod.toPersistance().authorId !== userId)
      throw new Error("Unauthorized.");

    await modRepository.update(userId, { active: false });
  }
}
