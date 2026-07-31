import { JsonSerializable } from "./JsonSerializable";
import { Persistable } from "./Persistable";
import { isValidEmail } from "../validators/Email";
import { isValidPassword } from "../validators/Password";
import { FileInfo } from "./FileInfo";
import { Mod, ModJson } from "./Mod";
import { Pack, PackJson } from "./Pack";
import { VerificationToken } from "./VerificationToken";
import { CommentJson, Comment } from "./Comment";
export type UserRol = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface UserArgs {
  id?: bigint;
  nickname: string;
  email: string;
  active?: boolean;
  role?: UserRol;
  password: string;
  verificationTokens?: VerificationToken[];
  icon?: FileInfo;
  iconId?: bigint;
  iconSrc?: string;
  comments?: Comment[];
  mods?: Mod[];
  packs?: Pack[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserJson {
  id: bigint;
  nickname: string;
  active: boolean;
  role: UserRol;
  createdAt: Date;
  updatedAt: Date;
  iconSrc: string;
  comments: CommentJson[];
  mods: ModJson[];
  packs: PackJson[];
}

export interface UserPersistance {
  nickname: string;
  password: string;
  email: string;
  role: UserRol;
  active: boolean;
  iconId?: bigint;
  iconSrc?: string;
}

export class User
  implements JsonSerializable<UserJson>, Persistable<UserPersistance>
{
  private id?: bigint;
  private nickname: string;
  private password: string;
  private email: string;
  private active: boolean;
  private role: UserRol;
  private createdAt?: Date;
  private updatedAt?: Date;
  private verificationTokens: VerificationToken[];
  private icon?: FileInfo;
  private iconId?: bigint;
  private iconSrc?: string;
  private comments: Comment[];
  private mods: Mod[];
  private packs: Pack[];

  constructor(args: UserArgs) {
    this.id = args.id;
    this.nickname = args.nickname;

    if (!isValidEmail(args.email))
      throw new Error("Email format is incorrect.");

    this.email = args.email;
    this.active = args.active ?? false;
    this.role = args.role ?? "USER";
    this.verificationTokens = args.verificationTokens ?? [];
    this.icon = args.icon;
    this.comments = args.comments ?? [];
    this.iconSrc = args.iconSrc;
    this.password = args.password;
    this.mods = args.mods ?? [];
    this.packs = args.packs ?? [];
    this.updatedAt = args.updatedAt;
    this.createdAt = args.createdAt;
    this.iconId = this.icon?.getId() ?? args.iconId;
  }

  getPassword(): string {
    return this.password;
  }
  setPassword(password: string) {
    this.password = password;
  }
  getEmail(): string {
    return this.email;
  }
  getRol(): UserRol {
    return this.role;
  }

  getId(): bigint {
    if (!this.id) throw new Error("User id is not asigned.");
    return this.id;
  }
  getIconId() {
    if (!this.iconId) throw new Error("User iconId is not asigned.");
    return this.iconId;
  }
  validatePassword() {
    if (!isValidPassword(this.password))
      throw new Error("Password format is incorrect");
  }

  toPersistance(): UserPersistance {
    if (!this.password) throw new Error("User password is not asigned.");
    return {
      nickname: this.nickname,
      password: this.password,
      email: this.email,
      role: this.role,
      active: this.active,
      iconId: this.iconId,
      iconSrc: this.iconSrc,
    };
  }
  toJson(): UserJson {
    if (this.id == undefined) throw new Error("User id not asigned.");
    if (this.iconSrc == undefined) throw new Error("User iconSrc not asigned.");
    if (this.createdAt == undefined)
      throw new Error("User CreatedAt not asigned.");
    if (this.updatedAt == undefined)
      throw new Error("User UpdateAt not asinged.");
    return {
      id: this.id,
      nickname: this.nickname,
      active: this.active,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      iconSrc: this.iconSrc,
      comments: this.comments.map((i) => i.toJson()),
      packs: this.packs.map((i) => i.toJson()),
      mods: this.mods.map((i) => i.toJson()),
    };
  }
}
