/**
 * Azure provides a set of services for Microsoft Azure provider.
 */

import { Node } from '../index';

export class AzureNode extends Node {
  protected static provider = 'azure';
  protected static iconDir = 'resources/azure';
  
  // Azure-specific styling
  constructor(label: string = '', options: any = {}) {
    super(label, {
      fontcolor: '#2d3436',
      ...options
    });
  }
}

export class Azure extends AzureNode {
  protected static icon = 'azure.png';
}
