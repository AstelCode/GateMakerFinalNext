import { UserJson } from "@/core/dominio/model/User";
import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<ServicesContext, "userRepository" | "tokenService">;
export class GetProfileUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string): Promise<UserJson> {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("User not found.");
    return user.toJson();
  }
}
