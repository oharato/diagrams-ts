/**
 * GCP Operations services
 */

import { GCPNode } from "./base";

class OperationsNode extends GCPNode {
  protected static type = "operations";
  protected static iconDir = "resources/gcp/operations";
}

export class Monitoring extends OperationsNode {
  protected static icon = "monitoring.png";
}
