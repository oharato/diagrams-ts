/**
 * AWS Compute services
 * This module is a TypeScript port of the Python compute module.
 */

import { AWSNode } from "./base";

class ComputeNode extends AWSNode {
  protected static type = "compute";
  protected static iconDir = "resources/aws/compute";
}

export class AppRunner extends ComputeNode {
  protected static icon = "app-runner.png";
}

export class ApplicationAutoScaling extends ComputeNode {
  protected static icon = "application-auto-scaling.png";
}

export class Batch extends ComputeNode {
  protected static icon = "batch.png";
}

export class ComputeOptimizer extends ComputeNode {
  protected static icon = "compute-optimizer.png";
}

export class Compute extends ComputeNode {
  protected static icon = "compute.png";
}

export class EC2Ami extends ComputeNode {
  protected static icon = "ec2-ami.png";
}

export class EC2AutoScaling extends ComputeNode {
  protected static icon = "ec2-auto-scaling.png";
}

export class EC2ContainerRegistryImage extends ComputeNode {
  protected static icon = "ec2-container-registry-image.png";
}

export class EC2ContainerRegistryRegistry extends ComputeNode {
  protected static icon = "ec2-container-registry-registry.png";
}

export class EC2ContainerRegistry extends ComputeNode {
  protected static icon = "ec2-container-registry.png";
}

export class EC2ElasticIpAddress extends ComputeNode {
  protected static icon = "ec2-elastic-ip-address.png";
}

export class EC2ImageBuilder extends ComputeNode {
  protected static icon = "ec2-image-builder.png";
}

export class EC2Instance extends ComputeNode {
  protected static icon = "ec2-instance.png";
}

export class EC2Instances extends ComputeNode {
  protected static icon = "ec2-instances.png";
}

export class EC2Rescue extends ComputeNode {
  protected static icon = "ec2-rescue.png";
}

export class EC2SpotInstance extends ComputeNode {
  protected static icon = "ec2-spot-instance.png";
}

export class EC2 extends ComputeNode {
  protected static icon = "ec2.png";
}

export class ElasticBeanstalkApplication extends ComputeNode {
  protected static icon = "elastic-beanstalk-application.png";
}

export class ElasticBeanstalkDeployment extends ComputeNode {
  protected static icon = "elastic-beanstalk-deployment.png";
}

export class ElasticBeanstalk extends ComputeNode {
  protected static icon = "elastic-beanstalk.png";
}

export class ElasticContainerServiceContainer extends ComputeNode {
  protected static icon = "elastic-container-service-container.png";
}

export class ElasticContainerServiceServiceConnect extends ComputeNode {
  protected static icon = "elastic-container-service-service-connect.png";
}

export class ElasticContainerServiceService extends ComputeNode {
  protected static icon = "elastic-container-service-service.png";
}

export class ElasticContainerServiceTask extends ComputeNode {
  protected static icon = "elastic-container-service-task.png";
}

export class ElasticContainerService extends ComputeNode {
  protected static icon = "elastic-container-service.png";
}

export class ElasticKubernetesService extends ComputeNode {
  protected static icon = "elastic-kubernetes-service.png";
}

export class Fargate extends ComputeNode {
  protected static icon = "fargate.png";
}

export class LambdaFunction extends ComputeNode {
  protected static icon = "lambda-function.png";
}

export class Lambda extends ComputeNode {
  protected static icon = "lambda.png";
}

export class Lightsail extends ComputeNode {
  protected static icon = "lightsail.png";
}

export class LocalZones extends ComputeNode {
  protected static icon = "local-zones.png";
}

export class Outposts extends ComputeNode {
  protected static icon = "outposts.png";
}

export class ServerlessApplicationRepository extends ComputeNode {
  protected static icon = "serverless-application-repository.png";
}

export class ThinkboxDeadline extends ComputeNode {
  protected static icon = "thinkbox-deadline.png";
}

export class ThinkboxDraft extends ComputeNode {
  protected static icon = "thinkbox-draft.png";
}

export class ThinkboxFrost extends ComputeNode {
  protected static icon = "thinkbox-frost.png";
}

export class ThinkboxKrakatoa extends ComputeNode {
  protected static icon = "thinkbox-krakatoa.png";
}

export class ThinkboxSequoia extends ComputeNode {
  protected static icon = "thinkbox-sequoia.png";
}

export class ThinkboxStoke extends ComputeNode {
  protected static icon = "thinkbox-stoke.png";
}

export class ThinkboxXmesh extends ComputeNode {
  protected static icon = "thinkbox-xmesh.png";
}

export class VmwareCloudOnAWS extends ComputeNode {
  protected static icon = "vmware-cloud-on-aws.png";
}

export class Wavelength extends ComputeNode {
  protected static icon = "wavelength.png";
}

// Aliases
export const AutoScaling = ApplicationAutoScaling;
export const AMI = EC2Ami;
export const ECR = EC2ContainerRegistry;
export const EB = ElasticBeanstalk;
export const ECS = ElasticContainerService;
export const EKS = ElasticKubernetesService;
export const SAR = ServerlessApplicationRepository;
