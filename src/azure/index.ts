/**
 * Azure provides a set of services for Microsoft Azure provider.
 */

import { AzureNode } from "./base";

export { AzureNode };

export class Azure extends AzureNode {
  protected static icon = "azure.png";
}

// Export all Azure services
export * from "./compute";
export * from "./database";
export * from "./storage";
export * from "./network";
export * from "./security";
export * from "./analytics";
export * from "./ml";
