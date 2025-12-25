/**
 * OnPrem Database services
 */

import { OnPremNode } from "./base";

class DatabaseNode extends OnPremNode {
  protected static type = "database";
  protected static iconDir = "resources/onprem/database";
}

export class Cassandra extends DatabaseNode {
  protected static icon = "cassandra.png";
}

export class Clickhouse extends DatabaseNode {
  protected static icon = "clickhouse.png";
}

export class Cockroachdb extends DatabaseNode {
  protected static icon = "cockroachdb.png";
}

export class Couchdb extends DatabaseNode {
  protected static icon = "couchdb.png";
}

export class Hbase extends DatabaseNode {
  protected static icon = "hbase.png";
}

export class Influxdb extends DatabaseNode {
  protected static icon = "influxdb.png";
}

export class Mariadb extends DatabaseNode {
  protected static icon = "mariadb.png";
}

export class Mongodb extends DatabaseNode {
  protected static icon = "mongodb.png";
}

export class Mssql extends DatabaseNode {
  protected static icon = "mssql.png";
}

export class Mysql extends DatabaseNode {
  protected static icon = "mysql.png";
}

export class Neo4J extends DatabaseNode {
  protected static icon = "neo4j.png";
}

export class Oracle extends DatabaseNode {
  protected static icon = "oracle.png";
}

export class Postgresql extends DatabaseNode {
  protected static icon = "postgresql.png";
}

export class Scylla extends DatabaseNode {
  protected static icon = "scylla.png";
}

// Aliases
export const ClickHouse = Clickhouse;
export const CockroachDB = Cockroachdb;
export const CouchDB = Couchdb;
export const HBase = Hbase;
export const InfluxDB = Influxdb;
export const MariaDB = Mariadb;
export const MongoDB = Mongodb;
export const MSSQL = Mssql;
export const MySQL = Mysql;
export const PostgreSQL = Postgresql;
