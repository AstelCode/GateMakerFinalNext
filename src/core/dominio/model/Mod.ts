import { FileInfo, FileInfoJson } from "./FileInfo";
import { Comment, CommentJson } from "./Comment";
import { VersionType } from "../types/VersionType.type";
import { Version } from "../types/Version.type";
import { User, UserJson } from "./User";
import { JsonSerializable } from "./JsonSerializable";
import { Persistable } from "./Persistable";

export type ModType = "SHADER" | "MOD";

export interface ModArgs {
  id?: bigint;
  name: string;
  description: string;
  version: Version;
  versionType: VersionType;
  createdAt?: Date;
  updatedAt?: Date;
  type: ModType;
  principalImage?: FileInfo;
  principalImageSrc?: string;
  images?: FileInfo[];
  comments?: Comment[];
  file?: FileInfo;
  autorId?: bigint;
  author?: User;
  active?: boolean;
}

export interface ModJson {
  id: bigint;
  name: string;
  description: string;
  version: Version;
  versionType: VersionType;
  createdAt: Date;
  updatedAt: Date;
  type: ModType;
  principalImageSrc: string;
  author?: UserJson;
  active: boolean;
  images: string[];
  comments: CommentJson[];
}

export interface ModPersistance {
  name: string;
  description: string;
  version: Version;
  versionType: VersionType;
  type: ModType;
  principalImageSrc: string;
  principalImageId?: bigint;
  fileId?: bigint;
  authorId?: bigint;
  active: boolean;
}

export class Mod
  implements JsonSerializable<ModJson>, Persistable<ModPersistance>
{
  private id?: bigint;
  private name: string;
  private description: string;
  private version: Version;
  private versionType: VersionType;
  private createdAt?: Date;
  private updatedAt?: Date;
  private type: ModType;
  private principalImage?: FileInfo;
  private principalImageSrc: string;
  private images: FileInfo[];
  private comments: Comment[];
  private file?: FileInfo;
  private author?: User;
  private active: boolean;

  constructor(args: ModArgs) {
    this.id = args.id;
    this.name = args.name;
    this.description = args.description;
    this.version = args.version;
    this.versionType = args.versionType;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.type = args.type;
    this.principalImage = args.principalImage;
    this.principalImageSrc = args.principalImageSrc ?? "";
    this.images = args.images ?? [];
    this.comments = args.comments ?? [];
    this.file = args.file;
    this.author = args.author;
    this.active = args.active ?? false;
  }

  getId() {
    if (!this.id) throw new Error("Mod is not asigned.");
    return this.id;
  }

  toPersistance(): ModPersistance {
    return {
      name: this.name,
      description: this.description,
      version: this.version,
      versionType: this.versionType,
      type: this.type,
      principalImageSrc: this.principalImageSrc,
      principalImageId: this.principalImage?.getId(),
      fileId: this.file?.getId(),
      authorId: this.author?.getId(),
      active: this.active,
    };
  }

  toJson(): ModJson {
    if (this.id == undefined) throw new Error("Mod id not assigned.");
    if (this.createdAt == undefined)
      throw new Error("Mod createdAt id not assigned.");
    if (this.updatedAt == undefined)
      throw new Error("Mod updatedAt id not assigned.");

    return {
      id: this.id,
      name: this.name,
      description: this.description,
      version: this.version,
      versionType: this.versionType,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      type: this.type,
      principalImageSrc: this.principalImageSrc,
      author: this.author?.toJson(),
      active: this.active,
      images: this.images.map((item) => item.getFullSrc()),
      comments: this.comments.map((item) => item.toJson()),
    };
  }
}
