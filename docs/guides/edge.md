---
id: edge
title: Edges
---

`Edge` represents an edge between nodes.

## Basic

`Edge` is an object representing a connection between nodes with some additional properties.

An edge object contains three attributes: **label**, **color**, and **style**. They mirror the corresponding Graphviz edge attributes.

```typescript
import { Cluster, Diagram, Edge } from 'diagrams-ts';
import { Spark } from 'diagrams-ts/onprem/analytics';
import { Server } from 'diagrams-ts/onprem/compute';
import { PostgreSQL } from 'diagrams-ts/onprem/database';
import { Redis } from 'diagrams-ts/onprem/inmemory';
import { Fluentd } from 'diagrams-ts/onprem/aggregator';
import { Grafana, Prometheus } from 'diagrams-ts/onprem/monitoring';
import { Nginx } from 'diagrams-ts/onprem/network';
import { Kafka } from 'diagrams-ts/onprem/queue';

async function main() {
  const diagram = new Diagram({ 
    name: 'Advanced Web Service with On-Premises (colored)', 
    show: false 
  });
  
  await diagram.use(async () => {
    const ingress = new Nginx('ingress');
    
    const metrics = new Prometheus('metric');
    const monitoring = new Grafana('monitoring');
    monitoring.connect(metrics, new Edge({ color: 'firebrick', style: 'dashed' }));
    
    const grpcsvc: Server[] = [];
    const serviceCluster = new Cluster({ label: 'Service Cluster' });
    await serviceCluster.use(async () => {
      grpcsvc.push(
        new Server('grpc1'),
        new Server('grpc2'),
        new Server('grpc3')
      );
    });
    
    let primarySession: Redis;
    const sessionsCluster = new Cluster({ label: 'Sessions HA' });
    await sessionsCluster.use(async () => {
      primarySession = new Redis('session');
      const replica = new Redis('replica');
      
      primarySession.connect(replica, new Edge({ color: 'brown', style: 'dashed' }));
      replica.connect(metrics, new Edge({ label: 'collect' }));
    });
    grpcsvc.forEach(svc => 
      svc.connect(primarySession, new Edge({ color: 'brown' }))
    );
    
    let primaryDb: PostgreSQL;
    const dbCluster = new Cluster({ label: 'Database HA' });
    await dbCluster.use(async () => {
      primaryDb = new PostgreSQL('users');
      const replica = new PostgreSQL('replica');
      
      primaryDb.connect(replica, new Edge({ color: 'brown', style: 'dotted' }));
      replica.connect(metrics, new Edge({ label: 'collect' }));
    });
    grpcsvc.forEach(svc => 
      svc.connect(primaryDb, new Edge({ color: 'black' }))
    );
    
    const aggregator = new Fluentd('logging');
    const kafka = new Kafka('stream');
    const analytics = new Spark('analytics');
    
    aggregator.connect(kafka, new Edge({ label: 'parse' }));
    kafka.connect(analytics, new Edge({ color: 'black', style: 'bold' }));
    
    // The original Python code has bidirectional edge: ingress >> Edge() << grpcsvc
    // This connects ingress to grpcsvc with the edge, then grpcsvc connects back
    grpcsvc[0].connect(ingress, new Edge({ color: 'darkgreen' }));
    grpcsvc.forEach(svc => 
      svc.connect(aggregator, new Edge({ color: 'darkorange' }))
    );
  });
}

main();
```
![advanced web service with on-premise diagram colored](/img/advanced_web_service_with_on-premise_colored.png)

## Less Edges

As you can see on the previous graph the edges can quickly become noisy. Below are two examples to solve this problem.

One approach is to get creative with the Node class to create blank placeholders, together with named nodes within Clusters, and then only pointing to single named elements within those Clusters.

Compare the output below to the example output above.

```typescript
import { Cluster, Diagram, Node } from 'diagrams-ts';
import { Spark } from 'diagrams-ts/onprem/analytics';
import { Server } from 'diagrams-ts/onprem/compute';
import { PostgreSQL } from 'diagrams-ts/onprem/database';
import { Redis } from 'diagrams-ts/onprem/inmemory';
import { Fluentd } from 'diagrams-ts/onprem/aggregator';
import { Grafana, Prometheus } from 'diagrams-ts/onprem/monitoring';
import { Nginx } from 'diagrams-ts/onprem/network';
import { Kafka } from 'diagrams-ts/onprem/queue';

async function main() {
  const diagram = new Diagram({ 
    name: '\nAdvanced Web Service with On-Premise Less edges', 
    show: false 
  });
  
  await diagram.use(async () => {
    const ingress = new Nginx('ingress');
    
    let serv1: Server, serv2: Server, serv3: Server;
    const serviceCluster = new Cluster({ label: 'Service Cluster' });
    await serviceCluster.use(async () => {
      serv1 = new Server('grpc1');
      serv2 = new Server('grpc2');
      serv3 = new Server('grpc3');
    });
    
    let blankHA: Node, metrics: Prometheus, aggregator: Fluentd;
    let db: PostgreSQL, sess: Redis;
    
    const outerCluster = new Cluster({ label: '' });
    await outerCluster.use(async () => {
      blankHA = new Node('', { 
        shape: 'plaintext', 
        width: '0', 
        height: '0' 
      });
      
      metrics = new Prometheus('metric');
      const monitoring = new Grafana('monitoring');
      metrics.reverse(monitoring);
      
      aggregator = new Fluentd('logging');
      const kafka = new Kafka('stream');
      const analytics = new Spark('analytics');
      
      blankHA.forward(aggregator);
      aggregator.forward(kafka);
      kafka.forward(analytics);
      
      const dbCluster = new Cluster({ label: 'Database HA' });
      await dbCluster.use(async () => {
        db = new PostgreSQL('users');
        const dbReplica = new PostgreSQL('replica');
        db.to(dbReplica);
        dbReplica.reverse(metrics);
      });
      blankHA.forward(db);
      
      const sessionsCluster = new Cluster({ label: 'Sessions HA' });
      await sessionsCluster.use(async () => {
        sess = new Redis('session');
        const sessReplica = new Redis('replica');
        sess.to(sessReplica);
        sessReplica.reverse(metrics);
      });
      blankHA.forward(sess);
    });
    
    ingress.forward(serv2);
    serv2.forward(blankHA);
  });
}

main();
```

