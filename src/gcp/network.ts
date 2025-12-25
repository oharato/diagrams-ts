/**
 * GCP Network services
 */

import { GCPNode } from './base';

class NetworkNode extends GCPNode {
  protected static type = 'network';
  protected static iconDir = 'resources/gcp/network';
}

export class Armor extends NetworkNode {
  protected static icon = 'armor.png';
}

export class CDN extends NetworkNode {
  protected static icon = 'cdn.png';
}

export class CloudIDS extends NetworkNode {
  protected static icon = 'cloud-ids.png';
}

export class DNS extends NetworkNode {
  protected static icon = 'dns.png';
}

export class LoadBalancing extends NetworkNode {
  protected static icon = 'load-balancing.png';
}

export class NAT extends NetworkNode {
  protected static icon = 'nat.png';
}

export class VirtualPrivateCloud extends NetworkNode {
  protected static icon = 'virtual-private-cloud.png';
}

export class VPN extends NetworkNode {
  protected static icon = 'vpn.png';
}

// Aliases
export const IDS = CloudIDS;
export const VPC = VirtualPrivateCloud;
