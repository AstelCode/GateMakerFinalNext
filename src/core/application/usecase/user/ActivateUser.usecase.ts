import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  "userRepository" | "tokenService" | "verificationTokenRepository"
>;

export class ActivateUserUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string): Promise<void> {
    const { userRepository, tokenService, verificationTokenRepository } =
      this.deps;

    const { userId } = await tokenService.verify(token);

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const userData = user.toJson();
    if (userData.active) {
      throw new Error("User is already active.");
    }

    const userTokens = await verificationTokenRepository.listByUser(userId);
    const verificationToken = userTokens.find(
      (t) => t.toPersistance().token === token,
    );

    if (!verificationToken) {
      throw new Error(
        "Verification token is invalid, already used, or revoked.",
      );
    }

    if (verificationToken.isExpired()) {
      const tokenId = verificationToken.toJson().id;
      await verificationTokenRepository.delete(tokenId);
      throw new Error("Verification token has expired.");
    }

    await userRepository.update(userId, { active: true });

    const tokenId = verificationToken.toJson().id;
    await verificationTokenRepository.delete(tokenId);
  }
}
