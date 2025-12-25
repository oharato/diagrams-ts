/**
 * GCP Database services
 */

import { GCPNode } from "./base";

class DatabaseNode extends GCPNode {
  protected static type = "database";
  protected static iconDir = "resources/gcp/database";
}

export class Bigtable extends DatabaseNode {
  protected static icon = "bigtable.png";
}

export class Datastore extends DatabaseNode {
  protected static icon = "datastore.png";
}

export class Firestore extends DatabaseNode {
  protected static icon = "firestore.png";
}

export class Memorystore extends DatabaseNode {
  protected static icon = "memorystore.png";
}

export class Spanner extends DatabaseNode {
  protected static icon = "spanner.png";
}

export class SQL extends DatabaseNode {
  protected static icon = "sql.png";
}

// Aliases
export const BigTable = Bigtable;
