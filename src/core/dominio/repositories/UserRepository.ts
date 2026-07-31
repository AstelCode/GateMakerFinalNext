import { User, UserRol } from "../model/User";

export interface UserUpdateData {
  rol?: UserRol;
  active?: boolean;
}

export interface UserRepository {
  findById(id: bigint): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;

  findBasicById(id: bigint): Promise<User | undefined>;
  findBasicByEmail(email: string): Promise<User | undefined>;

  existsById(id: bigint): Promise<boolean>;

  update(id: bigint, data: UserUpdateData): Promise<void>;
  updatePassword(id: bigint, newPassword: string): Promise<void>;
  updateIcon(id: bigint, fileInfoId: bigint): Promise<void>;

  save(user: User): Promise<void>;
  delete(id: bigint): Promise<void>;
  listUsers(): Promise<User[]>;
  listAdmins(): Promise<User[]>;
}
