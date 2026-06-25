import { GoogleGenerativeAI } from "@google/generative-ai";

export const askAI = async (query: string, products: any[]) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log("GEMINI KEY =>", apiKey);
    console.log("KEY PREFIX:", process.env.GEMINI_API_KEY?.substring(0, 6));

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY missing in .env");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an ecommerce shopping assistant.

User Query:
${query}

Available Products:
${JSON.stringify(products, null, 2)}

Recommend the best matching products.
Give reasons for each recommendation.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("GEMINI ERROR =>", error);
    throw error;
  }
};
