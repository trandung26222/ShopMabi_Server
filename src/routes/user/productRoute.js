import express from "express";

import {
  getAllProducts,
  findProductByTitle,
  findProductNewIn,
  getProductByID,
  getProductByName,
  filterAndsort,
} from "../../controllers/product.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProductByID/:id", getProductByID);
router.get("/findProductByTitle/:title", findProductByTitle);
router.get("/findProductNewIn", findProductNewIn);
router.get("/getProductbyName/:name", getProductByName);
router.get("/filterAndsort", filterAndsort);

export default router;
