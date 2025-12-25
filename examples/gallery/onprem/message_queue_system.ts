/**
 * On-Premises Example: Message Queue System
 *
 * A distributed message queue system with producers, brokers, and consumers
 * for asynchronous processing.
 */

import { Diagram, Cluster } from "../../../src";
import { Server } from "../../../src/onprem/compute";
import { PostgreSQL, MongoDB } from "../../../src/onprem/database";
import { Kafka, RabbitMQ } from "../../../src/onprem/queue";
import { Nginx } from "../../../src/onprem/network";

async function createMessageQueueSystemDiagram() {
  const diagram = new Diagram({
    name: "Message Queue System",
    filename: "onprem_message_queue_system",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // API Gateway
    const gateway = new Nginx("api-gateway");

    // Producer Services
    const producersCluster = new Cluster({ label: "Producer Services" });
    await producersCluster.use(async () => {
      const orderService = new Server("order-service");
      const inventoryService = new Server("inventory-service");
      const paymentService = new Server("payment-service");

      orderService.to(inventoryService);
      inventoryService.to(paymentService);
    });

    // Message Brokers
    const brokersCluster = new Cluster({ label: "Message Brokers" });
    await brokersCluster.use(async () => {
      // Kafka Cluster
      const kafkaCluster = new Cluster({ label: "Kafka Cluster" });
      await kafkaCluster.use(async () => {
        const kafka1 = new Kafka("kafka-broker-1");
        const kafka2 = new Kafka("kafka-broker-2");
        const kafka3 = new Kafka("kafka-broker-3");

        kafka1.to(kafka2);
        kafka2.to(kafka3);
      });

      // RabbitMQ Cluster
      const rabbitCluster = new Cluster({ label: "RabbitMQ Cluster" });
      await rabbitCluster.use(async () => {
        const rabbit1 = new RabbitMQ("rabbitmq-1");
        const rabbit2 = new RabbitMQ("rabbitmq-2");

        rabbit1.to(rabbit2);
      });
    });

    // Consumer Services
    const consumersCluster = new Cluster({ label: "Consumer Services" });
    await consumersCluster.use(async () => {
      const emailWorker = new Server("email-worker");
      const notificationWorker = new Server("notification-worker");
      const reportingWorker = new Server("reporting-worker");
      const analyticsWorker = new Server("analytics-worker");

      emailWorker.to(notificationWorker);
      notificationWorker.to(reportingWorker);
      reportingWorker.to(analyticsWorker);
    });

    // State Store
    const stateCluster = new Cluster({ label: "State Store" });
    await stateCluster.use(async () => {
      const postgres = new PostgreSQL("job-state-db");
      const cache = new MongoDB("task-cache");

      postgres.to(cache);
    });
  });

  console.log("Message Queue System diagram created!");
  console.log("Output: onprem_message_queue_system.png");
}

createMessageQueueSystemDiagram().catch(console.error);
