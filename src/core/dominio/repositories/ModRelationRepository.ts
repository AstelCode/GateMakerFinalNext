import { ModRelation } from "../model/ModRelation";

export interface ModRelationRepository {
  findById(id: bigint): Promise<ModRelation | undefined>;
  save(relation: ModRelation): Promise<void>;
  listByModId(modId: bigint): Promise<ModRelation[]>;
  delete(id: bigint): Promise<void>;
}
