/**
 * Azure base node class
 */

import { Node } from "../index";

export class AzureNode extends Node {
  protected static provider = "azure";
  protected static iconDir = "resources/azure";

  // Azure-specific styling
  constructor(label: string = "", options: any = {}) {
    super(label, {
      fontcolor: "#2d3436",
      ...options,
    });
  }
}
