/**
 * AWS provides a set of services for Amazon Web Service provider.
 */

import { Node } from '../index';

export class AWSNode extends Node {
  protected static provider = 'aws';
  protected static iconDir = 'resources/aws';
  
  // AWS-specific styling
  constructor(label: string = '', options: any = {}) {
    super(label, {
      fontcolor: '#ffffff',
      ...options
    });
  }
}

export class AWS extends AWSNode {
  protected static icon = 'aws.png';
}

// Export all AWS services
export * from './compute';
export * from './database';
export * from './storage';
export * from './network';
export * from './security';
