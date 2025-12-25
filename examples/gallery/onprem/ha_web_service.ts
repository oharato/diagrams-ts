/**
 * On-Premises Example: High Availability Web Service
 *
 * A highly available web service with redundant components, load balancing,
 * and database replication.
 */

import { Diagram, Cluster } from "../../../src";
import { Server } from "../../../src/onprem/compute";
import { PostgreSQL, MongoDB } from "../../../src/onprem/database";
import { Nginx, HAProxy, Consul } from "../../../src/onprem/network";
import { Prometheus, Grafana } from "../../../src/onprem/monitoring";

async function createHAWebServiceDiagram() {
  const diagram = new Diagram({
    name: "High Availability Web Service",
    filename: "onprem_ha_web_service",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // Load Balancers (HA Pair)
    const lbCluster = new Cluster({ label: "Load Balancers" });
    await lbCluster.use(async () => {
      const lb1 = new HAProxy("lb-primary");
      const lb2 = new HAProxy("lb-secondary");
      lb1.to(lb2);
    });

    // Service Discovery
    const discoveryCluster = new Cluster({ label: "Service Discovery" });
    await discoveryCluster.use(async () => {
      const consul1 = new Consul("consul-1");
      const consul2 = new Consul("consul-2");
      const consul3 = new Consul("consul-3");

      consul1.to(consul2);
      consul2.to(consul3);
    });

    // Web Servers
    const webCluster = new Cluster({ label: "Web Servers" });
    await webCluster.use(async () => {
      const web1 = new Nginx("web-1");
      const web2 = new Nginx("web-2");
      const web3 = new Nginx("web-3");

      web1.to(web2);
      web2.to(web3);
    });

    // Application Servers
    const appCluster = new Cluster({ label: "Application Servers" });
    await appCluster.use(async () => {
      const app1 = new Server("app-1");
      const app2 = new Server("app-2");
      const app3 = new Server("app-3");

      app1.to(app2);
      app2.to(app3);
    });

    // Database Cluster
    const dbCluster = new Cluster({ label: "Database Cluster" });
    await dbCluster.use(async () => {
      const primary = new PostgreSQL("postgres-primary");
      const standby1 = new PostgreSQL("postgres-standby-1");
      const standby2 = new PostgreSQL("postgres-standby-2");

      primary.to(standby1);
      primary.to(standby2);
    });

    // Cache Cluster
    const cacheCluster = new Cluster({ label: "Cache Cluster" });
    await cacheCluster.use(async () => {
      const master = new MongoDB("cache-master");
      const replica1 = new MongoDB("cache-replica-1");
      const replica2 = new MongoDB("cache-replica-2");

      master.to(replica1);
      master.to(replica2);
    });

    // Monitoring
    const monitoringCluster = new Cluster({ label: "Monitoring" });
    await monitoringCluster.use(async () => {
      const prometheus = new Prometheus("metrics");
      const grafana = new Grafana("dashboards");

      prometheus.to(grafana);
    });
  });

  console.log("High Availability Web Service diagram created!");
  console.log("Output: onprem_ha_web_service.png");
}

createHAWebServiceDiagram().catch(console.error);
