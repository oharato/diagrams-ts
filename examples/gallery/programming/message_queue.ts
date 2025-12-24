/**
 * Programming Example: Microservices with Message Queue
 * 
 * A microservices architecture using message queues for async communication
 * between services written in various languages.
 */

import { Diagram, Cluster } from '../../../src';
import { Python, Go, JavaScript } from '../../../src/programming/language';
import { Django, Flask } from '../../../src/programming/framework';
import { RabbitMQ, Kafka } from '../../../src/onprem/queue';
import { MongoDB } from '../../../src/onprem/database';

async function createMessageQueueDiagram() {
  const diagram = new Diagram({
    name: 'Microservices with Message Queue',
    filename: 'programming_message_queue',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    // Message Brokers
    const messagingCluster = new Cluster({ label: 'Message Brokers' });
    await messagingCluster.use(async () => {
      const rabbitmq = new RabbitMQ('task-queue');
      const kafka = new Kafka('event-stream');
      
      rabbitmq.to(kafka);
    });

    // Producer Services
    const producerCluster = new Cluster({ label: 'Producers' });
    await producerCluster.use(async () => {
      const webService = new Django('web-service');
      const apiService = new Flask('api-service');
      
      webService.to(apiService);
    });

    // Consumer Services
    const consumerCluster = new Cluster({ label: 'Consumers' });
    await consumerCluster.use(async () => {
      const emailWorker = new Python('email-worker');
      const notificationWorker = new Go('notification-worker');
      const analyticsWorker = new JavaScript('analytics-worker');
      
      emailWorker.to(notificationWorker);
      notificationWorker.to(analyticsWorker);
    });

    // Cache Layer
    const cacheCluster = new Cluster({ label: 'Storage' });
    await cacheCluster.use(async () => {
      const storage = new MongoDB('shared-storage');
    });
  });

  console.log('Microservices with Message Queue diagram created!');
  console.log('Output: programming_message_queue.png');
}

createMessageQueueDiagram().catch(console.error);
