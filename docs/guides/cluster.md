---
id: cluster
title: Clusters
---

`Cluster` allows you to group (or cluster) nodes in an isolated group.

## Basic

`Cluster` represents a local cluster context.

You can create a cluster context using the `Cluster` class. You can also connect the nodes in a cluster to other nodes outside a cluster.

```typescript
import { Cluster, Diagram } from 'diagrams-ts';
import { ECS } from 'diagrams-ts/aws/compute';
import { RDS } from 'diagrams-ts/aws/database';
import { Route53 } from 'diagrams-ts/aws/network';

async function main() {
  const diagram = new Diagram({ 
    name: 'Simple Web Service with DB Cluster', 
    show: false 
  });
  
  await diagram.use(async () => {
    const dns = new Route53('dns');
    const web = new ECS('service');
    
    let dbPrimary: RDS;
    const dbCluster = new Cluster({ label: 'DB Cluster' });
    await dbCluster.use(async () => {
      dbPrimary = new RDS('primary');
      const replica1 = new RDS('replica1');
      const replica2 = new RDS('replica2');
      dbPrimary.to(replica1);
      dbPrimary.to(replica2);
    });
    
    dns.forward(web);
    web.forward(dbPrimary);
  });
}

main();
```

![simple web service with db cluster diagram](/img/simple_web_service_with_db_cluster_diagram.png)

## Nested Clusters

Nested clustering is also possible:

```typescript
import { Cluster, Diagram } from 'diagrams-ts';
import { ECS, EKS, Lambda } from 'diagrams-ts/aws/compute';
import { Redshift } from 'diagrams-ts/aws/database';
import { SQS } from 'diagrams-ts/aws/integration';
import { S3 } from 'diagrams-ts/aws/storage';

async function main() {
  const diagram = new Diagram({ name: 'Event Processing', show: false });
  
  await diagram.use(async () => {
    const source = new EKS('k8s source');
    
    const workers: ECS[] = [];
    let queue: SQS;
    const handlers: Lambda[] = [];
    
    const eventFlowsCluster = new Cluster({ label: 'Event Flows' });
    await eventFlowsCluster.use(async () => {
      const eventWorkersCluster = new Cluster({ label: 'Event Workers' });
      await eventWorkersCluster.use(async () => {
        workers.push(
          new ECS('worker1'),
          new ECS('worker2'),
          new ECS('worker3')
        );
      });
      
      queue = new SQS('event queue');
      
      const processingCluster = new Cluster({ label: 'Processing' });
      await processingCluster.use(async () => {
        handlers.push(
          new Lambda('proc1'),
          new Lambda('proc2'),
          new Lambda('proc3')
        );
      });
    });
    
    const store = new S3('events store');
    const dw = new Redshift('analytics');
    
    source.forward(workers);
    workers.forEach(w => w.forward(queue));
    queue.forward(handlers);
    handlers.forEach(h => {
      h.forward(store);
      h.forward(dw);
    });
  });
}

main();
```

![event processing diagram](/img/event_processing_diagram.png)

> There is no depth limit to nesting. Feel free to create nested clusters as deep as you want.
