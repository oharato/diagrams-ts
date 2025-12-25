/**
 * Programming Example: Full Stack Application
 *
 * A complete full-stack application showing frontend, backend, and database
 * layers with monitoring and logging.
 */

import { Diagram, Cluster } from "../../../src";
import { React, Django, Vue } from "../../../src/programming/framework";
import { Python, JavaScript } from "../../../src/programming/language";
import { PostgreSQL, MongoDB } from "../../../src/onprem/database";
import { Nginx } from "../../../src/onprem/network";
import { Prometheus, Grafana } from "../../../src/onprem/monitoring";

async function createFullStackDiagram() {
  const diagram = new Diagram({
    name: "Full Stack Application",
    filename: "programming_full_stack",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // Load Balancer
    const lb = new Nginx("load-balancer");

    // Frontend Tier
    const frontendCluster = new Cluster({ label: "Frontend" });
    await frontendCluster.use(async () => {
      const adminUI = new React("admin-dashboard");
      const userUI = new Vue("user-portal");

      adminUI.to(userUI);
    });

    // Backend Tier
    const backendCluster = new Cluster({ label: "Backend" });
    await backendCluster.use(async () => {
      const restApi = new Django("rest-api");
      const businessLogic = new Python("business-logic");
      const graphqlApi = new JavaScript("graphql-api");

      restApi.to(businessLogic);
      businessLogic.to(graphqlApi);
    });

    // Data Tier
    const dataCluster = new Cluster({ label: "Data Tier" });
    await dataCluster.use(async () => {
      const relationalDb = new PostgreSQL("user-data");
      const documentDb = new MongoDB("content-data");

      relationalDb.to(documentDb);
    });

    // Monitoring
    const monitoringCluster = new Cluster({ label: "Monitoring" });
    await monitoringCluster.use(async () => {
      const metrics = new Prometheus("metrics");
      const dashboards = new Grafana("dashboards");

      metrics.to(dashboards);
    });
  });

  console.log("Full Stack Application diagram created!");
  console.log("Output: programming_full_stack.png");
}

createFullStackDiagram().catch(console.error);
