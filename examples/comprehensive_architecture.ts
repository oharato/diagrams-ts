/**
 * Example: Comprehensive Multi-Provider Architecture
 *
 * This example demonstrates the usage of all supported providers:
 * - AWS (compute, database, storage, network, security)
 * - GCP (compute, database, storage, network, security)
 * - Azure (compute, database, storage, network, security)
 * - Kubernetes (compute/workloads)
 * - Programming (languages and frameworks)
 * - OnPrem (database, network, compute)
 */

import { Diagram, Cluster } from "../src";

// AWS imports
import { EC2, Lambda } from "../src/aws/compute";
import { RDS, Dynamodb } from "../src/aws/database";
import { S3 } from "../src/aws/storage";
import { VPC, ELB } from "../src/aws/network";
import { IAM } from "../src/aws/security";

// GCP imports
import { GCE, GKE } from "../src/gcp/compute";
import { Bigtable, SQL } from "../src/gcp/database";
import { GCS } from "../src/gcp/storage";
import { VPC as GCPVPC, LoadBalancing } from "../src/gcp/network";
import { KMS as GCPKMS } from "../src/gcp/security";

// Azure imports
import { VM, AKS } from "../src/azure/compute";
import { CosmosDb } from "../src/azure/database";
import { BlobStorage } from "../src/azure/storage";
import { VirtualNetworks, LoadBalancers } from "../src/azure/network";
import { KeyVaults } from "../src/azure/security";

// Kubernetes imports
import { Pod, Deployment } from "../src/k8s/compute";

// Programming imports
import { Python, JavaScript } from "../src/programming/language";
import { Django, React } from "../src/programming/framework";

// OnPrem imports
import { PostgreSQL } from "../src/onprem/database";
import { Nginx } from "../src/onprem/network";
import { Server } from "../src/onprem/compute";

async function createComprehensiveDiagram() {
  const diagram = new Diagram({
    name: "Comprehensive Multi-Provider Architecture",
    filename: "comprehensive_architecture",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // AWS Infrastructure
    const awsCluster = new Cluster({ label: "AWS Infrastructure" });
    await awsCluster.use(async () => {
      const awsVpc = new VPC("aws-vpc");
      const awsElb = new ELB("load-balancer");
      const awsEc2 = new EC2("web-server");
      const awsLambda = new Lambda("api-function");
      const awsRds = new RDS("postgres-db");
      const awsDynamodb = new Dynamodb("sessions-table");
      const awsS3 = new S3("static-assets");
      const awsIam = new IAM("access-control");

      awsElb.to(awsEc2);
      awsEc2.to(awsLambda);
      awsLambda.to(awsRds);
      awsLambda.to(awsDynamodb);
      awsEc2.to(awsS3);
    });

    // GCP Infrastructure
    const gcpCluster = new Cluster({ label: "GCP Infrastructure" });
    await gcpCluster.use(async () => {
      const gcpVpc = new GCPVPC("gcp-network");
      const gcpLb = new LoadBalancing("load-balancer");
      const gcpGce = new GCE("compute-instance");
      const gcpGke = new GKE("k8s-cluster");
      const gcpBigtable = new Bigtable("nosql-db");
      const gcpSql = new SQL("cloud-sql");
      const gcpGcs = new GCS("object-storage");
      const gcpKms = new GCPKMS("encryption-keys");

      gcpLb.to(gcpGce);
      gcpGce.to(gcpGke);
      gcpGke.to(gcpBigtable);
      gcpGke.to(gcpSql);
      gcpGce.to(gcpGcs);
    });

    // Azure Infrastructure
    const azureCluster = new Cluster({ label: "Azure Infrastructure" });
    await azureCluster.use(async () => {
      const azureVnet = new VirtualNetworks("virtual-network");
      const azureLb = new LoadBalancers("load-balancer");
      const azureVm = new VM("virtual-machine");
      const azureAks = new AKS("kubernetes-service");
      const azureCosmosDb = new CosmosDb("cosmos-db");
      const azureBlob = new BlobStorage("blob-storage");
      const azureKv = new KeyVaults("key-vault");

      azureLb.to(azureVm);
      azureVm.to(azureAks);
      azureAks.to(azureCosmosDb);
      azureVm.to(azureBlob);
    });

    // Kubernetes Workloads
    const k8sCluster = new Cluster({ label: "Kubernetes Applications" });
    await k8sCluster.use(async () => {
      const deployment = new Deployment("app-deployment");
      const pod1 = new Pod("app-pod-1");
      const pod2 = new Pod("app-pod-2");

      deployment.to(pod1);
      deployment.to(pod2);
    });

    // Application Stack
    const appCluster = new Cluster({ label: "Application Stack" });
    await appCluster.use(async () => {
      const python = new Python("backend-app");
      const django = new Django("django-api");
      const javascript = new JavaScript("frontend-app");
      const react = new React("react-ui");

      python.to(django);
      javascript.to(react);
      react.to(django);
    });

    // On-Premise Infrastructure
    const onpremCluster = new Cluster({ label: "On-Premise Infrastructure" });
    await onpremCluster.use(async () => {
      const nginx = new Nginx("web-proxy");
      const server = new Server("app-server");
      const postgres = new PostgreSQL("legacy-db");

      nginx.to(server);
      server.to(postgres);
    });
  });

  console.log("Comprehensive architecture diagram created successfully!");
  console.log("Output: comprehensive_architecture.png");
  console.log("");
  console.log("This diagram includes:");
  console.log("- AWS: Compute, Database, Storage, Network, Security");
  console.log("- GCP: Compute, Database, Storage, Network, Security");
  console.log("- Azure: Compute, Database, Storage, Network, Security");
  console.log("- Kubernetes: Deployments and Pods");
  console.log("- Programming: Languages and Frameworks");
  console.log("- On-Premise: Database, Network, Compute");
}

// Run the example
createComprehensiveDiagram().catch(console.error);
