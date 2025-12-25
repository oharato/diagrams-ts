/**
 * K8S provides a set of services for Kubernetes.
 */

import { K8SNode } from './base';

export { K8SNode };

export class K8S extends K8SNode {
  protected static icon = 'k8s.png';
}

// Export all K8s resources
export * from './compute';
export * from './network';
export * from './storage';
