const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: { type: String, required: true, trim: true }, // String is shorthand for {type: String}
    established: { type: String }
  },
  { 
    collection: "brands", 
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