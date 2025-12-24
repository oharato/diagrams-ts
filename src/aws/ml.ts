/**
 * AWS Machine Learning services
 */

import { AWSNode } from './index';

class MLNode extends AWSNode {
  protected static type = 'ml';
  protected static iconDir = 'resources/aws/ml';
}

export class Bedrock extends MLNode {
  protected static icon = 'bedrock.png';
}

export class Comprehend extends MLNode {
  protected static icon = 'comprehend.png';
}

export class DeepLearningContainers extends MLNode {
  protected static icon = 'deep-learning-containers.png';
}

export class Forecast extends MLNode {
  protected static icon = 'forecast.png';
}

export class Lex extends MLNode {
  protected static icon = 'lex.png';
}

export class Personalize extends MLNode {
  protected static icon = 'personalize.png';
}

export class Polly extends MLNode {
  protected static icon = 'polly.png';
}

export class Rekognition extends MLNode {
  protected static icon = 'rekognition.png';
}

export class SagemakerGroundTruth extends MLNode {
  protected static icon = 'sagemaker-ground-truth.png';
}

export class SagemakerModel extends MLNode {
  protected static icon = 'sagemaker-model.png';
}

export class SagemakerNotebook extends MLNode {
  protected static icon = 'sagemaker-notebook.png';
}

export class Sagemaker extends MLNode {
  protected static icon = 'sagemaker.png';
}

export class Textract extends MLNode {
  protected static icon = 'textract.png';
}

export class Transcribe extends MLNode {
  protected static icon = 'transcribe.png';
}

export class Translate extends MLNode {
  protected static icon = 'translate.png';
}

// Aliases
export const DLC = DeepLearningContainers;
