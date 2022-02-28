const { Schema, model } = require('mongoose');


const cartSchema = new Schema(
  {
    email: String,
    name: String,
    stock: Number,
    size: String,
    price: Number,
    imgURL: String,
    color: String,

  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("ProductCart", cartSchema);
