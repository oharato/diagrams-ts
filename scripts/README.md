# Scripts

このディレクトリには、diagrams-tsプロジェクトのためのユーティリティスクリプトが含まれています。

## generate-examples.ts

例のディレクトリ内のすべてのTypeScriptファイルを再帰的に検索し、diagrams-tsを使用して各ファイルと同じディレクトリに図を生成する一括画像生成スクリプト。

### 使用方法

```bash
# npm スクリプトを使用（推奨）
npm run generate-examples

# または直接実行
npx tsx scripts/generate-examples.ts

# またはスクリプトを直接実行可能にする場合
chmod +x scripts/generate-examples.ts
./scripts/generate-examples.ts
```

### 動作

1. `examples/` ディレクトリ以下のすべての `.ts` ファイルを再帰的に検索
2. 各TypeScriptファイルを `tsx` で実行
3. ソースファイルと同じディレクトリに図を生成
4. すべてのファイルを処理したら完了を報告

### 出力

各TypeScriptファイルは、ファイル内で定義された `filename` オプションに基づいて `.dot` ファイル（および対応する画像ファイル、graphvizがインストールされている場合）を生成します。

例:
- `examples/web_service.ts` → `examples/web_service.dot`
- `examples/gallery/aws/microservices_architecture.ts` → `examples/gallery/aws/aws_microservices_architecture.dot`

### 注意事項

- このスクリプトは、各TypeScriptファイルのディレクトリから実行されるため、生成された図は常にソースファイルと同じ場所に配置されます
- `.dot` ファイルは `.gitignore` に含まれているため、コミットされません
- graphvizがインストールされている場合、PNGやSVGなどの画像ファイルも生成されます

---

# Scripts (English)

This directory contains utility scripts for the diagrams-ts project.

## generate-examples.ts

A batch image generation script that recursively finds all TypeScript files in the examples directory and generates diagrams using diagrams-ts in the same directory as each file.

### Usage

```bash
# Using npm script (recommended)
npm run generate-examples

# Or run directly
npx tsx scripts/generate-examples.ts

# Or make the script executable
chmod +x scripts/generate-examples.ts
./scripts/generate-examples.ts
```

### How it works

1. Recursively searches for all `.ts` files under the `examples/` directory
2. Executes each TypeScript file with `tsx`
3. Generates diagrams in the same directory as the source file
4. Reports completion after processing all files

### Output

Each TypeScript file will generate a `.dot` file (and corresponding image files if graphviz is installed) based on the `filename` option defined in the file.

Examples:
- `examples/web_service.ts` → `examples/web_service.dot`
- `examples/gallery/aws/microservices_architecture.ts` → `examples/gallery/aws/aws_microservices_architecture.dot`

### Notes

- The script executes from each TypeScript file's directory, ensuring generated diagrams are always placed in the same location as the source file
- `.dot` files are included in `.gitignore` and will not be committed
- If graphviz is installed, image files (PNG, SVG, etc.) will also be generated
