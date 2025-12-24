/**
 * AWS Storage services
 */

import { AWSNode } from './index';

class StorageNode extends AWSNode {
  protected static type = 'storage';
  protected static iconDir = 'resources/aws/storage';
}

export class Backup extends StorageNode {
  protected static icon = 'backup.png';
}

export class CloudendureDisasterRecovery extends StorageNode {
  protected static icon = 'cloudendure-disaster-recovery.png';
}

export class ElasticBlockStoreEBS extends StorageNode {
  protected static icon = 'elastic-block-store-ebs.png';
}

export class ElasticFileSystemEFS extends StorageNode {
  protected static icon = 'elastic-file-system-efs.png';
}

export class Fsx extends StorageNode {
  protected static icon = 'fsx.png';
}

export class S3Glacier extends StorageNode {
  protected static icon = 's3-glacier.png';
}

export class SimpleStorageServiceS3 extends StorageNode {
  protected static icon = 'simple-storage-service-s3.png';
}

export class SnowballEdge extends StorageNode {
  protected static icon = 'snowball-edge.png';
}

export class Snowball extends StorageNode {
  protected static icon = 'snowball.png';
}

export class StorageGateway extends StorageNode {
  protected static icon = 'storage-gateway.png';
}

export class Storage extends StorageNode {
  protected static icon = 'storage.png';
}

// Aliases
export const CDR = CloudendureDisasterRecovery;
export const EBS = ElasticBlockStoreEBS;
export const EFS = ElasticFileSystemEFS;
export const FSx = Fsx;
export const S3 = SimpleStorageServiceS3;
