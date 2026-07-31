import { JsonSerializable } from "./JsonSerializable";
import { Mod, ModJson } from "./Mod";
import { Pack, PackJson } from "./Pack";
import { Persistable } from "./Persistable";
import { User, UserJson } from "./User";

export interface CommentArgs {
  id?: bigint;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;

  author?: User;
  authorId?: bigint;
  pack?: Pack;
  packId?: bigint;
  mod?: Mod;
  modId?: bigint;
}

export interface CommentJson {
  id: bigint;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  author?: UserJson;
  pack?: PackJson;
  mod?: ModJson;
}

export interface CommentPersistance {
  message: string;
  authorId?: bigint;
  packId?: bigint;
  modId?: bigint;
}

export class Comment
  implements JsonSerializable<CommentJson>, Persistable<CommentPersistance>
{
  id?: bigint;
  message: string;
  author?: User;
  mod?: Mod;
  pack?: Pack;
  createdAt?: Date;
  updatedAt?: Date;

  authorId?: bigint;
  modId?: bigint;
  packId?: bigint;
  constructor(args: CommentArgs) {
    this.id = args.id;
    this.message = args.message;
    this.createdAt = args.createdAt;
    this.author = args.author;
    this.mod = args.mod;
    this.pack = args.pack;
    this.updatedAt = args.updatedAt;
    this.authorId = args.author?.getId() ?? args.authorId;
    this.modId = args.mod?.getId() ?? args.modId;
    this.packId = args.pack?.getId() ?? args.packId;
  }

  toPersistance(): CommentPersistance {
    return {
      message: this.message,
      authorId: this.author?.getId(),
      packId: this.pack?.getId(),
      modId: this.mod?.getId(),
    };
  }

  toJson(): CommentJson {
    if (this.id == undefined) throw new Error("Comment id not assigned.");
    if (this.createdAt == undefined)
      throw new Error("Comment createdAt is not asigned");
    if (this.updatedAt == undefined)
      throw new Error("Comment updatedAt is not asigned");
    return {
      id: this.id,
      message: this.message,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      author: this.author?.toJson(),
      mod: this.mod?.toJson(),
      pack: this.pack?.toJson(),
    };
  }
}
