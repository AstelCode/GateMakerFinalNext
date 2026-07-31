import { UserJson } from "@/core/dominio/model/User";
import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<ServicesContext, "userRepository" | "tokenService">;
export class ListUsersUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string): Promise<UserJson[]> {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.findBasicById(userId);
    if (!user) throw new Error("User not found.");
    if (user.getRol() == "ADMIN") {
      const list = await userRepository.listUsers();
      return list.map((item) => item.toJson());
    }
    if (user.getRol() == "SUPER_ADMIN") {
      const userList = await userRepository.listUsers();
      const adminList = await userRepository.listAdmins();
      return [...userList, ...adminList].map((item) => item.toJson());
    }
    throw new Error("Unauthorrized.");
  }
}
