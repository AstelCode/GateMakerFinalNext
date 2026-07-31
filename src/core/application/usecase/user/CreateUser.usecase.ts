import { User } from "@/core/dominio/model/User";
import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  | "userRepository"
  | "tokenService"
  | "hashService"
  | "nicknameService"
  | "emailService"
>;

export class CreateUserUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(email: string, password: string): Promise<void> {
    const {
      userRepository,
      tokenService,
      hashService,
      nicknameService,
      emailService,
    } = this.deps;

    const user = new User({
      nickname: nicknameService.generate(),
      email,
      password,
    });

    user.validatePassword();
    const hashedPassword = await hashService.hashPassword(user.getPassword());
    user.setPassword(hashedPassword);
    await userRepository.save(user);

    const token = await tokenService.sign({
      userId: user.getId(),
      email: user.getEmail(),
      role: user.getRol(),
    });

    await emailService.sendVerificationEmail(user.getEmail(), token);
  }
}
