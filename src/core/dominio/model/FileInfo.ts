import { JsonSerializable } from "./JsonSerializable";
import { Persistable } from "./Persistable";

export type FileInfoRole = "IMAGE" | "SHADER" | "MOD";

export interface FileInfoArgs {
  id?: bigint;
  basePath: string;
  src: string;
  role: FileInfoRole;
  external?: boolean;
  weight: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FileInfoJson {
  id: bigint;
  basePath: string;
  src: string;
  role: FileInfoRole;
  external: boolean;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileInfoPersistance {
  src: string;
  basePath: string;

  role: FileInfoRole;
  external: boolean;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}

export class FileInfo
  implements JsonSerializable<FileInfoJson>, Persistable<FileInfoPersistance>
{
  private id?: bigint;
  private src: string;
  private basePath: string;
  private role: FileInfoRole;
  private external: boolean;
  private weight: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(args: FileInfoArgs) {
    this.id = args.id;
    this.src = args.src;
    this.role = args.role;
    this.external = args.external ?? false;
    this.weight = args.weight;
    this.createdAt = args.createdAt ?? new Date();
    this.updatedAt = args.updatedAt ?? new Date();
    this.basePath = args.basePath;
  }

  getId() {
    if (!this.id) throw new Error("FileInfo id not asigned");
    return this.id;
  }
  getSrc() {
    if (!this.src) throw new Error("FileInfo src not asigned");
    return this.src;
  }

  getFullSrc() {
    return this.basePath + "/" + this.src;
  }

  toPersistance(): FileInfoPersistance {
    return {
      src: this.src,
      basePath: this.basePath,
      role: this.role,
      external: this.external,
      weight: this.weight,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toJson(): FileInfoJson {
    if (this.id == undefined) throw new Error("FileInfo id not assigned.");

    return {
      id: this.id,
      basePath: this.basePath,
      src: this.src,
      role: this.role,
      external: this.external,
      weight: this.weight,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
