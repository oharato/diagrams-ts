/**
 * OnPrem provides a set of general on-premises services.
 */

import { OnPremNode } from './base';

export { OnPremNode };

export class OnPrem extends OnPremNode {
  protected static icon = 'onprem.png';
}

// Export all OnPrem services
export * from './database';
export * from './network';
export * from './compute';
export * from './monitoring';
export * from './queue';
