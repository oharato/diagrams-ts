/**
 * OnPrem provides a set of general on-premises services.
 */

import { Node } from '../index';

export class OnPremNode extends Node {
  protected static provider = 'onprem';
  protected static iconDir = 'resources/onprem';
  
  // OnPrem-specific styling
  constructor(label: string = '', options: any = {}) {
    super(label, {
      fontcolor: '#2d3436',
      ...options
    });
  }
}

export class OnPrem extends OnPremNode {
  protected static icon = 'onprem.png';
}

// Export all OnPrem services
export * from './database';
export * from './network';
export * from './compute';
