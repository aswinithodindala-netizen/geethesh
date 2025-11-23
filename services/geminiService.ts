import { GoogleGenAI, Type } from "@google/genai";
import { ChartDataSchema } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTextResponse = async (
  prompt: string,
  systemInstruction?: string,
  imagePart?: { data: string; mimeType: string },
  isFinancial: boolean = false
) => {
  try {
    const model = isFinancial ? 'gemini-2.5-flash' : 'gemini-3-pro-preview';
    
    const parts: any[] = [];
    if (imagePart) {
      parts.push({
        inlineData: {
          data: imagePart.data,
          mimeType: imagePart.mimeType
        }
      });
    }
    parts.push({ text: prompt });

    const config: any = {
      systemInstruction,
    };

    // If financial, try to get structured data for charts + text
    if (isFinancial) {
      config.responseMimeType = "application/json";
      config.responseSchema = ChartDataSchema;
    }

    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Text Generation Error:", error);
    throw error;
  }
};

export const generateImage = async (prompt: string, aspectRatio: string = "1:1") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any, 
          // imageSize not supported for flash-image, only pro-image-preview
        }
      }
    });
    
    // Extract image
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
      // If the model refuses and returns text instead (e.g., safety), throw that as an error
      if (part.text) {
        throw new Error(part.text);
      }
    }
    throw new Error("No image data found in response. The model may have refused the request.");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};

export const generateMusic = async (prompt: string) => {
  try {
    // Use TTS model as native-audio is not supported for generateContent in this context
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: { parts: [{ text: prompt }] },
      config: {
        responseModalities: ['AUDIO' as any],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      }
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (part?.inlineData) {
      return {
        data: part.inlineData.data, // Base64 string
        mimeType: part.inlineData.mimeType || 'audio/pcm' // Likely audio/pcm
      };
    }
    throw new Error("No audio generated.");
  } catch (error) {
    console.error("Gemini Music Generation Error:", error);
    throw error;
  }
};

export const findYoutubeVideo = async (query: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: `Find the official YouTube video URL for the song "${query}". Return only the YouTube URL in your response. Do not include any other text.` }] },
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || "";
    
    // Regex to extract video ID from various YouTube URL formats
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    
    // Check main text
    let match = text.match(regExp);
    if (match && match[7].length === 11) {
        return match[7];
    }
    
    // Check for URL in text if not at start
    const urlMatch = text.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s<>"']+/);
    if (urlMatch) {
         match = urlMatch[0].match(regExp);
         if (match && match[7].length === 11) return match[7];
    }

    // Check grounding metadata chunks for source URIs
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      for (const chunk of chunks) {
        if (chunk.web?.uri) {
           match = chunk.web.uri.match(regExp);
           if (match && match[7].length === 11) return match[7];
        }
      }
    }

    return null;
  } catch (error) {
    console.error("YouTube Search Error:", error);
    return null;
  }
};

export const getLiveClient = () => {
  return ai.live;
};