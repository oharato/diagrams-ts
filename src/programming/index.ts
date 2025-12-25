/**
 * Programming provides a set of programming languages and frameworks.
 */

import { ProgrammingNode } from './base';

export { ProgrammingNode };

export class Programming extends ProgrammingNode {
  protected static icon = 'programming.png';
}

// Export all Programming services
export * from './language';
export * from './framework';
