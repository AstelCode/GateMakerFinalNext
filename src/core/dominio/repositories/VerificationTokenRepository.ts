import { VerificationToken } from "../model/VerificationToken";

export interface VerificationTokenRepository {
  save(verificationToken: VerificationToken): Promise<void>;
  findById(id: bigint): Promise<VerificationToken | undefined>;
  listByUser(userId: bigint): Promise<VerificationToken[]>;
  delete(id: bigint): Promise<void>;
}
