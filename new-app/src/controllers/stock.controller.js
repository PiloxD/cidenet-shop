const Stock = require("../models/stock.model");

module.exports.createStock = async (req, res) => {
  try {
    const { name, marca, stock, size, } = req.body;
    const newStock = new Stock({
      name,
      marca,
      stock,
      size
    });

    const stockSaved = await newStock.save();

    res.status(201).json(stockSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
module.exports.getStock = async (req, res) => {
  const stock = await Stock.find();
  return res.json(stock);

};

module.exports.updateStockById = async (req, res) => {
  const updatedStock = await Stock.findByIdAndUpdate(
    req.params.stockId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedStock);
};
module.exports.getStockByName = async (req, res) => {
  const { nameStock } = req.params;
  const stock = await Stock.find({ name: nameStock });  
  return res.json(stock); 
};
module.exports.getStockByNameAndSize = async (req, res) => {
  const { nameStock, sizeStock } = req.params;
  const stock = await Stock.find({ name: nameStock, size: sizeStock });  
  return res.json(stock);

};


module.exports.updateStockQuantityById = async (req, res) => {
  const {filter, update } = req.params;
  const opts = { new: true };
  const updatedStockQuantity = await Stock.findOneAndUpdate({ _id: filter }, { stock: update }, opts);
  res.status(204).json(updatedStockQuantity);
};

module.exports.updateStockQuantityByNameAndSize = async (req, res) => {
  const {filterName, filterSize, update } = req.params;
  const opts = { new: true };
  const updatedStockQuantitySum = await Stock.findOneAndUpdate({ name: filterName, size: filterSize }, {"$inc":{ stock: update }}, opts);
  res.status(204).json(updatedStockQuantitySum);
};