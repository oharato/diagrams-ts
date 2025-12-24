
# Diagrams - TypeScript版

これは [diagrams](https://github.com/mingrammer/diagrams) PythonライブラリのTypeScript移植版です。

**Diagram as Code** - TypeScript/JavaScriptコードでクラウドシステムアーキテクチャ図を描画します。

## ステータス

これはコア機能の**初期TypeScript移植版**です。現在含まれているもの：

- ✅ コアクラス: `Diagram`, `Cluster`, `Node`, `Edge`
- ✅ AWS Computeプロバイダー（実装例）
- ✅ GCP Computeプロバイダー（Google Cloud Platform）
- ✅ Azure Computeプロバイダー（Microsoft Azure）
- ✅ K8s Computeプロバイダー（Kubernetes）
- ✅ CLIツール
- ✅ TypeScript型定義
- ⏳ 追加のサービスタイプ（進行中）
- ⏳ 完全なテストスイート（進行中）

## インストール

```bash
npm install
npm run build
```

## 使用方法

### 基本的な例

```typescript
import { Diagram, Cluster } from './src';
import { EC2, Lambda } from './src/aws/compute';

async function main() {
  const diagram = new Diagram({ name: 'Web Service', show: false });
  
  await diagram.use(async () => {
    const cluster = new Cluster({ label: 'Web Tier' });
    
    await cluster.use(async () => {
      const web1 = new EC2('web1');
      const web2 = new EC2('web2');
      const web3 = new EC2('web3');
    });
    
    const lb = new Lambda('Lambda Function');
  });
}

main();
```

### コンテキスト管理

Pythonの`with`文とは異なり、TypeScriptではasync/awaitパターンを使用します：

```typescript
// Pythonスタイル（オリジナル）
with Diagram("My Diagram"):
    with Cluster("Services"):
        node1 = EC2("web")

// TypeScriptスタイル（この移植版）
await diagram.use(async () => {
  await cluster.use(async () => {
    const node1 = new EC2('web');
  });
});
```

### ノードの接続

TypeScriptはPythonのような演算子オーバーロードをサポートしていないため、メソッド呼び出しを使用します：

```typescript
// Pythonスタイル（オリジナル）
node1 >> node2
node1 - node2

// TypeScriptスタイル（この移植版）
node1.forward(node2);  // >> に相当
node1.to(node2);       // - に相当
```

### マルチクラウド対応

複数のクラウドプロバイダーを組み合わせて使用できます：

```typescript
import { Diagram, Cluster } from './src';
import { EC2, Lambda } from './src/aws/compute';
import { GCE, GKE } from './src/gcp/compute';
import { VM, AKS } from './src/azure/compute';
import { Pod, Deployment } from './src/k8s/compute';

async function main() {
  const diagram = new Diagram({ name: 'Multi-Cloud', show: false });
  
  await diagram.use(async () => {
    // AWSクラスター
    const awsCluster = new Cluster({ label: 'AWS' });
    await awsCluster.use(async () => {
      const ec2 = new EC2('web-server');
      const lambda = new Lambda('api');
      ec2.to(lambda);
    });
    
    // GCPクラスター
    const gcpCluster = new Cluster({ label: 'GCP' });
    await gcpCluster.use(async () => {
      const gce = new GCE('instance');
      const gke = new GKE('cluster');
      gce.to(gke);
    });
    
    // Azureクラスター
    const azureCluster = new Cluster({ label: 'Azure' });
    await azureCluster.use(async () => {
      const vm = new VM('vm');
      const aks = new AKS('k8s');
      vm.to(aks);
    });
  });
}

main();
```

## サポートされているプロバイダー

### クラウドプロバイダー

#### AWS (Amazon Web Services)
- **Compute**: EC2, Lambda, ECS, EKS, Fargate
- **Database**: RDS, DynamoDB, Aurora, ElastiCache
- **Storage**: S3, EBS, EFS, Glacier
- **Network**: VPC, ELB, CloudFront, Route53
- **Security**: IAM, KMS, WAF, Secrets Manager

#### GCP (Google Cloud Platform)
- **Compute**: Compute Engine (GCE), Kubernetes Engine (GKE), Cloud Run, App Engine
- **Database**: Cloud SQL, Bigtable, Firestore, Spanner
- **Storage**: Cloud Storage (GCS), Persistent Disk, Filestore
- **Network**: VPC, Load Balancing, Cloud CDN, Cloud DNS
- **Security**: IAM, KMS, Secret Manager, Cloud Armor

#### Azure (Microsoft Azure)
- **Compute**: Virtual Machines, AKS, Container Instances, Function Apps
- **Database**: Cosmos DB, SQL Database, Database for PostgreSQL/MySQL
- **Storage**: Blob Storage, File Shares, Data Lake Storage
- **Network**: Virtual Networks, Load Balancer, Application Gateway
- **Security**: Key Vault, Azure AD, Security Center

#### Kubernetes
- **Compute**: Pod, Deployment, StatefulSet, DaemonSet, Job, CronJob

### その他のプロバイダー

#### Programming (プログラミング)
- **Languages**: Python, JavaScript, TypeScript, Go, Java, Rust, C++など
- **Frameworks**: React, Django, FastAPI, Flask, Angular, Vueなど

#### OnPrem (オンプレミス)
- **Database**: PostgreSQL, MySQL, MongoDB, Cassandra, Redisなど
- **Network**: Nginx, HAProxy, Apache, Consulなど
- **Compute**: Server, Nomad

## プロジェクト構造

```
diagrams/
├── src/                    # TypeScriptソースファイル
│   ├── index.ts           # コアクラス（Diagram, Cluster, Node, Edge）
│   ├── cli.ts             # コマンドラインインターフェース
│   ├── aws/               # AWSプロバイダーモジュール
│   │   ├── index.ts       # AWSベースクラス
│   │   └── compute.ts     # AWS Computeサービス
│   ├── gcp/               # GCPプロバイダーモジュール
│   │   ├── index.ts       # GCPベースクラス
│   │   └── compute.ts     # GCP Computeサービス
│   ├── azure/             # Azureプロバイダーモジュール
│   │   ├── index.ts       # Azureベースクラス
│   │   └── compute.ts     # Azure Computeサービス
│   └── k8s/               # K8sプロバイダーモジュール
│       ├── index.ts       # K8sベースクラス
│       └── compute.ts     # K8s Computeサービス
├── dist/                  # コンパイルされたJavaScript出力
├── package.json           # NPMパッケージ設定
├── tsconfig.json          # TypeScriptコンパイラ設定
└── README.TypeScript.md   # このファイル
```

## ビルド

```bash
npm run build
```

これによりTypeScriptファイルが`dist/`ディレクトリにコンパイルされます。

## テスト

```bash
# テストを一度実行
npm test

# ウォッチモードでテストを実行
npm run test:watch
```

## リントとフォーマット

このプロジェクトは高速なRustベースのツールを使用しています：

```bash
# oxlintでコードをリント
npm run lint

# oxfmtでコードをフォーマット
npm run format

# ファイルを変更せずにフォーマットをチェック
npm run format:check
```

## CLIの使用

ビルド後：

```bash
./dist/cli.js my-diagram.js
```

## 開発ツール

このプロジェクトは高性能なモダンツールを使用しています：

- **@typescript/native-preview**: より高速なビルドのためのネイティブTypeScriptコンパイラ
- **vitest**: Viteを基盤とした高速なユニットテストフレームワーク
- **oxlint**: Rustで書かれた超高速リンター
- **oxfmt**: Rustで書かれた高速コードフォーマッター

## Python版との違い

1. **コンテキストマネージャー**: Pythonの`with`文の代わりに`async/await`パターンを使用
2. **演算子オーバーロード**: 演算子（`>>`, `-`）の代わりにメソッド呼び出し（`.forward()`, `.to()`）を使用
3. **型安全性**: より良いIDE サポートのための完全なTypeScript型定義
4. **モジュールシステム**: PythonインポートではなくES6/CommonJSモジュール

## ロードマップ

- [x] コアクラウドプロバイダーモジュールを追加（AWS、GCP、Azure、K8s）
- [ ] すべてのサービスタイプを各プロバイダーに追加
- [ ] すべてのノードタイプとアイコンを移植
- [ ] 包括的なテストスイートを追加
- [ ] サンプルギャラリーを追加
- [ ] graphviz統合を改善
- [ ] ドキュメントサイトを追加

## オリジナルプロジェクト

これはオリジナルのPythonプロジェクトのTypeScript移植版です：
- オリジナル: https://github.com/mingrammer/diagrams
- ドキュメント: https://diagrams.mingrammer.com

## ライセンス

MITライセンス（オリジナルプロジェクトと同じ）

