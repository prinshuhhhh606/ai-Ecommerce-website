import { askAI } from "../services/aiService";

// ============================
// SMART PRODUCT FILTER
// ============================
const filterProducts = (products: any[], query: string) => {
  const q = query.toLowerCase().trim();

  return products.filter((p) => {
    const title = p.title?.toLowerCase() || "";
    const category = p.category?.toLowerCase() || "";
    const description = p.description?.toLowerCase() || "";

    return title.includes(q) || category.includes(q) || description.includes(q);
  });
};

// ============================
// AI SEARCH CONTROLLER
// ============================
export const aiSearch = async (req: any, res: any) => {
  console.log("🔥 AI ROUTE HITED");

  try {
    const { query } = req.body;

    // ----------------------------
    // VALIDATION
    // ----------------------------
    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    console.log("QUERY:", query);

    // ----------------------------
    // STEP 1: FETCH PRODUCTS
    // ----------------------------
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const allProducts = data.products || [];

    console.log("TOTAL PRODUCTS LOADED:", allProducts.length);

    // ----------------------------
    // STEP 2: FILTER PRODUCTS (SMART LOCAL FILTER)
    // ----------------------------
    const filteredProducts = filterProducts(allProducts, query);

    const products = filteredProducts.slice(0, 20);

    console.log("FILTERED PRODUCTS:", products.length);

    // ----------------------------
    // STEP 3: SEND TO AI
    // ----------------------------
    const result = await askAI(query, products);

    // ----------------------------
    // STEP 4: RESPONSE
    // ----------------------------
    return res.status(200).json({
      success: true,
      result,
      products,
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
