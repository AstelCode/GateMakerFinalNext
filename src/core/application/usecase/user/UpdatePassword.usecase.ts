import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  "userRepository" | "tokenService" | "hashService"
>;

export class UpdatePasswordUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, prevPassword: string, newPassword: string) {
    const { userRepository, tokenService, hashService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.findBasicById(userId);
    if (!user) throw new Error("User not found.");
    const valid = await hashService.comparePasswords(
      user.getPassword(),
      prevPassword,
    );
    if (!valid) throw new Error("Current password is incorrect.");
    await userRepository.updatePassword(userId, newPassword);
  }
}
