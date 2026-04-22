import { GoogleGenAI } from "@google/genai";
import { Passage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generatePassage = async (topic: string = "general"): Promise<Passage> => {
  const prompt = `Actúa como un experto en la prueba PAES de Competencia Lectora (Chile, DEMRE).
  Genera un texto y 3 preguntas de opción múltiple (4 opciones cada una) sobre el siguiente tema: ${topic}.
  
  El texto debe ser de nivel educacional medio-superior chileno.
  Incluye una pregunta de cada una de las siguientes competencias:
  1. Localizar: Extraer información explícita.
  2. Interpretar: Inferir sentido, sintetizar.
  3. Evaluar: Reflexionar sobre la forma o contenido.

  Responde ÚNICAMENTE en formato JSON plano con la siguiente estructura:
  {
    "id": "uuid",
    "title": "Título del texto",
    "content": "Contenido del texto (en formato Markdown)",
    "type": "No Literario",
    "questions": [
      {
        "id": "q1",
        "text": "Pregunta...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0,
        "explanation": "Explicación detallada de por qué es la correcta basándose en el texto.",
        "competency": "Localizar"
      }
    ]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text from Gemini");
    
    return JSON.parse(text.trim()) as Passage;
  } catch (error) {
    console.error("Error generating passage:", error);
    return {
      id: "fallback",
      title: "Error de Conexión",
      content: "No se pudo generar el texto en este momento. Por favor verifica tu API Key o conexión a internet.",
      type: "No Literario",
      questions: []
    };
  }
};
