/**
 * AWS Example: ML Training Pipeline
 *
 * A machine learning training pipeline using SageMaker, S3, and Lambda
 * for model training and deployment.
 */

import { Diagram, Cluster } from "../../../src";
import { Lambda } from "../../../src/aws/compute";
import { S3 } from "../../../src/aws/storage";
import { Sagemaker } from "../../../src/aws/ml";
import { StepFunctions } from "../../../src/aws/integration";
import { ECR } from "../../../src/aws/compute";

async function createMLPipelineDiagram() {
  const diagram = new Diagram({
    name: "ML Training Pipeline",
    filename: "aws_ml_pipeline",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // Data Preparation
    const dataCluster = new Cluster({ label: "Data Preparation" });
    await dataCluster.use(async () => {
      const rawData = new S3("training-data");
      const preprocessing = new Lambda("data-preprocessing");
      const processedData = new S3("processed-data");

      rawData.to(preprocessing);
      preprocessing.to(processedData);
    });

    // Model Training
    const trainingCluster = new Cluster({ label: "Model Training" });
    await trainingCluster.use(async () => {
      const orchestrator = new StepFunctions("training-workflow");
      const training = new Sagemaker("training-job");
      const evaluation = new Lambda("model-evaluation");

      orchestrator.to(training);
      training.to(evaluation);
    });

    // Model Deployment
    const deploymentCluster = new Cluster({ label: "Model Deployment" });
    await deploymentCluster.use(async () => {
      const modelRegistry = new S3("model-artifacts");
      const containerRegistry = new ECR("model-images");
      const endpoint = new Sagemaker("inference-endpoint");

      modelRegistry.to(containerRegistry);
      containerRegistry.to(endpoint);
    });
  });

  console.log("AWS ML Training Pipeline diagram created!");
  console.log("Output: aws_ml_pipeline.png");
}

createMLPipelineDiagram().catch(console.error);
