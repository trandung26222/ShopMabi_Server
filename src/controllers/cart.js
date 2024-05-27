import { CartModel } from "../models/CartModel.js";
import { ProductModel } from "../models/ProductModel.js";

export const addToCart = async (req, res) => {
  try {
    var { userId, productId, quantity, mau, size } = req.body.data;
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
    var kq = cart.products;
    console.log(kq.length);

    res.status(200).json(kq);
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

export const add1OnCart = async (req, res) => {
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

    cart.products[existingProductIndex].quantity += 1;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProductonCart = async (req, res) => {
  try {
    var { userId, productId, mau, size } = req.body;

    console.log(userId, productId, mau, size);

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
    var { userId } = req.params;
    let cart = await CartModel.findOne({ userId: userId });

    if (!cart) {
      // Nếu không tìm thấy cart, trả về 404 Not Found
      return res.status(200).json([]);
    }

    var products = [...cart.products];

    for (let i = 0; i < products.length; i++) {
      let product = await ProductModel.findById(products[i].productId);

      var { msp, newin, srcimg, title, gia, freeship, giamgia, size } = product;

      var { productId, quantity, mau, size } = products[i];

      products[i] = {
        productId,
        quantity,
        mau,
        size,
        msp,
        newin,
        srcimg,
        title,
        gia,
        freeship,
        giamgia,
      };
    }
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private"
    );

    console.log("getcart--------------------------------");
    console.log(products.length);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
