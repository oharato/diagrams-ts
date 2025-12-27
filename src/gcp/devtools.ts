/**
 * GCP DevTools services
 */

import { GCPNode } from "./base";

class DevToolsNode extends GCPNode {
  protected static type = "devtools";
  protected static iconDir = "resources/gcp/devtools";
}

export class Scheduler extends DevToolsNode {
  protected static icon = "scheduler.png";
}

export class Build extends DevToolsNode {
  protected static icon = "build.png";
}

export class Code extends DevToolsNode {
  protected static icon = "code.png";
}

export class Git extends DevToolsNode {
  protected static icon = "git.png";
}

export class Test extends DevToolsNode {
  protected static icon = "test.png";
}
