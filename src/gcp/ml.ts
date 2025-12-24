/**
 * GCP Machine Learning services
 */

import { GCPNode } from './index';

class MLNode extends GCPNode {
  protected static type = 'ml';
  protected static iconDir = 'resources/gcp/ml';
}

export class AIPlatform extends MLNode {
  protected static icon = 'ai-platform.png';
}

export class Automl extends MLNode {
  protected static icon = 'automl.png';
}

export class InferenceAPI extends MLNode {
  protected static icon = 'inference-api.png';
}

export class NaturalLanguageAPI extends MLNode {
  protected static icon = 'natural-language-api.png';
}

export class SpeechToText extends MLNode {
  protected static icon = 'speech-to-text.png';
}

export class TextToSpeech extends MLNode {
  protected static icon = 'text-to-speech.png';
}

export class TranslationAPI extends MLNode {
  protected static icon = 'translation-api.png';
}

export class VideoIntelligenceAPI extends MLNode {
  protected static icon = 'video-intelligence-api.png';
}

export class VisionAPI extends MLNode {
  protected static icon = 'vision-api.png';
}

// Aliases
export const AutoML = Automl;
export const NLAPI = NaturalLanguageAPI;
export const STT = SpeechToText;
export const TTS = TextToSpeech;
