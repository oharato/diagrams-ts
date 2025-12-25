# マルチクラウドプロバイダー対応

このドキュメントでは、diagrams-tsで利用可能なクラウドプロバイダーについて説明します。

## サポートされているプロバイダー

### AWS (Amazon Web Services)
- **モジュール**: `src/aws/`
- **サービス**:
  - **Compute**: EC2, Lambda, ECS, EKS, Fargate
  - **Database**: RDS, DynamoDB, Aurora, ElastiCache, Neptune
  - **Storage**: S3, EBS, EFS, Glacier, Storage Gateway
  - **Network**: VPC, ELB, CloudFront, Route53, API Gateway
  - **Security**: IAM, KMS, WAF, Secrets Manager, GuardDuty
  - **Analytics**: Athena, EMR, Glue, Kinesis, QuickSight, Redshift
  - **Integration**: SNS, SQS, EventBridge, Step Functions, AppSync
  - **Machine Learning**: SageMaker, Bedrock, Comprehend, Rekognition, Lex

### GCP (Google Cloud Platform)
- **モジュール**: `src/gcp/`
- **サービス**:
  - **Compute**: Compute Engine (GCE), Kubernetes Engine (GKE), Cloud Run, App Engine (GAE), Functions
  - **Database**: Cloud SQL, Bigtable, Firestore, Spanner, Memorystore
  - **Storage**: Cloud Storage (GCS), Persistent Disk, Filestore
  - **Network**: VPC, Load Balancing, Cloud CDN, Cloud DNS, Cloud Armor
  - **Security**: IAM, KMS, Secret Manager, Security Command Center
  - **Analytics**: BigQuery, Dataflow, Dataproc, Pub/Sub, Composer
  - **Machine Learning**: AI Platform, AutoML, Vision API, Natural Language API, Speech-to-Text
  - **エイリアス**: GCE, GKE, GCF, GAE, CloudRun, BigTable, SSD, GCS, IDS, VPC, ACM, IAM, KMS, SCC, BigQuery, PubSub, AutoML

### Azure (Microsoft Azure)
- **モジュール**: `src/azure/`
- **サービス**:
  - **Compute**: Virtual Machines (VM), Kubernetes Services (AKS), Container Instances, Function Apps
  - **Database**: Cosmos DB, SQL Database, Database for PostgreSQL, Database for MySQL
  - **Storage**: Blob Storage, File Shares, Data Lake Storage, Archive Storage
  - **Network**: Virtual Networks, Load Balancers, Application Gateway, VPN Gateway
  - **Security**: Key Vault, Azure AD, Security Center, Azure Sentinel
  - **Analytics**: Synapse Analytics, Databricks, Data Factory, Event Hubs, HDInsight
  - **Machine Learning**: Azure OpenAI, Cognitive Services, ML Workspaces, Bot Services
  - **エイリアス**: AKS, ACR, VMSS, Databricks, Synapse, OpenAI, MLWorkspaces

### K8s (Kubernetes)
- **モジュール**: `src/k8s/`
- **リソース**:
  - **Compute**: Pod, Deployment, DaemonSet (DS), StatefulSet (STS), ReplicaSet (RS), Job, Cronjob
  - **Network**: Service (SVC), Ingress (Ing), Endpoint (Ep), NetworkPolicy (Netpol)
  - **Storage**: PersistentVolume (PV), PersistentVolumeClaim (PVC), StorageClass (SC), Volume (Vol)
  - **エイリアス**: Deployment, DaemonSet, ReplicaSet, StatefulSet, Service, Ingress, Endpoint, NetworkPolicy, PersistentVolume, PersistentVolumeClaim, StorageClass, Volume

### Programming (プログラミング)
- **モジュール**: `src/programming/`
- **リソース**:
  - **Language**: Python, JavaScript, TypeScript, Go, Java, Rust, C, C++, PHP, Ruby, Scala, Swift, Kotlin
  - **Framework**: React, Django, FastAPI, Flask, Angular, Vue, Spring, Laravel, Svelte
  - **エイリアス**: JavaScript, NodeJS, PHP, TypeScript, FastAPI, DotNet, GraphQL, NextJs

