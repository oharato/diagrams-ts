# マルチクラウドプロバイダー対応

このドキュメントでは、diagrams-tsで利用可能なクラウドプロバイダーについて説明します。

## サポートされているプロバイダー

### AWS (Amazon Web Services)
- **モジュール**: `src/aws/`
- **主要サービス**: 
  - Compute: EC2, Lambda, ECS, EKS, Fargate
  - その他多数のAWSサービス

### GCP (Google Cloud Platform)
- **モジュール**: `src/gcp/`
- **主要サービス**:
  - Compute: Compute Engine (GCE), Kubernetes Engine (GKE), Cloud Run, App Engine (GAE)
  - エイリアス: GCE, GKE, GCF, GAE, CloudRun

### Azure (Microsoft Azure)
- **モジュール**: `src/azure/`
- **主要サービス**:
  - Compute: Virtual Machines (VM), Kubernetes Services (AKS), Container Registries (ACR)
  - その他: Function Apps, Container Apps, Batch Accounts
  - エイリアス: AKS, ACR, VMSS

### K8s (Kubernetes)
- **モジュール**: `src/k8s/`
- **主要リソース**:
  - Compute: Pod, Deployment, DaemonSet, StatefulSet, ReplicaSet, Job, Cronjob
  - エイリアス: Deployment, DaemonSet, ReplicaSet, StatefulSet

## 使用例

### 単一プロバイダー

```typescript
import { Diagram, Cluster } from './src';
import { GCE, GKE } from './src/gcp/compute';

const diagram = new Diagram({ name: 'GCP Architecture', show: false });

await diagram.use(async () => {
  const instance = new GCE('web-server');
  const cluster = new GKE('k8s-cluster');
  instance.to(cluster);
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
