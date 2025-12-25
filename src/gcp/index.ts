/**
 * GCP provides a set of services for Google Cloud Platform provider.
 */

import { GCPNode } from './base';

export { GCPNode };

export class GCP extends GCPNode {
  protected static icon = 'gcp.png';
}

// Export all GCP services
export * from './compute';
export * from './database';
export * from './storage';
export * from './network';
export * from './security';
export * from './analytics';
export * from './ml';
