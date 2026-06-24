import { askAI } from "../services/aiService";

export const aiSearch = async (req: any, res: any) => {
  console.log("🔥 AI ROUTE HITED");

  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    console.log("QUERY:", query);

    // Query normalize
    let keyword = query.toLowerCase();

    if (keyword.includes("phone")) {
      keyword = "smartphone";
    } else if (keyword.includes("watch")) {
      keyword = "watch";
    } else if (keyword.includes("laptop")) {
      keyword = "laptop";
    } else if (keyword.includes("shoe")) {
      keyword = "shoe";
    }

    // Search products directly from DummyJSON
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}`,
    );

    const data = await response.json();

    const filteredProducts = data.products || [];

    console.log("KEYWORD:", keyword);
    console.log("FILTERED PRODUCTS:", filteredProducts.length);

    // Send products to AI
    const result = await askAI(query, filteredProducts);

    return res.status(200).json({
      success: true,
      result,
      products: filteredProducts,
    });
  } catch (err: any) {
    console.log("❌ AI CONTROLLER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "AI failed",
      error: err?.message,
    });
  }
};
