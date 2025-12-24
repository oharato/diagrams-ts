/**
 * GCP Security services
 */

import { GCPNode } from './index';

class SecurityNode extends GCPNode {
  protected static type = 'security';
  protected static iconDir = 'resources/gcp/security';
}

export class AccessContextManager extends SecurityNode {
  protected static icon = 'access-context-manager.png';
}

export class CertificateManager extends SecurityNode {
  protected static icon = 'certificate-manager.png';
}

export class CloudAssetInventory extends SecurityNode {
  protected static icon = 'cloud-asset-inventory.png';
}

export class Iam extends SecurityNode {
  protected static icon = 'iam.png';
}

export class IAP extends SecurityNode {
  protected static icon = 'iap.png';
}

export class KeyManagementService extends SecurityNode {
  protected static icon = 'key-management-service.png';
}

export class ResourceManager extends SecurityNode {
  protected static icon = 'resource-manager.png';
}

export class SecretManager extends SecurityNode {
  protected static icon = 'secret-manager.png';
}

export class SecurityCommandCenter extends SecurityNode {
  protected static icon = 'security-command-center.png';
}

// Aliases
export const ACM = AccessContextManager;
export const IAM = Iam;
export const KMS = KeyManagementService;
export const SCC = SecurityCommandCenter;
