import { Mod, ModType } from "../model/Mod";
import { Version } from "../types/Version.type";
import { VersionType } from "../types/VersionType.type";

export interface ModFilter {
  versionType?: VersionType;
  query?: string;
  version?: Version;
  types?: ModType[];
}

export interface ModUpdateData {
  name?: string;
  version?: Version;
  versionType?: VersionType;
  principalImageSrc?: string;
  active?: boolean;
}

export interface ModRepository {
  findById(id: bigint): Promise<Mod | undefined>;
  listWithFilter(filter: ModFilter): Promise<Mod[]>;

  listByAuthor(userId: bigint): Promise<Mod[]>;
  listByUser(userId: bigint): Promise<Mod[]>;

  update(id: bigint, data: ModUpdateData): Promise<void>;
  setPrincipalImage(id: bigint, fileInfoId: bigint): Promise<void>;
  setFile(id: bigint, fileId: bigint): Promise<void>;
  addImage(id: bigint, fileId: bigint): Promise<void>;
  deleteImage(id: bigint, fileId: bigint): Promise<void>;
  delete(id: bigint): Promise<void>;
  save(mod: Mod): Promise<void>;
}
