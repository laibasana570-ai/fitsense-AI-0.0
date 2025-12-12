
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, WorkoutPlanRequest } from "../types";

// Using Gemini 2.5 Flash for speed and reliable multimodal JSON output
const MODEL_NAME = "gemini-2.5-flash";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeWorkoutVideo = async (
  base64Data: string, 
  mimeType: string,
  language: string = 'en'
): Promise<AnalysisResult> => {
  const ai = getClient();

  const prompt = `
    Analyze this workout video/image. 
    Identify the exercise being performed.
    Count the number of completed repetitions (if video) or estimate form (if image).
    Evaluate the user's posture and form on a scale of 1-10.
    Provide specific, constructive feedback on their form.
    Provide 1-2 suggestions for improvement.
    
    IMPORTANT: Provide all text output (feedback and suggestions) in ${language} language.
    Return ONLY raw JSON without any markdown formatting or code blocks.
  `;

  // Schema for structured output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      exerciseName: { type: Type.STRING },
      repCount: { type: Type.INTEGER },
      formScore: { type: Type.INTEGER, description: "Score from 1 to 10" },
      feedback: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      suggestions: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
    required: ["exerciseName", "repCount", "formScore", "feedback", "suggestions"]
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2 // Lower temperature for more analytical/precise results
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    // Robust JSON extraction using regex to find the first outer object
    // This handles cases where the model might add preamble text even with JSON mode
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;

    try {
        return JSON.parse(jsonString) as AnalysisResult;
    } catch (parseError) {
        console.error("JSON Parse Error. Raw Text:", text);
        throw new Error("Failed to parse AI response. Please try again.");
    }
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    // Provide a more user-friendly error message for common issues
    if (error.message?.includes('413')) {
        throw new Error("File is too large for the API. Please try a smaller video.");
    }
    throw error;
  }
};

export const generatePersonalizedPlan = async (request: WorkoutPlanRequest, language: string = 'en'): Promise<string> => {
  const ai = getClient();
  
  const prompt = `
    Create a personalized weekly workout plan for a user with the following details:
    - Age: ${request.age || 'Not specified'}
    - Goal: ${request.goal}
    - Fitness Level: ${request.level}
    - Focus Area: ${request.focusArea || 'Full Body / Balanced'}
    - Available Time: ${request.daysPerWeek} days per week, ${request.durationMinutes} minutes per session
    - Equipment: ${request.equipment}
    - Injuries or Limitations: ${request.limitations || 'None'}

    Format the response in clean, readable Markdown. 
    Include:
    1. A summary of the plan logic (why this plan fits the goal/age/limitations).
    2. A day-by-day breakdown (e.g., Day 1, Day 2...).
    3. Warm-up and Cool-down recommendations.
    4. Safety tips specific to the user's age or limitations if any.
    
    Keep the tone encouraging and professional.
    IMPORTANT: Write the entire response in ${language} language.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME, // Using 2.5 Flash for text generation as well for consistency
      contents: prompt,
      config: {
        temperature: 0.7 
      }
    });

    return response.text || "Failed to generate plan.";
  } catch (error) {
    console.error("Gemini Planning Error:", error);
    throw error;
  }
};
