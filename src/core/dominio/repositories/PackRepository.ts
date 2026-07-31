import { ModType } from "../model/Mod";
import { Pack } from "../model/Pack";
import { Version } from "../types/Version.type";
import { VersionType } from "../types/VersionType.type";

export interface PackFilter {
  versionType?: VersionType;
  query?: string;
  version?: Version;
  types?: ModType[];
}
export interface PackUpdateData {
  name?: string;
  version?: Version;
  versionType?: VersionType;
  principalImageSrc?: string;
  active: boolean;
}

export interface PackRepository {
  findById(id: bigint): Promise<Pack | undefined>;
  listWithFilter(filter: PackFilter): Promise<Pack[]>;

  listByAuthor(userId: bigint): Promise<Pack[]>;
  listByUser(userId: bigint): Promise<Pack[]>;

  update(id: bigint, data: PackUpdateData): Promise<void>;
  addMod(id: bigint, modId: bigint): Promise<void>;
  deleteMod(id: bigint, modId: bigint): Promise<void>;
  setPrincipalImage(id: bigint, fileInfoId: bigint): Promise<void>;
  addImage(id: bigint, fileId: bigint): Promise<void>;
  deleteImage(id: bigint, fileId: bigint): Promise<void>;
  save(pack: Pack): Promise<void>;
  delete(id: bigint): Promise<void>;
}
