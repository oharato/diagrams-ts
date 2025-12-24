/**
 * On-Premises Example: Traditional Three-Tier Architecture
 * 
 * A classic three-tier architecture with web servers, application servers,
 * and database servers in an on-premises data center.
 */

import { Diagram, Cluster } from '../../../src';
import { Server } from '../../../src/onprem/compute';
import { PostgreSQL, MongoDB } from '../../../src/onprem/database';
import { Nginx, HAProxy } from '../../../src/onprem/network';

async function createThreeTierDiagram() {
  const diagram = new Diagram({
    name: 'Traditional Three-Tier Architecture',
    filename: 'onprem_three_tier',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    // Load Balancer
    const lb = new HAProxy('load-balancer');

    // Web Tier
    const webCluster = new Cluster({ label: 'Web Tier' });
    await webCluster.use(async () => {
      const web1 = new Nginx('web-server-1');
      const web2 = new Nginx('web-server-2');
      const web3 = new Nginx('web-server-3');
      
      web1.to(web2);
      web2.to(web3);
    });

    // Application Tier
    const appCluster = new Cluster({ label: 'Application Tier' });
    await appCluster.use(async () => {
      const app1 = new Server('app-server-1');
      const app2 = new Server('app-server-2');
      const app3 = new Server('app-server-3');
      const app4 = new Server('app-server-4');
      
      app1.to(app2);
      app2.to(app3);
      app3.to(app4);
    });

    // Database Tier
    const dbCluster = new Cluster({ label: 'Database Tier' });
    await dbCluster.use(async () => {
      const primaryDb = new PostgreSQL('primary-db');
      const replicaDb1 = new PostgreSQL('replica-db-1');
      const replicaDb2 = new PostgreSQL('replica-db-2');
      const cacheDb = new MongoDB('cache-db');
      
      primaryDb.to(replicaDb1);
      primaryDb.to(replicaDb2);
      cacheDb.to(primaryDb);
    });
  });

  console.log('Traditional Three-Tier Architecture diagram created!');
  console.log('Output: onprem_three_tier.png');
}

createThreeTierDiagram().catch(console.error);
