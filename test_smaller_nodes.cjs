const { Diagram, Cluster } = require('./dist/index.js');
const { ECS, EKS, Lambda } = require('./dist/aws/compute.js');
const { Redshift } = require('./dist/aws/database.js');
const { SQS } = require('./dist/aws/integration.js');
const { S3 } = require('./dist/aws/storage.js');

(async () => {
  const diagram = new Diagram({
    name: 'Event Processing',
    filename: '/tmp/aws_event_processing_final',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    const source = new EKS('k8s source');

    let workers = [];
    let queue;
    let handlers = [];

    const eventFlowsCluster = new Cluster({ label: 'Event Flows' });
    await eventFlowsCluster.use(async () => {
      const eventWorkersCluster = new Cluster({ label: 'Event Workers' });
      await eventWorkersCluster.use(async () => {
        workers = [
          new ECS('worker1'),
          new ECS('worker2'),
          new ECS('worker3')
        ];
      });

      queue = new SQS('event queue');

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

    workers.forEach(worker => source.forward(worker));
    workers.forEach(worker => worker.forward(queue));
    handlers.forEach(handler => queue.forward(handler));
    handlers.forEach(handler => {
      handler.forward(store);
      handler.forward(dw);
    });
  });

  console.log('Event Processing diagram created!');
})().catch(console.error);
