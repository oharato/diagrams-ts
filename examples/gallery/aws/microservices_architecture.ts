/**
 * AWS Example: Microservices Architecture
 *
 * A microservices architecture with ECS, Application Load Balancer,
 * RDS, and ElastiCache for distributed services.
 */

import { Diagram, Cluster } from "../../../src";
import { ECS } from "../../../src/aws/compute";
import { RDS, ElastiCache } from "../../../src/aws/database";
import { ELB, Route53 } from "../../../src/aws/network";
import { SQS, SNS } from "../../../src/aws/integration";

async function createMicroservicesArchDiagram() {
  const diagram = new Diagram({
    name: "Microservices Architecture",
    filename: "aws_microservices_architecture",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    const dns = new Route53("domain");
    const lb = new ELB("load-balancer");

    dns.to(lb);

    // Microservices
    const servicesCluster = new Cluster({ label: "Microservices" });
    await servicesCluster.use(async () => {
      const authService = new ECS("auth-service");
      const userService = new ECS("user-service");
      const orderService = new ECS("order-service");
      const inventoryService = new ECS("inventory-service");

      lb.to(authService);
      lb.to(userService);
      lb.to(orderService);
      lb.to(inventoryService);
    });

    // Data Layer
    const dataCluster = new Cluster({ label: "Data Layer" });
    await dataCluster.use(async () => {
      const rds = new RDS("postgres-db");
      const cache = new ElastiCache("redis-cache");

      rds.to(cache);
    });

    // Messaging
    const messagingCluster = new Cluster({ label: "Messaging" });
    await messagingCluster.use(async () => {
      const queue = new SQS("order-queue");
      const topic = new SNS("notifications");

      queue.to(topic);
    });
  });

  console.log("AWS Microservices Architecture diagram created!");
  console.log("Output: aws_microservices_architecture.png");
}

createMicroservicesArchDiagram().catch(console.error);
