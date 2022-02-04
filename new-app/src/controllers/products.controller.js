const Product = require("../models/product.model");

module.exports.createProduct = async (req, res) => {
  try {
    const { name, marca, category, desc, size, color, price, imgURL, views } = req.body;
    const newProduct = new Product({
      name,
      marca,
      category,
      desc,
      size,
      color,
      price,
      imgURL,
      views,
    });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports.getProductById = async (req, res) => {
  const { Id } = req.params;

  const product = await Product.findById(productId);
  res.status(200).json(product);
};

module.exports.getProductsByFilter = async (req, res) => {
  const { gender } = req.params;
  const products = await Product.find({ category: gender });
  return res.json(products);

};
module.exports.getProductsBySearchBar = async (req, res) => {
  const { search } = req.params;
  const products = await Product.find({ name: { '$regex': search, $options: 'i' } });
  return res.json(products);

};
module.exports.getProductsByFilterH = async (req, res) => {
  const { sizef, colorf } = req.params;
  const products = await Product.find({ category: 'mujer', size: sizef, color: colorf });
  return res.json(products);
};
module.exports.getProductsByFilterM = async (req, res) => {
  const { sizef, colorf } = req.params;
  const products = await Product.find({ category: 'mujer', size: sizef, color: colorf });
  return res.json(products);
};
module.exports.getProducts = async (req, res) => {
  const products = await Product.find();
  return res.json(products);
};
module.exports.updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProduct);

};

module.exports.updateProductByName = async (req, res) => {
  const {filter, update } = req.params;
  const opts = { new: true };
  const updatedProductView = await Product.findOneAndUpdate({ name: filter }, { views: update }, opts);
  res.status(204).json(updatedProductView);
};
module.exports.deleteProductById = async (req, res) => {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  // code 200 is ok too
  res.status(204).json();
};
