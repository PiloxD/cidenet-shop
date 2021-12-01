import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";
import { authJwt } from "../middlewares";

router.get("/", productsCtrl.getProducts);

router.get("/:productId", productsCtrl.getProductById);

router.post(
  "/",
  [authJwt.verifyToken],
  productsCtrl.createProduct
);

router.put(
  "/:productId",
  [authJwt.verifyToken],
  productsCtrl.updateProductById
);

router.delete(
  "/:productId",
  [authJwt.verifyToken],
  productsCtrl.deleteProductById
);

export default router;
