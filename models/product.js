const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
  },{ collection: "product" });

const product = mongoose.model('Products',productSchema);

module.exports = product;