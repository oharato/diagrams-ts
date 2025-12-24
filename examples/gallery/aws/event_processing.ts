/**
 * AWS Example: Event Processing
 * 
 * An event processing architecture using EKS as source, ECS workers,
 * SQS queue, Lambda processors, S3 storage, and Redshift analytics.
 * 
 * This is the TypeScript version of the Python example from:
 * https://diagrams.mingrammer.com/docs/getting-started/examples
 */

import { Diagram, Cluster } from '../../../src';
import { ECS, EKS, Lambda } from '../../../src/aws/compute';
import { Redshift } from '../../../src/aws/database';
import { SQS } from '../../../src/aws/integration';
import { S3 } from '../../../src/aws/storage';

async function createEventProcessingDiagram() {
  const diagram = new Diagram({
    name: 'Event Processing',
    filename: 'aws_event_processing',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    const source = new EKS('k8s source');

    const eventFlowsCluster = new Cluster({ label: 'Event Flows' });
    await eventFlowsCluster.use(async () => {
      // Event Workers cluster
      const eventWorkersCluster = new Cluster({ label: 'Event Workers' });
      await eventWorkersCluster.use(async () => {
        const worker1 = new ECS('worker1');
        const worker2 = new ECS('worker2');
        const worker3 = new ECS('worker3');
        
        // Connect source to all workers
        source.to(worker1);
        source.to(worker2);
        source.to(worker3);
      });

      const queue = new SQS('event queue');

      // Processing cluster
      const processingCluster = new Cluster({ label: 'Processing' });
      await processingCluster.use(async () => {
        const proc1 = new Lambda('proc1');
        const proc2 = new Lambda('proc2');
        const proc3 = new Lambda('proc3');
        
        // Connect queue to all processors
        queue.to(proc1);
        queue.to(proc2);
        queue.to(proc3);
      });
    });

    const store = new S3('events store');
    const dw = new Redshift('analytics');
  });

  console.log('Event Processing diagram created!');
  console.log('Output: aws_event_processing.png');
}

createEventProcessingDiagram().catch(console.error);
