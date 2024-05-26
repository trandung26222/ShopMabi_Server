import { ProductModel } from "../models/ProductModel.js";
import { DataProduct } from "./Data.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
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
