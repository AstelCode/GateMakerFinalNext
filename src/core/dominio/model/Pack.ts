import { Comment } from "./Comment";
import { FileInfo } from "./FileInfo";
import { Mod } from "./Mod";
import { User, UserJson } from "./User";
import { Version } from "../types/Version.type";
import { VersionType } from "../types/VersionType.type";
import { JsonSerializable } from "./JsonSerializable";
import { Persistable } from "./Persistable";

export interface PackArgs {
  id?: bigint;
  name: string;
  description: string;
  version: Version;
  versionType: VersionType;
  createdAt?: Date;
  updatedAt?: Date;
  principalImage?: FileInfo;
  principalImageSrc?: string;
  images?: FileInfo[];
  mods?: Mod[];
  comments?: Comment[];
  author?: User;
  authorId?: bigint;
  active?: boolean;
}

export interface PackJson {
  id: bigint;
  name: string;
  description: string;
  version: Version;
  versionType: VersionType;
  createdAt: Date;
  updatedAt: Date;
  principalImageSrc: string;
  author?: UserJson;
  active: boolean;
}

export interface PackPersistance {
  name: string;
  description: string;
  version: Version;
  versionType: VersionType;
  principalImageSrc: string;
  principalImageId?: bigint;
  authorId?: bigint;
  active: boolean;
}

export class Pack
  implements JsonSerializable<PackJson>, Persistable<PackPersistance>
{
  private id?: bigint;
  private name: string;
  private description: string;
  private version: Version;
  private versionType: VersionType;
  private createdAt?: Date;
  private updatedAt?: Date;
  private principalImage?: FileInfo;
  private principalImageSrc: string;
  private images: FileInfo[];
  private mods: Mod[];
  private comments: Comment[];
  private author?: User;
  private active: boolean;
  private authorId?: bigint;

  constructor(args: PackArgs) {
    this.id = args.id;
    this.name = args.name;
    this.description = args.description;
    this.version = args.version;
    this.versionType = args.versionType;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.principalImage = args.principalImage;
    this.principalImageSrc = args.principalImageSrc ?? "";
    this.images = args.images ?? [];
    this.mods = args.mods ?? [];
    this.comments = args.comments ?? [];
    this.author = args.author;
    this.active = args.active ?? false;
    this.authorId = this.author?.getId() ?? args.authorId;
  }

  getId() {
    if (!this.id) throw new Error("Pack id is not asigned.");
    return this.id;
  }

  toPersistance(): PackPersistance {
    return {
      name: this.name,
      description: this.description,
      version: this.version,
      versionType: this.versionType,
      principalImageSrc: this.principalImageSrc,
      principalImageId: this.principalImage?.getId(),
      authorId: this.author?.getId(),
      active: this.active,
    };
  }

  toJson(): PackJson {
    if (this.id == undefined) throw new Error("Pack id not assigned.");
    if (!this.createdAt) throw new Error("Pack createdAt is not asigned.");
    if (!this.updatedAt) throw new Error("Pack updatedAt is not asigned.");
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      version: this.version,
      versionType: this.versionType,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      principalImageSrc: this.principalImageSrc,
      author: this.author?.toJson(),
      active: this.active,
    };
  }
}
