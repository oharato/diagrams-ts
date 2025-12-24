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

    // Variables to hold references to workers, queue, and handlers
    let workers: any[] = [];
    let queue: any;
    let handlers: any[] = [];

    const eventFlowsCluster = new Cluster({ label: 'Event Flows' });
    await eventFlowsCluster.use(async () => {
      // Event Workers cluster
      const eventWorkersCluster = new Cluster({ label: 'Event Workers' });
      await eventWorkersCluster.use(async () => {
        workers = [
          new ECS('worker1'),
          new ECS('worker2'),
          new ECS('worker3')
        ];
      });

      queue = new SQS('event queue');

      // Processing cluster
      const processingCluster = new Cluster({ label: 'Processing' });
      await processingCluster.use(async () => {
        handlers = [
          new Lambda('proc1'),
          new Lambda('proc2'),
          new Lambda('proc3')
        ];
      });
    });

    const store = new S3('events store');
    const dw = new Redshift('analytics');

    // Connect source to all workers
    workers.forEach(worker => source.forward(worker));
    
    // Connect all workers to queue
    workers.forEach(worker => worker.forward(queue));
    
    // Connect queue to all handlers
    handlers.forEach(handler => queue.forward(handler));
    
    // Connect all handlers to store and analytics
    handlers.forEach(handler => {
      handler.forward(store);
      handler.forward(dw);
    });
  });

  console.log('Event Processing diagram created!');
  console.log('Output: aws_event_processing.png');
}

createEventProcessingDiagram().catch(console.error);
