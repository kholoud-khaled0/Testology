import { GoogleGenerativeAI } from "@google/generative-ai";
import { Question } from "../types";

// Read API key from Vite environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY in .env or .env.local file");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

export const generateQuestions = async (
  topic: string
): Promise<Question[]> => {
  // Select model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // Prompt sent to Gemini
  const prompt = `
You are an expert Generative AI Certification Exam creator.

Generate 3 high-quality multiple-choice questions about:
"${topic}"

Rules:
- Each question must have exactly 4 options
- Only one option is correct
- Return JSON ONLY (no text, no markdown) in this exact format:

[
  {
    "id": "string",
    "text": "string",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "string"
  }
]
`;

  // Call Gemini
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Parse response
  const data = JSON.parse(text);

  // Ensure unique IDs on frontend
  return data.map((q: any, index: number) => ({
    ...q,
    id: `gen-${Date.now()}-${index}`,
  }));
};
