export interface TokenService {
  sign(payload: {
    userId: bigint;
    email: string;
    role: string;
  }): Promise<string>;
  verify(
    token: string,
  ): Promise<{ userId: bigint; email: string; role: string }>;
}
