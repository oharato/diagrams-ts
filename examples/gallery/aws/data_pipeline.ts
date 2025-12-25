/**
 * AWS Example: Data Pipeline
 *
 * A data processing pipeline using Kinesis, Lambda, S3, Athena, and QuickSight
 * for real-time data ingestion and analytics.
 */

import { Diagram, Cluster } from "../../../src";
import { Lambda } from "../../../src/aws/compute";
import { S3 } from "../../../src/aws/storage";
import { Kinesis, Athena, QuickSight, Glue } from "../../../src/aws/analytics";

async function createDataPipelineDiagram() {
  const diagram = new Diagram({
    name: "Data Pipeline Architecture",
    filename: "aws_data_pipeline",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // Data Ingestion
    const ingestionCluster = new Cluster({ label: "Data Ingestion" });
    await ingestionCluster.use(async () => {
      const stream = new Kinesis("data-stream");
      const processor = new Lambda("stream-processor");

      stream.to(processor);
    });

    // Data Storage
    const storageCluster = new Cluster({ label: "Data Lake" });
    await storageCluster.use(async () => {
      const rawData = new S3("raw-data");
      const processedData = new S3("processed-data");

      rawData.to(processedData);
    });

    // Data Processing
    const processingCluster = new Cluster({ label: "Data Processing" });
    await processingCluster.use(async () => {
      const etl = new Glue("etl-jobs");
      const catalog = new Glue("data-catalog");

      etl.to(catalog);
    });

    // Analytics
    const analyticsCluster = new Cluster({ label: "Analytics" });
    await analyticsCluster.use(async () => {
      const query = new Athena("query-engine");
      const viz = new QuickSight("dashboards");

      query.to(viz);
    });
  });

  console.log("AWS Data Pipeline diagram created!");
  console.log("Output: aws_data_pipeline.png");
}

createDataPipelineDiagram().catch(console.error);
