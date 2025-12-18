
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectData, DocumentationResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSolarDocumentation(data: ProjectData): Promise<DocumentationResult> {
  const prompt = `
    Du är en expert inom svensk solkraftsteknik och tillståndshantering.
    Generera professionell dokumentation baserat på följande projektdata för en solcellspark:
    ${JSON.stringify(data, null, 2)}

    Du ska generera fyra specifika dokument:
    1. En formell projektbeskrivning lämplig för tillståndsansökan (t.ex. 12:6-anmälan till Länsstyrelsen).
    2. En teknisk beskrivning för nätägare (grid connection details).
    3. En förenklad sammanfattning för kommuner och beslutsfattare.
    4. En checklista som belyser saknad eller otydlig information.

    Krav:
    - Språk: Formell och tekniskt korrekt svenska.
    - Ton: Neutral, faktabaserad och myndighetsvänlig.
    - Strukturera med tydliga rubriker och stycken.
    - Uppfinna INTE data. Om information saknas, påpeka detta i checklistan.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          permitDescription: { type: Type.STRING },
          gridTechnicalDescription: { type: Type.STRING },
          municipalitySummary: { type: Type.STRING },
          deficiencyChecklist: { type: Type.STRING },
        },
        required: ["permitDescription", "gridTechnicalDescription", "municipalitySummary", "deficiencyChecklist"],
      },
    },
  });

  const resultStr = response.text;
  if (!resultStr) throw new Error("Inget svar från AI:n.");
  
  return JSON.parse(resultStr) as DocumentationResult;
}
