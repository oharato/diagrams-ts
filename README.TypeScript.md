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
npm test
```

## CLI Usage

After building:

```bash
./dist/cli.js my-diagram.js
```

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
