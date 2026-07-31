import { ServicesContext } from "../../ports/ServicesContext";
type Deps = Pick<ServicesContext, "commentRepository" | "tokenService">;

export class UpdateCommentUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, message: string, id: bigint): Promise<void> {
    const { tokenService, commentRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    await commentRepository.update(id, userId, { message });
  }
}
