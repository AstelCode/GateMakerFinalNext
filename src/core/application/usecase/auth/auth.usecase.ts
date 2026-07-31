import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  "userRepository" | "tokenService" | "hashService"
>;
export class AuthUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(email: string, password: string): Promise<string> {
    const { userRepository, hashService, tokenService } = this.deps;
    const user = await userRepository.findBasicByEmail(email);
    if (!user) throw new Error("User not found.");
    const valid = await hashService.comparePasswords(
      user.getPassword(),
      password,
    );
    if (!valid) throw new Error("Email or Password are incorrect");
    const token = await tokenService.sign({
      userId: user.getId(),
      email: user.getEmail(),
      role: user.getRol(),
    });
    return token;
  }
}
