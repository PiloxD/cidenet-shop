const { Router } = require("express");
const router = Router();
const productsCartCtrl = require("../controllers/cart.controller");

router.get("/productsCart1", productsCartCtrl.getProductsCart);

router.get("/productsCart1/byname/:emailProduct", productsCartCtrl.getProductsCartByName);

router.post("/create/productsCart", productsCartCtrl.createProductCart);

router.put("/productsCart/:filter/:update", productsCartCtrl.updateProductCartByName);

router.delete("/productsCart/delete/:emailProduct", productsCartCtrl.deleteProductsCartByEmail);

router.delete("/delete/:productCartId", productsCartCtrl.deleteProductCartById);



module.exports = router;
