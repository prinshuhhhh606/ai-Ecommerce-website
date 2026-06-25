import { GoogleGenerativeAI } from "@google/generative-ai";

export const askAI = async (query: string, products: any[]) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY missing");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const cleanProducts = products.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      category: p.category,
      rating: p.rating,
    }));

    // 👇 YAHAN PROMPT LAGEGA
    const prompt = `
You are a world-class ecommerce AI assistant.

Task:
- Understand user intent deeply
- Filter only relevant products
- Rank top 5 best products
- Consider price, rating, category relevance
- Avoid irrelevant items
- Give short and clear reasons

User Query:
${query}

Products:
${JSON.stringify(cleanProducts, null, 2)}

Return response in JSON format:
[
  {
    "title": "",
    "price": "",
    "reason": ""
  }
]
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("GEMINI ERROR =>", error);
    throw error;
  }
};
