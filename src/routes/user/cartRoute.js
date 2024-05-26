import express from "express";
import {
  addToCart,
  sub1OnCart,
  deleteProductonCart,
  getCart,
} from "../../controllers/cart.js";

const router = express.Router();

router.post("/addToCart", addToCart);
router.delete("/sub1OnCart", sub1OnCart);
router.delete("/deleteProductonCart", deleteProductonCart);
router.get("/getCart", getCart);

export default router;