### OnPrem (オンプレミス)
- **モジュール**: `src/onprem/`
- **サービス**:
  - **Database**: PostgreSQL, MySQL, MongoDB, Cassandra, ClickHouse, CockroachDB, InfluxDB, MariaDB
  - **Network**: Nginx, HAProxy, Apache, Consul, Envoy, Istio, Traefik, Kong
  - **Compute**: Server, Nomad
  - **Monitoring**: Prometheus, Grafana, Datadog, Nagios, Splunk, Thanos
  - **Queue**: Kafka, RabbitMQ, ActiveMQ, Celery, NATS, ZeroMQ
  - **エイリアス**: ClickHouse, CockroachDB, CouchDB, HBase, InfluxDB, MariaDB, MongoDB, MSSQL, MySQL, PostgreSQL, HAProxy, ETCD, NewRelic, ActiveMQ, RabbitMQ, ZeroMQ

## 使用例

### AWS サービス

```typescript
import { Diagram } from './src';
import { EC2 } from './src/aws/compute';
import { RDS } from './src/aws/database';
import { S3 } from './src/aws/storage';
import { VPC } from './src/aws/network';
import { IAM } from './src/aws/security';

const diagram = new Diagram({ name: 'AWS Services', show: false });

await diagram.use(async () => {
  const vpc = new VPC('my-vpc');
  const ec2 = new EC2('web-server');
  const rds = new RDS('database');
  const s3 = new S3('assets');
  const iam = new IAM('security');

  ec2.to(rds);
  ec2.to(s3);
});
```

### GCP サービス

```typescript
import { Diagram } from './src';
import { GCE, GKE } from './src/gcp/compute';
import { Bigtable } from './src/gcp/database';
import { GCS } from './src/gcp/storage';

const diagram = new Diagram({ name: 'GCP Services', show: false });

await diagram.use(async () => {
  const gce = new GCE('compute');
  const gke = new GKE('k8s-cluster');
  const bigtable = new Bigtable('nosql-db');
  const gcs = new GCS('storage');

  gce.to(gke);
  gke.to(bigtable);
  gce.to(gcs);
});
```

### プログラミングスタック

```typescript
import { Diagram } from './src';
import { Python, JavaScript } from './src/programming/language';
import { Django, React } from './src/programming/framework';

const diagram = new Diagram({ name: 'App Stack', show: false });

await diagram.use(async () => {
  const python = new Python('backend');
  const django = new Django('api');
  const js = new JavaScript('frontend');
  const react = new React('ui');

  python.to(django);
  js.to(react);
  react.to(django);
});
```

### オンプレミスインフラ

```typescript
import { Diagram } from './src';
import { PostgreSQL } from './src/onprem/database';
import { Nginx } from './src/onprem/network';
import { Server } from './src/onprem/compute';

const diagram = new Diagram({ name: 'On-Premise', show: false });

await diagram.use(async () => {
  const nginx = new Nginx('web-proxy');
  const server = new Server('app-server');
  const postgres = new PostgreSQL('database');

  nginx.to(server);
  server.to(postgres);
});
```

### マルチクラウド

```typescript
import { Diagram, Cluster } from './src';
import { EC2 } from './src/aws/compute';
import { GCE } from './src/gcp/compute';
import { VM } from './src/azure/compute';

const diagram = new Diagram({ name: 'Multi-Cloud', show: false });

await diagram.use(async () => {
  const awsCluster = new Cluster({ label: 'AWS' });
  await awsCluster.use(async () => {
    const ec2 = new EC2('instance');
  });

  const gcpCluster = new Cluster({ label: 'GCP' });
  await gcpCluster.use(async () => {
    const gce = new GCE('instance');
  });

  const azureCluster = new Cluster({ label: 'Azure' });
  await azureCluster.use(async () => {
    const vm = new VM('instance');
  });
});
```

## プロバイダーの追加方法

新しいプロバイダーを追加する場合は、以下の手順に従ってください：

1. `src/<provider>/` ディレクトリを作成
2. `index.ts` でベースクラスを定義
3. サービスごとに個別のファイル（例: `compute.ts`）を作成
4. `src/index.ts` で新しいプロバイダーをエクスポート
5. テストを `tests/` に追加
6. README.md を更新

## 今後の拡張

現在、各プロバイダーのComputeサービスのみが実装されています。今後、以下のような拡張が予定されています：

- データベースサービス
- ストレージサービス
- ネットワークサービス
- セキュリティサービス
- その他のクラウドプロバイダー（IBM Cloud、Oracle Cloud、DigitalOceanなど）

## 参考

- オリジナルPythonプロジェクト: https://github.com/mingrammer/diagrams
- Python版のプロバイダー一覧: https://diagrams.mingrammer.com/docs/nodes
