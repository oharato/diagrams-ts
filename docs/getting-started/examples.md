---
id: examples
title: Examples
---

Here are some more examples.

## Grouped Workers on AWS

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
    const events = new RDS('events');
    
    const workers = [
      new EC2('worker1'),
      new EC2('worker2'),
      new EC2('worker3'),
      new EC2('worker4'),
      new EC2('worker5')
    ];
    
    lb.forward(workers);
    workers.forEach(w => w.forward(events));
  });
}

main();
```

![grouped workers diagram](/img/grouped_workers_diagram.png)

## Clustered Web Services

```typescript
import { Cluster, Diagram } from 'diagrams-ts';
import { ECS } from 'diagrams-ts/aws/compute';
import { ElastiCache, RDS } from 'diagrams-ts/aws/database';
import { ELB, Route53 } from 'diagrams-ts/aws/network';

async function main() {
  const diagram = new Diagram({ name: 'Clustered Web Services', show: false });
  
  await diagram.use(async () => {
    const dns = new Route53('dns');
    const lb = new ELB('lb');
    
    const svcGroup: ECS[] = [];
    const servicesCluster = new Cluster({ label: 'Services' });
    await servicesCluster.use(async () => {
      svcGroup.push(
        new ECS('web1'),
        new ECS('web2'),
        new ECS('web3')
      );
    });
    
    let dbPrimary: RDS;
    const dbCluster = new Cluster({ label: 'DB Cluster' });
    await dbCluster.use(async () => {
      dbPrimary = new RDS('userdb');
      const dbRo = new RDS('userdb ro');
      dbPrimary.to(dbRo);
    });
    
    const memcached = new ElastiCache('memcached');
    
    dns.forward(lb);
    lb.forward(svcGroup);
    svcGroup.forEach(svc => {
      svc.forward(dbPrimary);
      svc.forward(memcached);
    });
  });
}

main();
```

![clustered web services diagram](/img/clustered_web_services_diagram.png)

## Event Processing on AWS

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

## Message Collecting System on GCP

```typescript
import { Cluster, Diagram } from 'diagrams-ts';
import { BigQuery, Dataflow, PubSub } from 'diagrams-ts/gcp/analytics';
import { AppEngine, Functions } from 'diagrams-ts/gcp/compute';
import { BigTable } from 'diagrams-ts/gcp/database';
import { IotCore } from 'diagrams-ts/gcp/iot';
import { GCS } from 'diagrams-ts/gcp/storage';

async function main() {
  const diagram = new Diagram({ name: 'Message Collecting', show: false });
  
  await diagram.use(async () => {
    const pubsub = new PubSub('pubsub');
    
    const sourceCluster = new Cluster({ label: 'Source of Data' });
    await sourceCluster.use(async () => {
      const sources = [
        new IotCore('core1'),
        new IotCore('core2'),
        new IotCore('core3')
      ];
      sources.forEach(s => s.forward(pubsub));
    });
    
    let flow: Dataflow;
    const targetsCluster = new Cluster({ label: 'Targets' });
    await targetsCluster.use(async () => {
      const dataFlowCluster = new Cluster({ label: 'Data Flow' });
      await dataFlowCluster.use(async () => {
        flow = new Dataflow('data flow');
      });
      
      const dataLakeCluster = new Cluster({ label: 'Data Lake' });
      await dataLakeCluster.use(async () => {
        const bq = new BigQuery('bq');
        const storage = new GCS('storage');
        flow.forward([bq, storage]);
      });
      
      const eventDrivenCluster = new Cluster({ label: 'Event Driven' });
      await eventDrivenCluster.use(async () => {
        const processingCluster = new Cluster({ label: 'Processing' });
        await processingCluster.use(async () => {
          const engine = new AppEngine('engine');
          const bigtable = new BigTable('bigtable');
          flow.forward(engine);
          engine.forward(bigtable);
        });
        
        const serverlessCluster = new Cluster({ label: 'Serverless' });
        await serverlessCluster.use(async () => {
          const func = new Functions('func');
          const appengine = new AppEngine('appengine');
          flow.forward(func);
          func.forward(appengine);
        });
      });
    });
    
    pubsub.forward(flow);
  });
}

main();
```

![message collecting diagram](/img/message_collecting_diagram.png)

## Exposed Pod with 3 Replicas on Kubernetes

```typescript
import { Diagram } from 'diagrams-ts';
import { HPA } from 'diagrams-ts/k8s/clusterconfig';
import { Deployment, Pod, ReplicaSet } from 'diagrams-ts/k8s/compute';
import { Ingress, Service } from 'diagrams-ts/k8s/network';

