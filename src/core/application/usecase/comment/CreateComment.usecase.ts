import { ServicesContext } from "../../ports/ServicesContext";
import { Comment } from "@/core/dominio/model/Comment";
type Deps = Pick<ServicesContext, "commentRepository" | "tokenService">;

export class CreateCommentUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    message: string,
    id: bigint,
    type: "PACK" | "MOD",
  ): Promise<void> {
    const { tokenService, commentRepository } = this.deps;
    const { userId } = await tokenService.verify(token);

    const comment = new Comment({
      message,
      authorId: userId,
      ...(type == "MOD" ? { modId: id } : { packId: id }),
    });

    await commentRepository.save(comment);
  }
}
