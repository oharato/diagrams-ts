/**
 * AWS Example: Containerized Application
 * 
 * A containerized application architecture using ECS, ECR, RDS,
 * and Application Load Balancer.
 */

import { Diagram, Cluster } from '../../../src';
import { ECS, ECR } from '../../../src/aws/compute';
import { RDS, ElastiCache } from '../../../src/aws/database';
import { ELB, Route53 } from '../../../src/aws/network';
import { S3 } from '../../../src/aws/storage';
import { SQS, SNS } from '../../../src/aws/integration';

async function createContainerizedAppDiagram() {
  const diagram = new Diagram({
    name: 'Containerized Application',
    filename: 'aws_containerized_app',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    // DNS and Load Balancing
    const dns = new Route53('domain');
    const lb = new ELB('application-lb');
    
    dns.to(lb);

    // Application Containers
    const appCluster = new Cluster({ label: 'ECS Services' });
    await appCluster.use(async () => {
      const ecr = new ECR('container-registry');
      const webService = new ECS('web-service');
      const apiService = new ECS('api-service');
      const workerService = new ECS('worker-service');
      
      ecr.to(webService);
      lb.to(webService);
      webService.to(apiService);
      apiService.to(workerService);
    });

    // Data Layer
    const dataCluster = new Cluster({ label: 'Data Layer' });
    await dataCluster.use(async () => {
      const database = new RDS('postgres-db');
      const cache = new ElastiCache('redis-cache');
      
      database.to(cache);
    });

    // Messaging
    const messagingCluster = new Cluster({ label: 'Messaging' });
    await messagingCluster.use(async () => {
      const queue = new SQS('task-queue');
      const notifications = new SNS('alerts');
      
      queue.to(notifications);
    });

    // Storage
    const storageCluster = new Cluster({ label: 'Storage' });
    await storageCluster.use(async () => {
      const uploads = new S3('user-uploads');
      const backups = new S3('database-backups');
      
      uploads.to(backups);
    });
  });

  console.log('AWS Containerized Application diagram created!');
  console.log('Output: aws_containerized_app.png');
}

createContainerizedAppDiagram().catch(console.error);