async function main() {
  const diagram = new Diagram({ 
    name: 'Exposed Pod with 3 Replicas', 
    show: false 
  });
  
  await diagram.use(async () => {
    const ingress = new Ingress('domain.com');
    const svc = new Service('svc');
    const pods = [
      new Pod('pod1'),
      new Pod('pod2'),
      new Pod('pod3')
    ];
    const rs = new ReplicaSet('rs');
    const dp = new Deployment('dp');
    const hpa = new HPA('hpa');
    
    ingress.forward(svc);
    svc.forward(pods);
    pods.forEach(p => p.reverse(rs));
    rs.reverse(dp);
    dp.reverse(hpa);
  });
}

main();
```

![exposed pod with 3 replicas diagram](/img/exposed_pod_with_3_replicas_diagram.png)

## Stateful Architecture on Kubernetes

```typescript
import { Cluster, Diagram } from 'diagrams-ts';
import { Pod, StatefulSet } from 'diagrams-ts/k8s/compute';
import { Service } from 'diagrams-ts/k8s/network';
import { PV, PVC, StorageClass } from 'diagrams-ts/k8s/storage';

async function main() {
  const diagram = new Diagram({ name: 'Stateful Architecture', show: false });
  
  await diagram.use(async () => {
    let svc: Service;
    let sts: StatefulSet;
    const apps: Pod[] = [];
    const pvcs: PVC[] = [];
    
    const appsCluster = new Cluster({ label: 'Apps' });
    await appsCluster.use(async () => {
      svc = new Service('svc');
      sts = new StatefulSet('sts');
      
      for (let i = 0; i < 3; i++) {
        const pod = new Pod('pod');
        const pvc = new PVC('pvc');
        
        svc.forward(pod);
        pod.to(sts);
        sts.to(pvc);
        pod.forward(pvc);
        
        apps.push(pod);
        pvcs.push(pvc);
      }
    });
    
    const pv = new PV('pv');
    const sc = new StorageClass('sc');
    
    pvcs.forEach(pvc => pvc.reverse(pv));
    pv.reverse(sc);
  });
}

main();
```

![stateful architecture diagram](/img/stateful_architecture_diagram.png)

## Advanced Web Service with On-Premises

```typescript
import { Cluster, Diagram } from 'diagrams-ts';
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
    name: 'Advanced Web Service with On-Premises', 
    show: false 
  });
  
  await diagram.use(async () => {
    const ingress = new Nginx('ingress');
    
    const metrics = new Prometheus('metric');
    const monitoring = new Grafana('monitoring');
    monitoring.forward(metrics);
    
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
      primarySession.to(replica);
      replica.forward(metrics);
    });
    grpcsvc.forEach(svc => svc.forward(primarySession));
    
    let primaryDb: PostgreSQL;
    const dbCluster = new Cluster({ label: 'Database HA' });
    await dbCluster.use(async () => {
      primaryDb = new PostgreSQL('users');
      const replica = new PostgreSQL('replica');
      primaryDb.to(replica);
      replica.forward(metrics);
    });
    grpcsvc.forEach(svc => svc.forward(primaryDb));
    
    const aggregator = new Fluentd('logging');
    const kafka = new Kafka('stream');
    const analytics = new Spark('analytics');
    aggregator.forward(kafka);
    kafka.forward(analytics);
    
    ingress.forward(grpcsvc);
    grpcsvc.forEach(svc => svc.forward(aggregator));
  });
}

main();
```

![advanced web service with on-premises diagram](/img/advanced_web_service_with_on-premises.png)

## Advanced Web Service with On-Premises (with colors and labels)

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
    
    ingress.connect(grpcsvc, new Edge({ color: 'darkgreen' }));
    grpcsvc.forEach(svc => 
      svc.connect(aggregator, new Edge({ color: 'darkorange' }))
    );
  });
}

main();
```

![advanced web service with on-premises diagram colored](/img/advanced_web_service_with_on-premises_colored.png)

## RabbitMQ Consumers with Custom Nodes

```typescript
import { Cluster, Diagram } from 'diagrams-ts';
import { Aurora } from 'diagrams-ts/aws/database';
import { Custom } from 'diagrams-ts/custom';
import { Pod } from 'diagrams-ts/k8s/compute';
import * as https from 'https';
import * as fs from 'fs';

// Download an image to be used into a Custom Node class
const rabbitmqUrl = 'https://jpadilla.github.io/rabbitmqapp/assets/img/icon.png';
const rabbitmqIcon = 'rabbitmq.png';

async function downloadImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  await downloadImage(rabbitmqUrl, rabbitmqIcon);
  
  const diagram = new Diagram({ name: 'Broker Consumers', show: false });
  
  await diagram.use(async () => {
    const consumers: Pod[] = [];
    const consumersCluster = new Cluster({ label: 'Consumers' });
    await consumersCluster.use(async () => {
      consumers.push(
        new Pod('worker'),
        new Pod('worker'),
        new Pod('worker')
      );
    });
    
    const queue = new Custom('Message queue', rabbitmqIcon);
    const db = new Aurora('Database');
    
    queue.forward(consumers);
    consumers.forEach(c => c.forward(db));
  });
}

main();
```

![rabbitmq consumers diagram](/img/rabbitmq_consumers_diagram.png)
