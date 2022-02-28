const ProductCart = require("../models/cart.model");

module.exports.createProductCart = async (req, res) => {
  try {
    const { email, name, stock, size, price, imgURL, color } = req.body;
    console.log(stock)

    if (stock === 0 || stock === null || stock === '') {
      return console.log('Error')
    } else {
      const newProductCart = new ProductCart({
        email,
        name,
        stock,
        size,
        price,
        imgURL,
        color,
      });
      const productCartSaved = await newProductCart.save();
      res.status(201).json(productCartSaved);
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


module.exports.getProductsCart = async (req, res) => {
  const productsCart = await ProductCart.find();
  productsCart.forEach(suma => { suma.total = suma.total + (suma.price * suma.stock) })
  return res.json(productsCart);
};


module.exports.updateProductCartByName = async (req, res) => {
  const { filter, update } = req.params;
  const opts = { new: true };
  const updatedProductCart = await ProductCart.findOneAndUpdate({ name: filter }, { views: update }, opts);
  res.status(204).json(updatedProductCart);
};

module.exports.getProductsCartByName = async (req, res) => {
  const { emailProduct } = req.params;
  const productsCart = await ProductCart.find({ email: emailProduct });
  return res.json(productsCart);
};

module.exports.deleteProductsCartByEmail = async (req, res) => {
  const { emailProduct } = req.params;
  const productsCart = await ProductCart.remove({ email: emailProduct });
  return res.json(productsCart);
};

module.exports.deleteProductCartById = async (req, res) => {
  const { productCartId } = req.params;
  await ProductCart.findByIdAndDelete(productCartId);
  res.status(204).json();
};
