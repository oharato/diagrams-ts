const { digraph, subgraph, toDot } = require('ts-graphviz');

const g = digraph('test');
g.set('rankdir', 'LR');

const cluster1 = subgraph('cluster_outer', (sub) => {
  sub.set('label', 'Outer Cluster');
  sub.set('style', 'filled');
  sub.set('color', 'lightblue');
  sub.node('a', { label: 'Node A' });
  sub.node('b', { label: 'Node B' });
});

g.addSubgraph(cluster1);

console.log(toDot(g));
