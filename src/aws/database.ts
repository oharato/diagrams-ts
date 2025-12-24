/**
 * AWS Database services
 */

import { AWSNode } from './index';

class DatabaseNode extends AWSNode {
  protected static type = 'database';
  protected static iconDir = 'resources/aws/database';
}

export class Aurora extends DatabaseNode {
  protected static icon = 'aurora.png';
}

export class DatabaseMigrationService extends DatabaseNode {
  protected static icon = 'database-migration-service.png';
}

export class Database extends DatabaseNode {
  protected static icon = 'database.png';
}

export class DocumentdbMongodbCompatibility extends DatabaseNode {
  protected static icon = 'documentdb-mongodb-compatibility.png';
}

export class DynamodbDax extends DatabaseNode {
  protected static icon = 'dynamodb-dax.png';
}

export class DynamodbGlobalSecondaryIndex extends DatabaseNode {
  protected static icon = 'dynamodb-global-secondary-index.png';
}

export class DynamodbTable extends DatabaseNode {
  protected static icon = 'dynamodb-table.png';
}

export class Dynamodb extends DatabaseNode {
  protected static icon = 'dynamodb.png';
}

export class Elasticache extends DatabaseNode {
  protected static icon = 'elasticache.png';
}

export class Neptune extends DatabaseNode {
  protected static icon = 'neptune.png';
}

export class RDSInstance extends DatabaseNode {
  protected static icon = 'rds-instance.png';
}

export class RDS extends DatabaseNode {
  protected static icon = 'rds.png';
}

export class Redshift extends DatabaseNode {
  protected static icon = 'redshift.png';
}

export class Timestream extends DatabaseNode {
  protected static icon = 'timestream.png';
}

// Aliases
export const DMS = DatabaseMigrationService;
export const DocumentDB = DocumentdbMongodbCompatibility;
export const DAX = DynamodbDax;
export const DynamodbGSI = DynamodbGlobalSecondaryIndex;
export const DDB = Dynamodb;
export const ElastiCache = Elasticache;
export const DB = Database;
