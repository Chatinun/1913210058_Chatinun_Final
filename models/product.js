const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true},
    family: { type: String },
    movement: { type: String },
    brand: { type: Schema.Types.ObjectId, required: true, ref: "Brand" }
  },
  {
    collection: "products",
  }
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
