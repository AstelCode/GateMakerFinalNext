import { ServicesContext } from "../../ports/ServicesContext";

export class HidePackUseCase {
  constructor(
    private readonly deps: Pick<
      ServicesContext,
      "packRepository" | "tokenService"
    >,
  ) {}

  async execute(token: string, packId: bigint): Promise<void> {
    const { packRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);

    const pack = await packRepository.findById(packId);
    if (!pack || pack.toPersistance().authorId !== userId)
      throw new Error("Unauthorized.");

    await packRepository.update(pack.getId(), {
      active: false,
    });
  }
}
