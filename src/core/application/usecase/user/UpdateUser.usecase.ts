import { UserUpdateData } from "@/core/dominio/repositories";
import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<ServicesContext, "userRepository" | "tokenService">;
export class UpdateUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, data: UserUpdateData): Promise<void> {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const exists = await userRepository.existsById(userId);
    if (!exists) throw new Error("User not found.");
    await userRepository.update(userId, data);
  }
}
