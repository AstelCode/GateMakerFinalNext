import { JsonSerializable } from "./JsonSerializable";
import { Mod, ModJson } from "./Mod";
import { Persistable } from "./Persistable";

export type ModRelationType = "CONFLICT" | "DEPENDENCY";

export interface ModRelationArgs {
  id?: bigint;
  type: ModRelationType;

  modA?: Mod;
  modB?: Mod;

  modAId?: bigint;
  modBId?: bigint;
}

export interface ModRelationJson {
  id: bigint;
  type: ModRelationType;
  modA?: ModJson;
  modB?: ModJson;
}

export interface ModRelationPersistance {
  type: ModRelationType;
  modAId?: bigint;
  modBId?: bigint;
}

export class ModRelation
  implements
    JsonSerializable<ModRelationJson>,
    Persistable<ModRelationPersistance>
{
  private id?: bigint;
  private type: ModRelationType;

  private modA?: Mod;
  private modB?: Mod;

  private modAId?: bigint;
  private modBId?: bigint;

  constructor(args: ModRelationArgs) {
    this.id = args.id;
    this.type = args.type;

    this.modA = args.modA;
    this.modB = args.modB;

    this.modAId = args.modA?.getId() ?? args.modAId;
    this.modBId = args.modB?.getId() ?? args.modBId;
  }

  getId() {
    if (!this.id) throw new Error("ModRelation id is not asigned.");
    return this.id;
  }

  toPersistance(): ModRelationPersistance {
    return {
      type: this.type,
      modAId: this.modAId,
      modBId: this.modBId,
    };
  }

  toJson(): ModRelationJson {
    if (this.id == undefined) throw new Error("ModRelation id not assigned.");

    return {
      id: this.id,
      type: this.type,
      modA: this.modA?.toJson(),
      modB: this.modB?.toJson(),
    };
  }
}
