import express from "express";

import {
  getAllProducts,
  findProductByTitle,
  findProductNewIn,
  getProductByID,
} from "../../controllers/product.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProductByID/:id", getProductByID);
router.get("/findProductByTitle/:title", findProductByTitle);
router.get("/findProductNewIn", findProductNewIn);

export default router;
