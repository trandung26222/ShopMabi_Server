import { CartModel } from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  try {
    var { userId, productId, quantity, mau, size } = req.body;
    let cart = await CartModel.findOne({ userId: userId });

    if (!cart) {
      cart = new CartModel({ userId: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex((product) => {
      return (
        product.productId.toString() === productId &&
        product.mau === mau &&
        product.size === size
      );
    });

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId: productId,
        quantity: quantity,
        mau: mau,
        size: size,
      });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sub1OnCart = async (req, res) => {
  try {
    var { userId, productId, mau, size } = req.body;
    let cart = await CartModel.findOne({ userId: userId });

    const existingProductIndex = cart.products.findIndex((product) => {
      return (
        product.productId.toString() === productId &&
        product.mau === mau &&
        product.size === size
      );
    });

    cart.products[existingProductIndex].quantity -= 1;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProductonCart = async (req, res) => {
  try {
    var { userId, productId, mau, size } = req.body;
    let cart = await CartModel.findOne({ userId: userId });
    const ProductIndex = cart.products.findIndex((product) => {
      return (
        product.productId.toString() === productId &&
        product.mau === mau &&
        product.size === size
      );
    });
    cart.products.splice(ProductIndex, 1);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getCart = async (req, res) => {
  try {
    var { userId } = req.body;
    let cart = await CartModel.findOne({ userId: userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};
