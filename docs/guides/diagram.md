---
id: diagram
title: Diagrams
---

`Diagram` is a primary object representing a diagram.

## Basic

`Diagram` represents a global diagram context.

You can create a diagram context with the `Diagram` class. The first parameter of the `Diagram` constructor will be used to generate the output filename.

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';

async function main() {
  const diagram = new Diagram({ name: 'Simple Diagram' });
  
  await diagram.use(async () => {
    new EC2('web');
  });
}

main();
```

If you run the above script with the command below,

```shell
$ npx tsx diagram.ts
```

it will generate an image file with single `EC2` node drawn as `simple_diagram.png` in your working directory and open that created image file immediately.

## Jupyter Notebooks

Diagrams in TypeScript do not have direct Jupyter notebook support like the Python version. However, you can generate diagrams and display them in web-based environments or use Node.js REPL for interactive development.

## Options

You can specify the output file format with the `outformat` parameter. The default is **png**.

> Allowed formats are: png, jpg, svg, pdf, and dot

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';

async function main() {
  const diagram = new Diagram({ 
    name: 'Simple Diagram', 
    outformat: 'jpg' 
  });
  
  await diagram.use(async () => {
    new EC2('web');
  });
}

main();
```

The `outformat` parameter also supports an array to output all the defined outputs in one call:

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';

async function main() {
  const diagram = new Diagram({ 
    name: 'Simple Diagram Multi Output', 
    outformat: ['jpg', 'png', 'dot'] 
  });
  
  await diagram.use(async () => {
    new EC2('web');
  });
}

main();
```

You can specify the output filename with the `filename` parameter. The extension shouldn't be included, it's determined by the `outformat` parameter.

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';

async function main() {
  const diagram = new Diagram({ 
    name: 'Simple Diagram', 
    filename: 'my_diagram' 
  });
  
  await diagram.use(async () => {
    new EC2('web');
  });
}

main();
```

You can also disable the automatic file opening by setting the `show` parameter to **false**. The default is **true**.

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';

async function main() {
  const diagram = new Diagram({ 
    name: 'Simple Diagram', 
    show: false 
  });
  
  await diagram.use(async () => {
    new EC2('web');
  });
}

main();
```

Diagrams also allow custom Graphviz dot attributes options.

> `graph_attr`, `node_attr` and `edge_attr` are supported. Here is a [reference link](https://www.graphviz.org/doc/info/attrs.html).

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';

async function main() {
  const graphAttr = {
    fontsize: '45',
    bgcolor: 'transparent'
  };
  
  const diagram = new Diagram({ 
    name: 'Simple Diagram', 
    show: false, 
    graph_attr: graphAttr 
  });
  
  await diagram.use(async () => {
    new EC2('web');
  });
}

main();
```
