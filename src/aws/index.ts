/**
 * AWS provides a set of services for Amazon Web Service provider.
 */

import { AWSNode } from "./base";

export { AWSNode };

export class AWS extends AWSNode {
  protected static icon = "aws.png";
}

// Export all AWS services
export * from "./compute";
export * from "./database";
export * from "./storage";
export * from "./network";
export * from "./security";
export * from "./analytics";
export * from "./integration";
export * from "./ml";
