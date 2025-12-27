/**
 * Example: System Architecture
 *
 * This example demonstrates a complex system architecture diagram
 * based on the user provided image.
 */

import { Diagram, Cluster, Node, Edge } from "../src";
import { GKE, CloudRun } from "../src/gcp/compute";
import { SQL, Memorystore } from "../src/gcp/database";
import { VertexAI } from "../src/gcp/ml";
import { Scheduler } from "../src/gcp/devtools";
import { Monitoring } from "../src/gcp/operations";

// Custom Node for generic components or missing icons
class CustomNode extends Node {
  protected static iconDir = "resources/generic";
  protected static icon = "blank.png"; // Fallback or use a specific one if available
}

// Using Programming nodes for Agents as they are logical components
class Agent extends Node {
  protected static provider = "programming";
  protected static type = "flowchart"; // Using flowchart style if available, or just generic
  protected static iconDir = "resources/programming/flowchart"; // Hypothetical
  // Fallback to using existing nodes with custom labels
}

// Since we don't have a "User" node in GCP, we can use a generic one or just a label
// Let's use a simple node for User Input/Output
class User extends Node {
  protected static provider = "generic";
  protected static type = "user";
  protected static iconDir = "resources/generic/user"; // Hypothetical
}

async function createSystemArchitecture() {
  const diagram = new Diagram({
    name: "System Architecture",
    filename: "system_architecture",
    show: false,
    outformat: "png",
    direction: "LR", // Changed to Left-to-Right for better flow
  });

  await diagram.use(async () => {
    // Define User nodes first to place them on the left
    const request = new Node("ユーザー入力\nRequest");
    const response = new Node("ユーザー出力\nResponse");

    let router: Node;
    let finalAgent: Node;

    // Main Cluster: Google Cloud
    const gcp = new Cluster({ label: "Google Cloud", graph_attr: { bgcolor: "#F8F9FA" } });
    await gcp.use(async () => {

      // Define clusters in logical order (Top/Left -> Bottom/Right)
      
      // 1. Data Ingestion (Top Left)
      const dataIngestion = new Cluster({ label: "Data Ingestion", graph_attr: { bgcolor: "#FCE4EC" } });
      let scheduler: Node;
      let runJobs: Node;
      await dataIngestion.use(async () => {
        scheduler = new Scheduler("Cloud\nScheduler");
        runJobs = new CloudRun("Cloud Run\nJobs");
      });

      // 2. GKE Cluster (Bottom Left / Below Ingestion)
      const gkeCluster = new Cluster({ label: "Google Kubernetes Engine", graph_attr: { bgcolor: "#E8F5E9" } });
      let pythonExecutor: Node;
      let monitoring: Node;
      await gkeCluster.use(async () => {
        pythonExecutor = new GKE("Python Executor\n外部実行コンテナ");
        monitoring = new Monitoring("Monitoring\nLangfuse / Observability");
      });

      // 3. Cloud Run - Agent Runtime Cluster (Center)
      const agentRuntime = new Cluster({ label: "Cloud Run - Agent Runtime", graph_attr: { bgcolor: "#E3F2FD" } });
      let delegator: Node;
      let marketAgent: Node;
      let portfolioAgent: Node;
      let educationAgent: Node;
      let immediateTool: Node;
      let progressAgent: Node;

      await agentRuntime.use(async () => {
        router = new CloudRun("ルーター");
        
        // Specialized Agents Cluster
        const specializedAgents = new Cluster({ label: "Specialized Agents", graph_attr: { bgcolor: "#FFFFFF" } });
        await specializedAgents.use(async () => {
          marketAgent = new CloudRun("市場分析\nエージェント");
          portfolioAgent = new CloudRun("ポートフォリオ\nエージェント");
          educationAgent = new CloudRun("教育 / CS\nエージェント");
        });

        delegator = new CloudRun("Delegator\n司令塔エージェント");
        immediateTool = new CloudRun("即時回答ツール");
        progressAgent = new CloudRun("Progress Agent\n進捗・実況");
        finalAgent = new CloudRun("Final Answer Agent\n回答制御・\n安全性チェック");

        // Connections within Agent Runtime
        router.connect(delegator, new Edge({ xlabel: "複雑な相談", forward: true }));
        router.connect(immediateTool, new Edge({ xlabel: "単純な質問", forward: true }));
        delegator.connect(marketAgent, new Edge({ forward: true }));
        delegator.connect(portfolioAgent, new Edge({ forward: true }));
        delegator.connect(educationAgent, new Edge({ forward: true }));
        delegator.connect(progressAgent, new Edge({ forward: true }));
        marketAgent.connect(finalAgent, new Edge({ forward: true }));
        portfolioAgent.connect(finalAgent, new Edge({ forward: true }));
        educationAgent.connect(finalAgent, new Edge({ forward: true }));
        immediateTool.connect(finalAgent, new Edge({ forward: true }));
        progressAgent.connect(finalAgent, new Edge({ forward: true }));
      });

      // 4. Data Layer Cluster (Right / Bottom)
      const dataLayer = new Cluster({ label: "Data Layer", graph_attr: { bgcolor: "#F3E5F5" } });
      let sql: Node;
      let vertexAi: Node;
      let memoryStore: Node;
      await dataLayer.use(async () => {
        sql = new SQL("Cloud SQL\nユーザー情報 / 履歴");
        vertexAi = new VertexAI("Vertex AI\nニュース / ナレッジ");
        memoryStore = new Memorystore("Memorystore\nデータ保存");
      });

      // 5. Gemini | Vertex AI (Center / Bottom)
      const gemini = new VertexAI("Gemini | Vertex AI\n推論・生成・安全制御");

      // --- Inter-Cluster Connections ---
      scheduler.connect(runJobs, new Edge({ forward: true }));
      runJobs.connect(pythonExecutor, new Edge({ style: "dotted", forward: true }));
      runJobs.connect(sql, new Edge({ forward: true }));
      pythonExecutor.connect(monitoring, new Edge({ forward: true }));
      marketAgent.connect(vertexAi, new Edge({ style: "dotted", forward: true }));
      portfolioAgent.connect(vertexAi, new Edge({ style: "dotted", forward: true }));
      educationAgent.connect(vertexAi, new Edge({ style: "dotted", forward: true }));
      marketAgent.connect(sql, new Edge({ style: "dotted", forward: true }));
      finalAgent.connect(gemini, new Edge({ style: "dotted", forward: true }));
      gemini.connect(finalAgent, new Edge({ style: "dotted", forward: true }));
      progressAgent.connect(gemini, new Edge({ style: "dotted", forward: true }));
      delegator.connect(gemini, new Edge({ style: "dotted", forward: true }));

      // Invisible edges to enforce layout
      // Align Request with Router
      // request.connect(router, new Edge({ style: "invis" }));
    });

    // Connect Request -> Router
    request.connect(router!, new Edge({ forward: true }));

    // Connect Final Answer Agent -> Response
    finalAgent!.connect(response, new Edge({ xlabel: "安全な回答を送信", forward: true }));
  });
}

createSystemArchitecture().catch(console.error);
