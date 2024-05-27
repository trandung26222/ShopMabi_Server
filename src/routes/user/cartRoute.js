import express from "express";
import {
  addToCart,
  sub1OnCart,
  deleteProductonCart,
  getCart,
  add1OnCart,
} from "../../controllers/cart.js";

const router = express.Router();

router.post("/addToCart", addToCart);
router.post("/sub1OnCart", sub1OnCart);
router.post("/add1OnCart", add1OnCart);
router.delete("/deleteProductonCart", deleteProductonCart);
router.get("/getCart/:userId", getCart);

export default router;
