import { FileInfo } from "../model/FileInfo";

export interface FileInfoFilter {
  modIdFile?: bigint;
  modIdImages?: bigint;

  packIdImages?: bigint;
}

export interface FileInfoUpdateData {
  src?: string;
  role?: string;
  external?: string;
  basePath?: string;
  path?: string;
  weight?: number;
}
export interface FileInfoRepository {
  save(fileInfo: FileInfo): Promise<void>;
  findById(id: bigint): Promise<FileInfo | undefined>;
  listByFilter(filter: FileInfoFilter): Promise<FileInfo[]>;
  delete(id: bigint): Promise<void>;
  update(id: bigint, data: FileInfoUpdateData): Promise<void>;
}
