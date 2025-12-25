/**
 * OnPrem base node class
 */

import { Node } from "../index";

export class OnPremNode extends Node {
  protected static provider = "onprem";
  protected static iconDir = "resources/onprem";

  // OnPrem-specific styling
  constructor(label: string = "", options: any = {}) {
    super(label, {
      fontcolor: "#2d3436",
      ...options,
    });
  }
}
