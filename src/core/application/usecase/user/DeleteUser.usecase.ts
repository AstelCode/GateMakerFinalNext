import { ServicesContext } from "../../ports/ServicesContext";

type Deps = Pick<
  ServicesContext,
  "userRepository" | "tokenService" | "fileRepository"
>;

export class DeleteUserUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string): Promise<void> {
    const { userRepository, tokenService, fileRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.findBasicById(userId);
    if (!user) throw new Error("User not found.");
    const destPath = `users/${userId}`;
    await fileRepository.deleteFolder(destPath);
  }
}
