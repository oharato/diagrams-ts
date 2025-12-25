/**
 * GCP Storage services
 */

import { GCPNode } from "./base";

class StorageNode extends GCPNode {
  protected static type = "storage";
  protected static iconDir = "resources/gcp/storage";
}

export class Filestore extends StorageNode {
  protected static icon = "filestore.png";
}

export class LocalSSD extends StorageNode {
  protected static icon = "local-ssd.png";
}

export class PersistentDisk extends StorageNode {
  protected static icon = "persistent-disk.png";
}

export class Storage extends StorageNode {
  protected static icon = "storage.png";
}

// Aliases
export const SSD = LocalSSD;
export const GCS = Storage;
