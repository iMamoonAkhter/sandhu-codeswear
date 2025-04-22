const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },         // "The Catcher in the Rye"
    slug: { type: String, required: true, unique: true }, // Unique identifier in URL
    desc: { type: String, required: true },          // Product description
    img: { type: String, required: true },           // Image URL
    category: { type: String, required: true },      // "Tshirts"
    size: { type: [String], required: true },        // Available sizes: ["SM", "M", "L", "XL"]
    color: { type: [String], required: true },       // Available colors: ["Red", "Black", etc.]
    price: { type: Number, required: true },         // e.g., 58
    availableQty: { type: Number, required: true },  // Stock quantity
  }, { timestamps: true });

  export const Product = mongoose.model("Product", ProductSchema);