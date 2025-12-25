/**
 * Azure Compute services
 * This module is a TypeScript port of the Python compute module.
 */

import { AzureNode } from './base';

class ComputeNode extends AzureNode {
  protected static type = 'compute';
  protected static iconDir = 'resources/azure/compute';
}

export class AppServices extends ComputeNode {
  protected static icon = 'app-services.png';
}

export class ApplicationGroup extends ComputeNode {
  protected static icon = 'application-group.png';
}

export class AutomanagedVM extends ComputeNode {
  protected static icon = 'automanaged-vm.png';
}

export class AvailabilitySets extends ComputeNode {
  protected static icon = 'availability-sets.png';
}

export class AzureComputeGalleries extends ComputeNode {
  protected static icon = 'azure-compute-galleries.png';
}

export class AzureSpringApps extends ComputeNode {
  protected static icon = 'azure-spring-apps.png';
}

export class BatchAccounts extends ComputeNode {
  protected static icon = 'batch-accounts.png';
}

export class CloudServices extends ComputeNode {
  protected static icon = 'cloud-services.png';
}

export class ContainerApps extends ComputeNode {
  protected static icon = 'container-apps.png';
}

export class ContainerInstances extends ComputeNode {
  protected static icon = 'container-instances.png';
}

export class ContainerRegistries extends ComputeNode {
  protected static icon = 'container-registries.png';
}

export class Disks extends ComputeNode {
  protected static icon = 'disks.png';
}

export class FunctionApps extends ComputeNode {
  protected static icon = 'function-apps.png';
}

export class ImageDefinitions extends ComputeNode {
  protected static icon = 'image-definitions.png';
}

export class KubernetesServices extends ComputeNode {
  protected static icon = 'kubernetes-services.png';
}

export class VMImages extends ComputeNode {
  protected static icon = 'vm-images.png';
}

export class VMLinux extends ComputeNode {
  protected static icon = 'vm-linux.png';
}

export class VMScaleSet extends ComputeNode {
  protected static icon = 'vm-scale-set.png';
}

export class VMWindows extends ComputeNode {
  protected static icon = 'vm-windows.png';
}

export class VM extends ComputeNode {
  protected static icon = 'vm.png';
}

// Aliases
export const ACR = ContainerRegistries;
export const AKS = KubernetesServices;
export const VMSS = VMScaleSet;
