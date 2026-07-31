import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  "userRepository" | "tokenService" | "fileRepository"
>;

export class DeleteUserByAdminUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(adminToken: string, userId: bigint): Promise<void> {
    const { userRepository, tokenService, fileRepository } = this.deps;
    const { userId: adminId } = await tokenService.verify(adminToken);
    const admin = await userRepository.findBasicById(adminId);
    if (!admin || admin.getRol() == "USER") throw new Error("Unauthorrized.");
    const user = await userRepository.findBasicById(userId);
    if (!user) throw new Error("User don't found.");
    if (admin.getRol() == "ADMIN" && user.getRol() == "ADMIN")
      throw new Error("Unauthorrized.");
    if (user.getRol() == "SUPER_ADMIN") throw new Error("Unauthorrized.");
    userRepository.delete(user.getId());
    const destPath = `users/${user.getId()}`;
    await fileRepository.deleteFolder(destPath);
  }
}
