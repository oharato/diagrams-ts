---
id: installation
title: Installation
---

**diagrams-ts** requires **Node.js 18** or higher, check your Node.js version first.

**diagrams-ts** uses [Graphviz](https://www.graphviz.org/) to render the diagram, so you need to [install Graphviz](https://graphviz.gitlab.io/download/) to use it.

> macOS users using [Homebrew](https://brew.sh) can install Graphviz via `brew install graphviz` . Similarly, Windows users with [Chocolatey](https://chocolatey.org) installed can run `choco install graphviz` or use [Winget](https://learn.microsoft.com/windows/package-manager/) via `winget install Graphviz.Graphviz -i`.

After installing Graphviz (or if you already have it), install **diagrams-ts**:

```shell
# using npm
$ npm install diagrams-ts

# or clone and build locally
$ git clone https://github.com/oharato/diagrams-ts.git
$ cd diagrams-ts
$ npm install
$ npm run build
```

## Quick Start

```typescript
// diagram.ts
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';
import { RDS } from 'diagrams-ts/aws/database';
import { ELB } from 'diagrams-ts/aws/network';

async function main() {
  const diagram = new Diagram({ name: 'Web Service', show: false });

  await diagram.use(async () => {
    const lb = new ELB('lb');
    const web = new EC2('web');
    const userdb = new RDS('userdb');

    lb.forward(web);
    web.forward(userdb);
  });
}

main();
```

To generate the diagram, run:

```shell
$ npx tsx diagram.ts
# or compile and run
$ npx tsc diagram.ts && node diagram.js
```

This generates the diagram below:

![web service diagram](/img/web_service_diagram.png)

It will be saved as `web_service.png` in your working directory.

### CLI

With the `diagrams-ts` CLI you can process one or more diagram files at once.

```shell
$ diagrams-ts diagram1.ts diagram2.ts
```

## Next

See more [Examples](/docs/getting-started/examples) or see the [Guides](/docs/guides/diagram) page for more details.
