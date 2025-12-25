/**
 * K8S Storage resources
 */

import { K8SNode } from './base';

class StorageNode extends K8SNode {
  protected static type = 'storage';
  protected static iconDir = 'resources/k8s/storage';
}

export class PV extends StorageNode {
  protected static icon = 'pv.png';
}

export class PVC extends StorageNode {
  protected static icon = 'pvc.png';
}

export class SC extends StorageNode {
  protected static icon = 'sc.png';
}

export class Vol extends StorageNode {
  protected static icon = 'vol.png';
}

// Aliases
export const PersistentVolume = PV;
export const PersistentVolumeClaim = PVC;
export const StorageClass = SC;
export const Volume = Vol;
