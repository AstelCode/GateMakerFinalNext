import { JsonSerializable } from "./JsonSerializable";
import { Persistable } from "./Persistable";

export interface VerificationTokenArgs {
  id?: bigint;
  token: string;
  expiredAt: Date;
  userId?: bigint;
}

export interface VerificationTokenJson {
  id: bigint;
  token: string;
  expiredAt: Date;
}

export interface VerificationTokenPersistance {
  token: string;
  expiredAt: Date;
  userId?: bigint;
}

export class VerificationToken
  implements
    JsonSerializable<VerificationTokenJson>,
    Persistable<VerificationTokenPersistance>
{
  id?: bigint;
  token: string;
  expiredAt: Date;
  userId?: bigint;

  constructor(args: VerificationTokenArgs) {
    this.id = args.id;
    this.token = args.token;
    this.expiredAt = args.expiredAt;
    this.userId = args.userId;
  }

  isExpired(): boolean {
    return new Date() > this.expiredAt;
  }

  toPersistance(): VerificationTokenPersistance {
    return {
      token: this.token,
      expiredAt: this.expiredAt,
      userId: this.userId,
    };
  }

  toJson(): VerificationTokenJson {
    if (this.id == undefined)
      throw new Error("VerificationToken id not assigned.");

    return {
      id: this.id,
      token: this.token,
      expiredAt: this.expiredAt,
    };
  }
}
