/**
 * AWS base node class
 */

import { Node } from '../index';

export class AWSNode extends Node {
  protected static provider = 'aws';
  protected static iconDir = 'resources/aws';
  
  // AWS-specific styling
  constructor(label: string = '', options: any = {}) {
    super(label, {
      fontcolor: '#2D3436',
      ...options
    });
  }
}
