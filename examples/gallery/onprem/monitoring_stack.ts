/**
 * On-Premises Example: Monitoring Stack
 * 
 * A comprehensive monitoring and observability stack for on-premises
 * infrastructure with metrics, logs, and alerting.
 */

import { Diagram, Cluster } from '../../../src';
import { Server } from '../../../src/onprem/compute';
import { PostgreSQL, Cassandra } from '../../../src/onprem/database';
import { Prometheus, Grafana } from '../../../src/onprem/monitoring';

async function createMonitoringStackDiagram() {
  const diagram = new Diagram({
    name: 'Monitoring Stack',
    filename: 'onprem_monitoring_stack',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    // Metrics Collection
    const metricsCluster = new Cluster({ label: 'Metrics Collection' });
    await metricsCluster.use(async () => {
      const prometheus1 = new Prometheus('prometheus-1');
      const prometheus2 = new Prometheus('prometheus-2');
      const prometheus3 = new Prometheus('prometheus-3');
      
      prometheus1.to(prometheus2);
      prometheus2.to(prometheus3);
    });

    // Logs Aggregation
    const logsCluster = new Cluster({ label: 'Logs Aggregation' });
    await logsCluster.use(async () => {
      const logCollector1 = new Server('log-collector-1');
      const logCollector2 = new Server('log-collector-2');
      const logAggregator = new Server('log-aggregator');
      
      logCollector1.to(logAggregator);
      logCollector2.to(logAggregator);
    });

    // Time Series Storage
    const storageCluster = new Cluster({ label: 'Time Series Storage' });
    await storageCluster.use(async () => {
      const cassandra1 = new Cassandra('cassandra-1');
      const cassandra2 = new Cassandra('cassandra-2');
      const cassandra3 = new Cassandra('cassandra-3');
      
      cassandra1.to(cassandra2);
      cassandra2.to(cassandra3);
    });

    // Visualization & Alerting
    const vizCluster = new Cluster({ label: 'Visualization' });
    await vizCluster.use(async () => {
      const grafana1 = new Grafana('grafana-primary');
      const grafana2 = new Grafana('grafana-backup');
      const alertManager = new Server('alert-manager');
      
      grafana1.to(grafana2);
      grafana1.to(alertManager);
    });

    // Application Servers (Monitored)
    const appCluster = new Cluster({ label: 'Application Servers' });
    await appCluster.use(async () => {
      const app1 = new Server('app-server-1');
      const app2 = new Server('app-server-2');
      const app3 = new Server('app-server-3');
      
      app1.to(app2);
      app2.to(app3);
    });

    // Database Servers (Monitored)
    const dbCluster = new Cluster({ label: 'Database Servers' });
    await dbCluster.use(async () => {
      const db1 = new PostgreSQL('db-primary');
      const db2 = new PostgreSQL('db-replica');
      
      db1.to(db2);
    });
  });

  console.log('Monitoring Stack diagram created!');
  console.log('Output: onprem_monitoring_stack.png');
}

createMonitoringStackDiagram().catch(console.error);
