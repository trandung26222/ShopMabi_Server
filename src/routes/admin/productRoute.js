import express from "express";
import {
  getAllProducts,
  addProduct,
  getProductByID,
} from "../../controllers/product.js";

const router = express.Router();

// CRUD Product

router.get("/getAllProducts", getAllProducts);
router.post("/addProduct", addProduct);
router.get("/getProductbyID/:id", getProductByID);

export default router;
