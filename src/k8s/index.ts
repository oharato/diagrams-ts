/**
 * K8S provides a set of services for Kubernetes.
 */

import { Node } from '../index';

export class K8SNode extends Node {
  protected static provider = 'k8s';
  protected static iconDir = 'resources/k8s';
  
  // K8S-specific styling
  constructor(label: string = '', options: any = {}) {
    super(label, {
      fontcolor: '#2d3436',
      ...options
    });
  }
}

export class K8S extends K8SNode {
  protected static icon = 'k8s.png';
}

// Export all K8s resources
export * from './compute';
export * from './network';
export * from './storage';
