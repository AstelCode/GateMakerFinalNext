import { Comment, CommentJson } from "@/core/dominio/model/Comment";
import { ServicesContext } from "../../ports/ServicesContext";
type Deps = Pick<ServicesContext, "commentRepository">;

export class ListByAuthorCommentUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(id: bigint, type: "PACK" | "MOD"): Promise<CommentJson[]> {
    const { commentRepository } = this.deps;
    let list: Comment[];
    if (type == "PACK") {
      list = await commentRepository.listByPack(id);
    } else if (type == "MOD") {
      list = await commentRepository.listByMod(id);
    } else {
      list = [];
    }
    return list.map((item) => item.toJson());
  }
}
