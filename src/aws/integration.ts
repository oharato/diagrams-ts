/**
 * AWS Integration services
 */

import { AWSNode } from "./base";

class IntegrationNode extends AWSNode {
  protected static type = "integration";
  protected static iconDir = "resources/aws/integration";
}

export class ApplicationIntegration extends IntegrationNode {
  protected static icon = "application-integration.png";
}

export class Appsync extends IntegrationNode {
  protected static icon = "appsync.png";
}

export class Eventbridge extends IntegrationNode {
  protected static icon = "eventbridge.png";
}

export class MQ extends IntegrationNode {
  protected static icon = "mq.png";
}

export class SimpleNotificationServiceSns extends IntegrationNode {
  protected static icon = "simple-notification-service-sns.png";
}

export class SimpleQueueServiceSqs extends IntegrationNode {
  protected static icon = "simple-queue-service-sqs.png";
}

export class StepFunctions extends IntegrationNode {
  protected static icon = "step-functions.png";
}

// Aliases
export const SNS = SimpleNotificationServiceSns;
export const SQS = SimpleQueueServiceSqs;
export const SF = StepFunctions;
