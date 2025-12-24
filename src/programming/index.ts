/**
 * Programming provides a set of programming languages and frameworks.
 */

import { Node } from '../index';

export class ProgrammingNode extends Node {
  protected static provider = 'programming';
  protected static iconDir = 'resources/programming';
  
  // Programming-specific styling
  constructor(label: string = '', options: any = {}) {
    super(label, {
      fontcolor: '#2d3436',
      ...options
    });
  }
}

export class Programming extends ProgrammingNode {
  protected static icon = 'programming.png';
}

// Export all Programming services
export * from './language';
export * from './framework';
