const { Diagram } = require('./dist/index.js');
const { EKS } = require('./dist/aws/compute.js');

(async () => {
  const diagram = new Diagram({
    name: 'Test',
    filename: '/tmp/test_node_attrs',
    show: false,
  });

  await diagram.use(async () => {
    new EKS('k8s source');
  });
})().catch(console.error);
