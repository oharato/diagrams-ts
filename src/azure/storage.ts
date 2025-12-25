/**
 * Azure Storage services
 */

import { AzureNode } from './base';

class StorageNode extends AzureNode {
  protected static type = 'storage';
  protected static iconDir = 'resources/azure/storage';
}

export class ArchiveStorage extends StorageNode {
  protected static icon = 'archive-storage.png';
}

export class AzureFileshares extends StorageNode {
  protected static icon = 'azure-fileshares.png';
}

export class AzureNetappFiles extends StorageNode {
  protected static icon = 'azure-netapp-files.png';
}

export class BlobStorage extends StorageNode {
  protected static icon = 'blob-storage.png';
}

export class DataBox extends StorageNode {
  protected static icon = 'data-box.png';
}

export class DataLakeStorage extends StorageNode {
  protected static icon = 'data-lake-storage.png';
}

export class StorageAccounts extends StorageNode {
  protected static icon = 'storage-accounts.png';
}

export class StorageExplorer extends StorageNode {
  protected static icon = 'storage-explorer.png';
}

export class Storsimple extends StorageNode {
  protected static icon = 'storsimple.png';
}
