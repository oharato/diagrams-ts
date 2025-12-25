/**
 * Azure Security services
 */

import { AzureNode } from './base';

class SecurityNode extends AzureNode {
  protected static type = 'security';
  protected static iconDir = 'resources/azure/security';
}

export class ApplicationSecurityGroups extends SecurityNode {
  protected static icon = 'application-security-groups.png';
}

export class AzureSentinel extends SecurityNode {
  protected static icon = 'azure-sentinel.png';
}

export class Defender extends SecurityNode {
  protected static icon = 'defender.png';
}

export class KeyVaults extends SecurityNode {
  protected static icon = 'key-vaults.png';
}

export class SecurityCenter extends SecurityNode {
  protected static icon = 'security-center.png';
}
