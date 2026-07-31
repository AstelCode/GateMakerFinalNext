import { Comment } from "../model/Comment";

export interface CommentUpdateData {
  message?: string;
}
export interface CommentRepository {
  findById(id: bigint, authorId: bigint): Promise<Comment | undefined>;
  delete(id: bigint, authorId: bigint): Promise<void>;
  update(id: bigint, authorId: bigint, data: CommentUpdateData): Promise<void>;
  listByAuthor(autorId: bigint): Promise<Comment[]>;
  listByPack(packId: bigint): Promise<Comment[]>;
  listByMod(modId: bigint): Promise<Comment[]>;
  save(comment: Comment): Promise<void>;
}
