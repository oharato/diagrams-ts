# Diagrams - TypeScript Edition

This is a TypeScript port of the [diagrams](https://github.com/mingrammer/diagrams) Python library.

**Diagram as Code** - Draw cloud system architecture diagrams using TypeScript/JavaScript code.

## Status

This is an **initial TypeScript port** of the core functionality. Currently includes:

- ✅ Core classes: `Diagram`, `Cluster`, `Node`, `Edge`
- ✅ AWS Compute provider (example implementation)
- ✅ CLI tool
- ✅ TypeScript type definitions
- ⏳ Additional cloud providers (in progress)
- ⏳ Full test suite (in progress)

## Installation

```bash
npm install
npm run build
```

## Usage

### Basic Example

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

### Context Management

Unlike Python's `with` statement, TypeScript uses async/await pattern:

```typescript
// Python style (original)
with Diagram("My Diagram"):
    with Cluster("Services"):
        node1 = EC2("web")

// TypeScript style (this port)
await diagram.use(async () => {
  await cluster.use(async () => {
    const node1 = new EC2('web');
  });
});
```

### Node Connections

Since TypeScript doesn't support operator overloading like Python, use method calls:

```typescript
// Python style (original)
node1 >> node2
node1 - node2

// TypeScript style (this port)
node1.forward(node2);  // equivalent to >>
node1.to(node2);       // equivalent to -
```

## Project Structure

```
diagrams/
├── src/                    # TypeScript source files
│   ├── index.ts           # Core classes (Diagram, Cluster, Node, Edge)
│   ├── cli.ts             # Command-line interface
│   └── aws/               # AWS provider modules
│       ├── index.ts       # Base AWS classes
│       └── compute.ts     # AWS Compute services
├── dist/                  # Compiled JavaScript output
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript compiler configuration
└── README.TypeScript.md   # This file
```

## Building

```bash
npm run build
```

This will compile TypeScript files to JavaScript in the `dist/` directory.

## Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## Linting and Formatting

The project uses modern Rust-based tools for fast linting and formatting:

```bash
# Lint code with oxlint
npm run lint

# Format code with oxfmt
npm run format

# Check formatting without modifying files
npm run format:check
```

## CLI Usage

After building:

```bash
./dist/cli.js my-diagram.js
```

## Development Tools

This project uses high-performance modern tooling:

- **@typescript/native-preview**: Native TypeScript compiler for faster builds
- **vitest**: Fast unit testing framework powered by Vite
- **oxlint**: Blazing fast linter written in Rust
- **oxfmt**: Fast code formatter written in Rust

## Differences from Python Version

1. **Context Managers**: Uses `async/await` pattern instead of Python's `with` statement
2. **Operator Overloading**: Uses method calls (`.forward()`, `.to()`) instead of operators (`>>`, `-`)
3. **Type Safety**: Full TypeScript type definitions for better IDE support
4. **Module System**: ES6/CommonJS modules instead of Python imports

## Roadmap

- [ ] Complete all cloud provider modules (Azure, GCP, K8s, etc.)
- [ ] Port all node types and icons
- [ ] Add comprehensive test suite
- [ ] Add example gallery
- [ ] Improve graphviz integration
- [ ] Add documentation site

## Original Project

This is a TypeScript port of the original Python project:
- Original: https://github.com/mingrammer/diagrams
- Documentation: https://diagrams.mingrammer.com

## License

MIT License (same as original project)

---

# Diagrams - TypeScript版

これは [diagrams](https://github.com/mingrammer/diagrams) PythonライブラリのTypeScript移植版です。

**Diagram as Code** - TypeScript/JavaScriptコードでクラウドシステムアーキテクチャ図を描画します。

## ステータス

これはコア機能の**初期TypeScript移植版**です。現在含まれているもの：

- ✅ コアクラス: `Diagram`, `Cluster`, `Node`, `Edge`
- ✅ AWS Computeプロバイダー（実装例）
- ✅ CLIツール
- ✅ TypeScript型定義
- ⏳ 追加のクラウドプロバイダー（進行中）
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

## プロジェクト構造

```
diagrams/
├── src/                    # TypeScriptソースファイル
│   ├── index.ts           # コアクラス（Diagram, Cluster, Node, Edge）
│   ├── cli.ts             # コマンドラインインターフェース
│   └── aws/               # AWSプロバイダーモジュール
│       ├── index.ts       # AWSベースクラス
│       └── compute.ts     # AWS Computeサービス
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

- [ ] すべてのクラウドプロバイダーモジュールを完成（Azure、GCP、K8sなど）
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
