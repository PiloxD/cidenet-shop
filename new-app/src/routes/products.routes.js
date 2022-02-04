const { Router } = require("express");
const router = Router();
const productsCtrl = require("../controllers/products.controller");
const authJwt = require("../middlewares/authJwt");

router.get("/products1", productsCtrl.getProducts);

router.get("/filter/input/:search", productsCtrl.getProductsBySearchBar);

router.get("/onlyone/:Id", productsCtrl.getProductById);

router.get("/filter/hombre/:sizef/:colorf", productsCtrl.getProductsByFilterH);

router.get("/filter/mujer/:sizef/:colorf", productsCtrl.getProductsByFilterM);

router.get("/filter/:gender", productsCtrl.getProductsByFilter);

router.post("/addproducts", productsCtrl.createProduct);

router.put("/update/:productId", productsCtrl.updateProductById);

router.put("/update/views/:filter/:update", productsCtrl.updateProductByName);

router.delete("/:productId", [authJwt.verifyToken], productsCtrl.deleteProductById);

module.exports = router;