![advanced web service with on-premise less edges](/img/advanced_web_service_with_on-premise_less_edges.png)

## Merged Edges

Yet another option is to set the graph_attr dictionary key "concentrate" to "true".

Note the following restrictions:

1.  the Edge must end at the same headport
2.  This only works when the "splines" graph_attr key is set to the value "spline". It has no effect when the value was set to "ortho", which is the default for the diagrams library.
3. this will only work with the "dot" layout engine, which is the default for the diagrams library.

For more information see:

  https://graphviz.gitlab.io/doc/info/attrs.html#d:concentrate

  https://www.graphviz.org/pdf/dotguide.pdf Section 3.3 Concentrators



```typescript
import { Cluster, Diagram, Edge, Node } from 'diagrams-ts';
import { Spark } from 'diagrams-ts/onprem/analytics';
import { Server } from 'diagrams-ts/onprem/compute';
import { PostgreSQL } from 'diagrams-ts/onprem/database';
import { Redis } from 'diagrams-ts/onprem/inmemory';
import { Fluentd } from 'diagrams-ts/onprem/aggregator';
import { Grafana, Prometheus } from 'diagrams-ts/onprem/monitoring';
import { Nginx } from 'diagrams-ts/onprem/network';
import { Kafka } from 'diagrams-ts/onprem/queue';

async function main() {
  const graphAttr = {
    concentrate: 'true',
    splines: 'spline',
  };
  
  const edgeAttr = {
    minlen: '3',
  };
  
  const diagram = new Diagram({ 
    name: '\n\nAdvanced Web Service with On-Premise Merged edges', 
    show: false,
    graph_attr: graphAttr,
    edge_attr: edgeAttr
  });
  
  await diagram.use(async () => {
    const ingress = new Nginx('ingress');
    
    const metrics = new Prometheus('metric');
    const monitoring = new Grafana('monitoring');
    monitoring.connect(metrics, new Edge({ minlen: '0' }));
    
    const grpsrv: Server[] = [];
    const serviceCluster = new Cluster({ label: 'Service Cluster' });
    await serviceCluster.use(async () => {
      grpsrv.push(
        new Server('grpc1'),
        new Server('grpc2'),
        new Server('grpc3')
      );
    });
    
    const blank = new Node('', { 
      shape: 'plaintext', 
      height: '0.0', 
      width: '0.0' 
    });
    
    let sess: Redis;
    const sessionsCluster = new Cluster({ label: 'Sessions HA' });
    await sessionsCluster.use(async () => {
      sess = new Redis('session');
      const replica = new Redis('replica');
      sess.to(replica);
      replica.reverse(metrics);
    });
    
    let db: PostgreSQL;
    const dbCluster = new Cluster({ label: 'Database HA' });
    await dbCluster.use(async () => {
      db = new PostgreSQL('users');
      const replica = new PostgreSQL('replica');
      db.to(replica);
      replica.reverse(metrics);
    });
    
    const aggregator = new Fluentd('logging');
    const kafka = new Kafka('stream');
    const analytics = new Spark('analytics');
    
    aggregator.forward(kafka);
    kafka.forward(analytics);
    
    ingress.forward([grpsrv[0], grpsrv[1], grpsrv[2]]);
    
    [grpsrv[0], grpsrv[1], grpsrv[2]].forEach(srv => 
      srv.connect(blank, new Edge({ headport: 'w', minlen: '1' }))
    );
    
    blank.connect(sess, new Edge({ headport: 'w', minlen: '2' }));
    blank.connect(db, new Edge({ headport: 'w', minlen: '2' }));
    blank.connect(aggregator, new Edge({ headport: 'w', minlen: '2' }));
  });
}

main();
```
![advanced web service with on-premise merged edges](/img/advanced_web_service_with_on-premise_merged_edges.png)
