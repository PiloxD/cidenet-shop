const { Schema, model } = require('mongoose');


const stockSchema = new Schema(
  {
    name: String,
    marca: String,
    stock: Number,
    size: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("Stock", stockSchema);
