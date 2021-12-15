const { Router } = require("express");
const router = Router();
const productsCtrl = require("../controllers/products.controller");
const  authJwt  = require("../middlewares/authJwt");

router.get("/products1", productsCtrl.getProducts);

router.get("/onlyone/:Id", productsCtrl.getProductById);

router.get("/gender/:gender", productsCtrl.getProductsByGender);

router.post("/addproducts",  productsCtrl.createProduct);

router.put("/:productId", productsCtrl.updateProductById);

router.delete(  "/:productId",  [authJwt.verifyToken],  productsCtrl.deleteProductById);

module.exports = router;
