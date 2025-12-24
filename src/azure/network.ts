/**
 * Azure Network services
 */

import { AzureNode } from './index';

class NetworkNode extends AzureNode {
  protected static type = 'network';
  protected static iconDir = 'resources/azure/network';
}

export class ApplicationGateway extends NetworkNode {
  protected static icon = 'application-gateway.png';
}

export class CDNProfiles extends NetworkNode {
  protected static icon = 'cdn-profiles.png';
}

export class DNSZones extends NetworkNode {
  protected static icon = 'dns-zones.png';
}

export class Firewall extends NetworkNode {
  protected static icon = 'firewall.png';
}

export class FrontDoors extends NetworkNode {
  protected static icon = 'front-doors.png';
}

export class LoadBalancers extends NetworkNode {
  protected static icon = 'load-balancers.png';
}

export class NetworkInterfaces extends NetworkNode {
  protected static icon = 'network-interfaces.png';
}

export class NetworkSecurityGroups extends NetworkNode {
  protected static icon = 'network-security-groups.png';
}

export class PublicIPAddresses extends NetworkNode {
  protected static icon = 'public-ip-addresses.png';
}

export class VirtualNetworks extends NetworkNode {
  protected static icon = 'virtual-networks.png';
}

export class VPNGateway extends NetworkNode {
  protected static icon = 'vpn-gateway.png';
}
