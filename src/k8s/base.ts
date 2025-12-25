/**
 * K8S base node class
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
