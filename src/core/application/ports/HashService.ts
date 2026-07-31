export interface HashService {
  hashPassword(value: string): Promise<string>;
  comparePasswords(hash: string, value: string): Promise<boolean>;
}
