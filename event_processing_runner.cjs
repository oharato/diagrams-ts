const { Diagram, Cluster } = require('./dist/index.js');
const { ECS, EKS, Lambda } = require('./dist/aws/compute.js');
const { Redshift } = require('./dist/aws/database.js');
const { SQS } = require('./dist/aws/integration.js');
const { S3 } = require('./dist/aws/storage.js');

(async () => {
  const diagram = new Diagram({
    name: 'Event Processing',
    filename: '/tmp/aws_event_processing',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    const source = new EKS('k8s source');

    const eventFlowsCluster = new Cluster({ label: 'Event Flows' });
    await eventFlowsCluster.use(async () => {
      const eventWorkersCluster = new Cluster({ label: 'Event Workers' });
      await eventWorkersCluster.use(async () => {
        const worker1 = new ECS('worker1');
        const worker2 = new ECS('worker2');
        const worker3 = new ECS('worker3');
        
        source.to(worker1);
        source.to(worker2);
        source.to(worker3);
      });

      const queue = new SQS('event queue');

      const processingCluster = new Cluster({ label: 'Processing' });
      await processingCluster.use(async () => {
        const proc1 = new Lambda('proc1');
        const proc2 = new Lambda('proc2');
        const proc3 = new Lambda('proc3');
        
        queue.to(proc1);
        queue.to(proc2);
        queue.to(proc3);
      });
    });

    const store = new S3('events store');
    const dw = new Redshift('analytics');
  });

  console.log('Event Processing diagram created!');
})().catch(console.error);
