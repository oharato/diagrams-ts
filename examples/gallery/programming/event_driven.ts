/**
 * Programming Example: Event-Driven Architecture
 *
 * An event-driven architecture using various programming languages
 * and frameworks with event sourcing pattern.
 */

import { Diagram, Cluster } from "../../../src";
import { Python, JavaScript, TypeScript, Java } from "../../../src/programming/language";
import { FastAPI, React, Spring } from "../../../src/programming/framework";
import { Kafka } from "../../../src/onprem/queue";
import { MongoDB, PostgreSQL } from "../../../src/onprem/database";

async function createEventDrivenDiagram() {
  const diagram = new Diagram({
    name: "Event-Driven Architecture",
    filename: "programming_event_driven",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // Frontend
    const frontendCluster = new Cluster({ label: "Frontend" });
    await frontendCluster.use(async () => {
      const ui = new React("user-interface");
      const ts = new TypeScript("typescript");
      ui.to(ts);
    });

    // API Layer
    const apiCluster = new Cluster({ label: "API Layer" });
    await apiCluster.use(async () => {
      const commandApi = new FastAPI("command-api");
      const queryApi = new FastAPI("query-api");

      commandApi.to(queryApi);
    });

    // Event Bus
    const eventBusCluster = new Cluster({ label: "Event Bus" });
    await eventBusCluster.use(async () => {
      const eventStream = new Kafka("event-stream");
    });

    // Event Processors
    const processorsCluster = new Cluster({ label: "Event Processors" });
    await processorsCluster.use(async () => {
      const inventoryProcessor = new Java("inventory-processor");
      const orderProcessor = new Python("order-processor");
      const notificationProcessor = new JavaScript("notification-processor");

      inventoryProcessor.to(orderProcessor);
      orderProcessor.to(notificationProcessor);
    });

    // Data Stores
    const storeCluster = new Cluster({ label: "Data Stores" });
    await storeCluster.use(async () => {
      const eventStore = new PostgreSQL("event-store");
      const readModel = new MongoDB("read-model");

      eventStore.to(readModel);
    });
  });

  console.log("Event-Driven Architecture diagram created!");
  console.log("Output: programming_event_driven.png");
}

createEventDrivenDiagram().catch(console.error);
