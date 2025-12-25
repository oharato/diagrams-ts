/**
 * AWS Analytics services
 */

import { AWSNode } from "./base";

class AnalyticsNode extends AWSNode {
  protected static type = "analytics";
  protected static iconDir = "resources/aws/analytics";
}

export class Analytics extends AnalyticsNode {
  protected static icon = "analytics.png";
}

export class Athena extends AnalyticsNode {
  protected static icon = "athena.png";
}

export class CloudsearchNode extends AnalyticsNode {
  protected static icon = "cloudsearch.png";
}

export class DataPipeline extends AnalyticsNode {
  protected static icon = "data-pipeline.png";
}

export class ElasticsearchService extends AnalyticsNode {
  protected static icon = "elasticsearch-service.png";
}

export class EMR extends AnalyticsNode {
  protected static icon = "emr.png";
}

export class Glue extends AnalyticsNode {
  protected static icon = "glue.png";
}

export class Kinesis extends AnalyticsNode {
  protected static icon = "kinesis.png";
}

export class KinesisDataAnalytics extends AnalyticsNode {
  protected static icon = "kinesis-data-analytics.png";
}

export class KinesisDataFirehose extends AnalyticsNode {
  protected static icon = "kinesis-data-firehose.png";
}

export class KinesisDataStreams extends AnalyticsNode {
  protected static icon = "kinesis-data-streams.png";
}

export class QuickSight extends AnalyticsNode {
  protected static icon = "quicksight.png";
}

// Aliases
export const Cloudsearch = CloudsearchNode;
export const ES = ElasticsearchService;
