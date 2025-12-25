/**
 * K8S Compute services
 * This module is a TypeScript port of the Python compute module.
 */

import { K8SNode } from "./base";

class ComputeNode extends K8SNode {
  protected static type = "compute";
  protected static iconDir = "resources/k8s/compute";
}

export class Cronjob extends ComputeNode {
  protected static icon = "cronjob.png";
}

export class Deploy extends ComputeNode {
  protected static icon = "deploy.png";
}

export class DS extends ComputeNode {
  protected static icon = "ds.png";
}

export class Job extends ComputeNode {
  protected static icon = "job.png";
}

export class Pod extends ComputeNode {
  protected static icon = "pod.png";
}

export class RS extends ComputeNode {
  protected static icon = "rs.png";
}

export class STS extends ComputeNode {
  protected static icon = "sts.png";
}

// Aliases
export const Deployment = Deploy;
export const DaemonSet = DS;
export const ReplicaSet = RS;
export const StatefulSet = STS;
