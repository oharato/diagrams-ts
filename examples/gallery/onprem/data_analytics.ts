/**
 * On-Premises Example: Data Analytics Platform
 * 
 * An on-premises data analytics platform with data ingestion, processing,
 * and visualization components.
 */

import { Diagram, Cluster } from '../../../src';
import { Server } from '../../../src/onprem/compute';
import { PostgreSQL, Cassandra, MongoDB } from '../../../src/onprem/database';
import { Kafka } from '../../../src/onprem/queue';
import { Grafana } from '../../../src/onprem/monitoring';

async function createDataAnalyticsDiagram() {
  const diagram = new Diagram({
    name: 'Data Analytics Platform',
    filename: 'onprem_data_analytics',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    // Data Ingestion
    const ingestionCluster = new Cluster({ label: 'Data Ingestion' });
    await ingestionCluster.use(async () => {
      const ingestServer1 = new Server('ingestion-1');
      const ingestServer2 = new Server('ingestion-2');
      const kafka = new Kafka('message-queue');
      
      ingestServer1.to(kafka);
      ingestServer2.to(kafka);
    });

    // Stream Processing
    const processingCluster = new Cluster({ label: 'Stream Processing' });
    await processingCluster.use(async () => {
      const processor1 = new Server('processor-master');
      const processor2 = new Server('processor-worker-1');
      const processor3 = new Server('processor-worker-2');
      
      processor1.to(processor2);
      processor1.to(processor3);
    });

    // Data Storage
    const storageCluster = new Cluster({ label: 'Data Storage' });
    await storageCluster.use(async () => {
      const timeSeriesDb = new Cassandra('timeseries-db');
      const analyticsDb = new PostgreSQL('analytics-db');
      const documentDb = new MongoDB('document-store');
      
      timeSeriesDb.to(analyticsDb);
      analyticsDb.to(documentDb);
    });

    // Visualization
    const vizCluster = new Cluster({ label: 'Visualization' });
    await vizCluster.use(async () => {
      const grafana = new Grafana('analytics-dashboards');
      const reportingServer = new Server('reporting-server');
      
      grafana.to(reportingServer);
    });
  });

  console.log('Data Analytics Platform diagram created!');
  console.log('Output: onprem_data_analytics.png');
}

createDataAnalyticsDiagram().catch(console.error);
