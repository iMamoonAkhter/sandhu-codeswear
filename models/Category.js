import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true }, 
  }, { timestamps: true });
mongoose.models = {}; // Clear the models to avoid OverwriteModelError
  export const Category = mongoose.model("Category", CategorySchema);
// export default mongoose.models.Product || mongoose.model("Product", ProductSchema);