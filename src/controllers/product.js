import { ProductModel } from "../models/ProductModel.js";
import { DataProduct } from "./Data.js";

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    console.log("page", page);
    console.log("size", size);

    const skip = (page - 1) * size;

    const products = await ProductModel.find().skip(skip).limit(size);

    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / size);
    res.status(200).json({ totalPages, totalProducts, products });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addProduct = async (req, res) => {
  try {
    // const product = new ProductModel({
    //   ...req.body,
    // });

    DataProduct.forEach(async (item) => {
      const product = new ProductModel({
        ...item,
      });
      await product.save();
    });

    // await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getProductByID = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const findProductByTitle = async (req, res) => {
  try {
    const regex = new RegExp(`^${req.params.title}`, "i");
    const products = await ProductModel.find({ title: regex });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const findProductNewIn = async (req, res) => {
  try {
    const products = await ProductModel.find({ newin: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
