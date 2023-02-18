const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
  },
  { 
    collection: "brands", 
    timestamps: true,
    toJSON: {virtuals: true},
  });

brandSchema.virtual('product',
{
  ref: 'Product',
  localField: '_id',
  foreignField: 'brand',
});

const brand = mongoose.model('Brand',brandSchema);

module.exports = brand;