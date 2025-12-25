/**
 * GCP Compute services
 * This module is a TypeScript port of the Python compute module.
 */

import { GCPNode } from './base';

class ComputeNode extends GCPNode {
  protected static type = 'compute';
  protected static iconDir = 'resources/gcp/compute';
}

export class AppEngine extends ComputeNode {
  protected static icon = 'app-engine.png';
}

export class BinaryAuthorization extends ComputeNode {
  protected static icon = 'binary-authorization.png';
}

export class ComputeEngine extends ComputeNode {
  protected static icon = 'compute-engine.png';
}

export class ContainerOptimizedOS extends ComputeNode {
  protected static icon = 'container-optimized-os.png';
}

export class Functions extends ComputeNode {
  protected static icon = 'functions.png';
}

export class GKEOnPrem extends ComputeNode {
  protected static icon = 'gke-on-prem.png';
}

export class GPU extends ComputeNode {
  protected static icon = 'gpu.png';
}

export class KubernetesEngine extends ComputeNode {
  protected static icon = 'kubernetes-engine.png';
}

export class OSConfigurationManagement extends ComputeNode {
  protected static icon = 'os-configuration-management.png';
}

export class OSInventoryManagement extends ComputeNode {
  protected static icon = 'os-inventory-management.png';
}

export class OSPatchManagement extends ComputeNode {
  protected static icon = 'os-patch-management.png';
}

export class Run extends ComputeNode {
  protected static icon = 'run.png';
}

// Aliases
export const GAE = AppEngine;
export const GCE = ComputeEngine;
export const GCF = Functions;
export const GKE = KubernetesEngine;
export const CloudRun = Run;
