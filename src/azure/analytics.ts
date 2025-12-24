/**
 * Azure Analytics services
 */

import { AzureNode } from './index';

class AnalyticsNode extends AzureNode {
  protected static type = 'analytics';
  protected static iconDir = 'resources/azure/analytics';
}

export class AnalysisServices extends AnalyticsNode {
  protected static icon = 'analysis-services.png';
}

export class AzureDatabricks extends AnalyticsNode {
  protected static icon = 'azure-databricks.png';
}

export class AzureSynapseAnalytics extends AnalyticsNode {
  protected static icon = 'azure-synapse-analytics.png';
}

export class DataFactories extends AnalyticsNode {
  protected static icon = 'data-factories.png';
}

export class DataLakeAnalytics extends AnalyticsNode {
  protected static icon = 'data-lake-analytics.png';
}

export class EventHubs extends AnalyticsNode {
  protected static icon = 'event-hubs.png';
}

export class HDInsightClusters extends AnalyticsNode {
  protected static icon = 'hdinsight-clusters.png';
}

export class LogAnalyticsWorkspaces extends AnalyticsNode {
  protected static icon = 'log-analytics-workspaces.png';
}

export class StreamAnalyticsJobs extends AnalyticsNode {
  protected static icon = 'stream-analytics-jobs.png';
}

// Aliases
export const Databricks = AzureDatabricks;
export const Synapse = AzureSynapseAnalytics;
