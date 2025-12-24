/**
 * OnPrem Compute services
 */

import { OnPremNode } from './index';

class ComputeNode extends OnPremNode {
  protected static type = 'compute';
  protected static iconDir = 'resources/onprem/compute';
}

export class Nomad extends ComputeNode {
  protected static icon = 'nomad.png';
}

export class Server extends ComputeNode {
  protected static icon = 'server.png';
}
