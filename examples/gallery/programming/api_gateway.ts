/**
 * Programming Example: API Gateway Pattern
 * 
 * An API Gateway pattern with multiple backend services written in different
 * programming languages.
 */

import { Diagram, Cluster } from '../../../src';
import { Python, Go, Java, JavaScript } from '../../../src/programming/language';
import { FastAPI, Spring } from '../../../src/programming/framework';
import { PostgreSQL, MongoDB } from '../../../src/onprem/database';

async function createAPIGatewayDiagram() {
  const diagram = new Diagram({
    name: 'API Gateway Pattern',
    filename: 'programming_api_gateway',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    // API Gateway
    const gatewayCluster = new Cluster({ label: 'API Gateway' });
    await gatewayCluster.use(async () => {
      const gateway = new JavaScript('gateway-service');
    });

    // Microservices
    const servicesCluster = new Cluster({ label: 'Microservices' });
    await servicesCluster.use(async () => {
      // User Service (Python + FastAPI)
      const userServiceCluster = new Cluster({ label: 'User Service' });
      await userServiceCluster.use(async () => {
        const python = new Python('user-api');
        const fastapi = new FastAPI('fastapi');
        python.to(fastapi);
      });

      // Order Service (Java + Spring)
      const orderServiceCluster = new Cluster({ label: 'Order Service' });
      await orderServiceCluster.use(async () => {
        const java = new Java('order-api');
        const spring = new Spring('spring-boot');
        java.to(spring);
      });

      // Product Service (Go)
      const productServiceCluster = new Cluster({ label: 'Product Service' });
      await productServiceCluster.use(async () => {
        const go = new Go('product-api');
      });
    });

    // Databases
    const dbCluster = new Cluster({ label: 'Databases' });
    await dbCluster.use(async () => {
      const postgres = new PostgreSQL('users-db');
      const mongo = new MongoDB('products-db');
      
      postgres.to(mongo);
    });
  });

  console.log('API Gateway Pattern diagram created!');
  console.log('Output: programming_api_gateway.png');
}

createAPIGatewayDiagram().catch(console.error);
