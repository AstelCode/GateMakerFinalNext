import { UserRepository } from "@/core/dominio/repositories/UserRepository";
import { HashService } from "./HashService";
import { TokenService } from "./TokenService";
import { UuidService } from "./UuidService";
import { VerificationTokenRepository } from "@/core/dominio/repositories/VerificationTokenRepository";
import { PackRepository } from "@/core/dominio/repositories/PackRepository";
import { ModRelationRepository } from "@/core/dominio/repositories/ModRelationRepository";
import { ModRepository } from "@/core/dominio/repositories/ModRepository";
import { FileInfoRepository } from "@/core/dominio/repositories/FileInfoRepository";
import { CommentRepository } from "@/core/dominio/repositories/CommentRepository";
import { FileRepository } from "@/core/dominio/repositories";
import { NicknameService } from "./NicknameGeneratorService";
import { EmailService } from "./EmailService";

export interface ServicesContext {
  uuidService: UuidService;
  hashService: HashService;
  tokenService: TokenService;
  nicknameService: NicknameService;
  emailService: EmailService;

  userRepository: UserRepository;
  verificationTokenRepository: VerificationTokenRepository;
  packRepository: PackRepository;
  modRelationRepository: ModRelationRepository;
  modRepository: ModRepository;
  fileInfoRepository: FileInfoRepository;
  commentRepository: CommentRepository;

  fileRepository: FileRepository;
}
