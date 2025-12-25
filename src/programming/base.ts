/**
 * Programming base node class
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
