import { ServicesContext } from "../../ports/ServicesContext";
type Deps = Pick<ServicesContext, "commentRepository" | "tokenService">;

export class DeleteCommentUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, commentId: bigint): Promise<void> {
    const { commentRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    await commentRepository.delete(commentId, userId);
  }
}
