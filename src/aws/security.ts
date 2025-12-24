/**
 * AWS Security services
 */

import { AWSNode } from './index';

class SecurityNode extends AWSNode {
  protected static type = 'security';
  protected static iconDir = 'resources/aws/security';
}

export class CertificateManager extends SecurityNode {
  protected static icon = 'certificate-manager.png';
}

export class Cloudhsm extends SecurityNode {
  protected static icon = 'cloudhsm.png';
}

export class Cognito extends SecurityNode {
  protected static icon = 'cognito.png';
}

export class Detective extends SecurityNode {
  protected static icon = 'detective.png';
}

export class DirectoryService extends SecurityNode {
  protected static icon = 'directory-service.png';
}

export class FirewallManager extends SecurityNode {
  protected static icon = 'firewall-manager.png';
}

export class Guardduty extends SecurityNode {
  protected static icon = 'guardduty.png';
}

export class IdentityAndAccessManagementIam extends SecurityNode {
  protected static icon = 'identity-and-access-management-iam.png';
}

export class Inspector extends SecurityNode {
  protected static icon = 'inspector.png';
}

export class KeyManagementService extends SecurityNode {
  protected static icon = 'key-management-service.png';
}

export class Macie extends SecurityNode {
  protected static icon = 'macie.png';
}

export class SecretsManager extends SecurityNode {
  protected static icon = 'secrets-manager.png';
}

export class SecurityHub extends SecurityNode {
  protected static icon = 'security-hub.png';
}

export class ShieldAdvanced extends SecurityNode {
  protected static icon = 'shield-advanced.png';
}

export class Shield extends SecurityNode {
  protected static icon = 'shield.png';
}

export class WAF extends SecurityNode {
  protected static icon = 'waf.png';
}

// Aliases
export const ACM = CertificateManager;
export const CloudHSM = Cloudhsm;
export const DS = DirectoryService;
export const FMS = FirewallManager;
export const IAM = IdentityAndAccessManagementIam;
export const KMS = KeyManagementService;
