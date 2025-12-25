/**
 * Azure Database services
 */

import { AzureNode } from "./base";

class DatabaseNode extends AzureNode {
  protected static type = "database";
  protected static iconDir = "resources/azure/database";
}

export class CacheForRedis extends DatabaseNode {
  protected static icon = "cache-for-redis.png";
}

export class CosmosDb extends DatabaseNode {
  protected static icon = "cosmos-db.png";
}

export class DataFactory extends DatabaseNode {
  protected static icon = "data-factory.png";
}

export class DatabaseForMariadbServers extends DatabaseNode {
  protected static icon = "database-for-mariadb-servers.png";
}

export class DatabaseForMysqlServers extends DatabaseNode {
  protected static icon = "database-for-mysql-servers.png";
}

export class DatabaseForPostgresqlServers extends DatabaseNode {
  protected static icon = "database-for-postgresql-servers.png";
}

export class SQLDatabases extends DatabaseNode {
  protected static icon = "sql-databases.png";
}

export class SQLServers extends DatabaseNode {
  protected static icon = "sql-servers.png";
}

export class SynapseAnalytics extends DatabaseNode {
  protected static icon = "synapse-analytics.png";
}
