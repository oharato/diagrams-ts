/**
 * Example: Multi-Cloud Architecture
 * 
 * This example demonstrates how to create a multi-cloud architecture
 * diagram using AWS, GCP, Azure, and Kubernetes providers.
 */

import { Diagram, Cluster } from '../src';
import { EC2, Lambda } from '../src/aws/compute';
import { GCE, GKE, CloudRun } from '../src/gcp/compute';
import { VM, AKS } from '../src/azure/compute';
import { Pod, Deployment } from '../src/k8s/compute';

async function createMultiCloudDiagram() {
  const diagram = new Diagram({
    name: 'Multi-Cloud Architecture',
    filename: 'multi_cloud',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    // AWS Cluster
    const awsCluster = new Cluster({ label: 'AWS Cloud' });
    await awsCluster.use(async () => {
      const ec2 = new EC2('web-server');
      const lambda = new Lambda('api-handler');
      
      // Connect AWS nodes
      ec2.to(lambda);
    });

    // GCP Cluster
    const gcpCluster = new Cluster({ label: 'Google Cloud' });
    await gcpCluster.use(async () => {
      const gce = new GCE('compute-instance');
      const cloudRun = new CloudRun('microservice');
      const gke = new GKE('k8s-cluster');
      
      // Connect GCP nodes
      gce.to(cloudRun);
      cloudRun.to(gke);
    });

    // Azure Cluster
    const azureCluster = new Cluster({ label: 'Azure Cloud' });
    await azureCluster.use(async () => {
      const vm = new VM('virtual-machine');
      const aks = new AKS('kubernetes-cluster');
      
      // Connect Azure nodes
      vm.to(aks);
    });

    // Kubernetes Cluster
    const k8sCluster = new Cluster({ label: 'Kubernetes Workloads' });
    await k8sCluster.use(async () => {
      const deployment = new Deployment('app-deployment');
      const pod = new Pod('app-pod');
      
      // Connect K8s nodes
      deployment.to(pod);
    });
  });

  console.log('Multi-cloud diagram created successfully!');
  console.log('Output: multi_cloud.png');
}

// Run the example
createMultiCloudDiagram().catch(console.error);
