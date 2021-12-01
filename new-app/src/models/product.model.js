const { Schema, model } = require('mongoose');


const productSchema = new Schema(
  {
    name: String,

    category: String,
    
    desc: String,

    size: String,

    color: String,

    price: Number,

    imgURL: String,

    views: Number,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("Pruduct", productSchema);
