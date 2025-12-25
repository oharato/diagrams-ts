/**
 * Example: AWS Web Service Architecture
 *
 * This example demonstrates how to create a simple web service
 * architecture diagram using the TypeScript diagrams library.
 */

import { Diagram, Cluster } from "../src";
import { EC2, Lambda, ECS } from "../src/aws/compute";

async function createWebServiceDiagram() {
  const diagram = new Diagram({
    name: "Web Service Architecture",
    filename: "web_service",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // Create a web tier cluster
    const webTier = new Cluster({ label: "Web Tier" });
    await webTier.use(async () => {
      const web1 = new EC2("web1");
      const web2 = new EC2("web2");
      const web3 = new EC2("web3");
    });

    // Create an application tier cluster
    const appTier = new Cluster({ label: "Application Tier" });
    await appTier.use(async () => {
      const app1 = new Lambda("function1");
      const app2 = new Lambda("function2");
    });

    // Create a container tier cluster
    const containerTier = new Cluster({ label: "Container Tier" });
    await containerTier.use(async () => {
      const ecs1 = new ECS("service1");
      const ecs2 = new ECS("service2");
    });
  });

  console.log("Diagram created successfully!");
  console.log("Output: web_service.png");
}

// Run the example
createWebServiceDiagram().catch(console.error);
