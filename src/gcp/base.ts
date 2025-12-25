/**
 * GCP base node class
 */

import { Node } from "../index";

export class GCPNode extends Node {
  protected static provider = "gcp";
  protected static iconDir = "resources/gcp";

  // GCP-specific styling
  constructor(label: string = "", options: any = {}) {
    super(label, {
      fontcolor: "#2d3436",
      ...options,
    });
  }
}
