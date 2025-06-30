import {
  GoogleGenAI,
  LiveServerMessage,
  MediaResolution,
  Modality,
} from '@google/genai';

// import mime from 'mime';

export const main = async ()=>{
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDkKAS9aoac6rQ5IdIXXlZlzFrGB8QbLzE",
  });

  const model = 'models/gemini-2.5-flash-preview-native-audio-dialog';

  const config = {
    responseModalities: [Modality.AUDIO],
    mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: {
          voiceName: 'Zephyr',
        }
      }
    },
    contextWindowCompression: {
      triggerTokens: '25600',
      slidingWindow: { targetTokens: '12800' },
    },
  };

  const session = await ai.live.connect({
    model,
    callbacks: {
      onopen: () => {
        console.debug('Opened');
      },
      onmessage: (message) => {
        console.log(message);
        
        // responseQueue.push(message);
      },
      onerror: (e) => {
        console.debug('Error:', e.message);
      },
      onclose: (e) => {
        console.debug('Close:', e.reason);
      },
    },
    config
  });

 return session
}

