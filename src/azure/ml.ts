/**
 * Azure Machine Learning services
 */

import { AzureNode } from "./base";

class MLNode extends AzureNode {
  protected static type = "ml";
  protected static iconDir = "resources/azure/ml";
}

export class AzureOpenAI extends MLNode {
  protected static icon = "azure-open-ai.png";
}

export class BotServices extends MLNode {
  protected static icon = "bot-services.png";
}

export class CognitiveServices extends MLNode {
  protected static icon = "cognitive-services.png";
}

export class MachineLearningServiceWorkspaces extends MLNode {
  protected static icon = "machine-learning-service-workspaces.png";
}

// Aliases
export const OpenAI = AzureOpenAI;
export const MLWorkspaces = MachineLearningServiceWorkspaces;
