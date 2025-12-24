---
id: node
title: Nodes
---

`Node` is an object representing a node or system component.

## Basic

`Node` is an abstract concept that represents a single system component object.

A node object consists of three parts: **provider**, **resource type** and **name**. You may already have seen each part in the previous example.

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

In the example above, the `EC2` is a node of resource type `compute` which is provided by the `aws` provider.

You can use other node objects in a similar manner:

```typescript
// aws resources
import { ECS, Lambda } from 'diagrams-ts/aws/compute';
import { RDS, ElastiCache } from 'diagrams-ts/aws/database';
import { ELB, Route53, VPC } from 'diagrams-ts/aws/network';
// ...

// azure resources
import { FunctionApps } from 'diagrams-ts/azure/compute';
import { BlobStorage } from 'diagrams-ts/azure/storage';
// ...

// alibaba cloud resources
import { ECS } from 'diagrams-ts/alibabacloud/compute';
import { ObjectTableStore } from 'diagrams-ts/alibabacloud/storage';
// ...

// gcp resources
import { AppEngine, GKE } from 'diagrams-ts/gcp/compute';
import { AutoML } from 'diagrams-ts/gcp/ml';
// ...

// k8s resources
import { Pod, StatefulSet } from 'diagrams-ts/k8s/compute';
import { Service } from 'diagrams-ts/k8s/network';
import { PV, PVC, StorageClass } from 'diagrams-ts/k8s/storage';
// ...

// oracle resources
import { VirtualMachine, Container } from 'diagrams-ts/oci/compute';
import { Firewall } from 'diagrams-ts/oci/network';
import { FileStorage, StorageGateway } from 'diagrams-ts/oci/storage';
```

You can find lists of all available nodes for each provider in the sidebar on the left.

For example, [here](https://diagrams.mingrammer.com/docs/nodes/aws) is the list of all available AWS nodes.

## Data Flow

You can represent data flow by connecting the nodes with methods.

- **forward()** connects nodes in left to right direction (equivalent to `>>` in Python).
- **reverse()** connects nodes in right to left direction (equivalent to `<<` in Python).
- **to()** connects nodes in no direction. Undirected (equivalent to `-` in Python).

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';
import { RDS } from 'diagrams-ts/aws/database';
import { ELB } from 'diagrams-ts/aws/network';
import { S3 } from 'diagrams-ts/aws/storage';

async function main() {
  const diagram = new Diagram({ name: 'Web Services', show: false });
  
  await diagram.use(async () => {
    const lb = new ELB('lb');
    const web = new EC2('web');
    const userdb = new RDS('userdb');
    const store = new S3('store');
    const stat = new EC2('stat');
    
    lb.forward(web);
    web.forward(userdb);
    userdb.forward(store);
    
    const web2 = new EC2('web');
    const userdb2 = new RDS('userdb');
    lb.forward(web2);
    web2.forward(userdb2);
    userdb2.reverse(stat);
    
    const web3 = new EC2('web');
    const userdb3 = new RDS('userdb');
    lb.forward(web3);
    web3.to(web3);
    web3.forward(userdb3);
  });
}

main();
```

![web services diagram](/img/web_services_diagram.png)

> The order of rendered diagrams is the reverse of the declaration order.

You can change the data flow direction with the `direction` parameter. The default is **LR**.

> Allowed values are: TB, BT, LR, and RL

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';
import { RDS } from 'diagrams-ts/aws/database';
import { ELB } from 'diagrams-ts/aws/network';

async function main() {
  const diagram = new Diagram({ 
    name: 'Workers', 
    show: false, 
    direction: 'TB' 
  });
  
  await diagram.use(async () => {
    const lb = new ELB('lb');
    const db = new RDS('events');
    
    const worker1 = new EC2('worker1');
    const worker2 = new EC2('worker2');
    const worker3 = new EC2('worker3');
    const worker4 = new EC2('worker4');
    const worker5 = new EC2('worker5');
    
    lb.forward(worker1);
    worker1.forward(db);
    
    lb.forward(worker2);
    worker2.forward(db);
    
    lb.forward(worker3);
    worker3.forward(db);
    
    lb.forward(worker4);
    worker4.forward(db);
    
    lb.forward(worker5);
    worker5.forward(db);
  });
}

main();
```

![workers diagram](/img/workers_diagram.png)

## Group Data Flow

The above worker example has too many redundant flows. To avoid this, you can group nodes into an array so that all nodes are connected to other nodes at once:

```typescript
import { Diagram } from 'diagrams-ts';
import { EC2 } from 'diagrams-ts/aws/compute';
import { RDS } from 'diagrams-ts/aws/database';
import { ELB } from 'diagrams-ts/aws/network';

async function main() {
  const diagram = new Diagram({ 
    name: 'Grouped Workers', 
    show: false, 
    direction: 'TB' 
  });
  
  await diagram.use(async () => {
    const lb = new ELB('lb');
    const workers = [
      new EC2('worker1'),
      new EC2('worker2'),
      new EC2('worker3'),
      new EC2('worker4'),
      new EC2('worker5')
    ];
    const events = new RDS('events');
    
    lb.forward(workers);
    workers.forEach(w => w.forward(events));
  });
}

main();
```

![grouped workers diagram](/img/grouped_workers_diagram.png)

> You can connect to arrays of nodes by calling forward/reverse/to with an array, or by using forEach to iterate over the array.
