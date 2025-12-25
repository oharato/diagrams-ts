/**
 * GCP Analytics services
 */

import { GCPNode } from './base';

class AnalyticsNode extends GCPNode {
  protected static type = 'analytics';
  protected static iconDir = 'resources/gcp/analytics';
}

export class Bigquery extends AnalyticsNode {
  protected static icon = 'bigquery.png';
}

export class Composer extends AnalyticsNode {
  protected static icon = 'composer.png';
}

export class DataCatalog extends AnalyticsNode {
  protected static icon = 'data-catalog.png';
}

export class Dataflow extends AnalyticsNode {
  protected static icon = 'dataflow.png';
}

export class Dataproc extends AnalyticsNode {
  protected static icon = 'dataproc.png';
}

export class Pubsub extends AnalyticsNode {
  protected static icon = 'pubsub.png';
}

// Aliases
export const BigQuery = Bigquery;
export const PubSub = Pubsub;
