/**
 * OnPrem Queue/Messaging services
 */

import { OnPremNode } from './index';

class QueueNode extends OnPremNode {
  protected static type = 'queue';
  protected static iconDir = 'resources/onprem/queue';
}

export class Activemq extends QueueNode {
  protected static icon = 'activemq.png';
}

export class Celery extends QueueNode {
  protected static icon = 'celery.png';
}

export class Kafka extends QueueNode {
  protected static icon = 'kafka.png';
}

export class Nats extends QueueNode {
  protected static icon = 'nats.png';
}

export class Rabbitmq extends QueueNode {
  protected static icon = 'rabbitmq.png';
}

export class Zeromq extends QueueNode {
  protected static icon = 'zeromq.png';
}

// Aliases
export const ActiveMQ = Activemq;
export const RabbitMQ = Rabbitmq;
export const ZeroMQ = Zeromq;
