import { ProductModel } from "../models/ProductModel.js";
import { DataProduct } from "./Data.js";
import diacritics from "diacritic";
import _ from "lodash";

export const getAllProducts = async (req, res) => {
  try {
    const cookieHeader = req.cookies;

    res.json(cookieHeader);

    // const page = parseInt(req.query.page) || 1;
    // const size = parseInt(req.query.size) || 10;

    // const skip = (page - 1) * size;

    // const products = await ProductModel.find().skip(skip).limit(size);

    // const totalProducts = await ProductModel.countDocuments();
    // const totalPages = Math.ceil(totalProducts / size);
    // res.status(200).json({ totalPages, totalProducts, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;

    const normalizedSearchTerm = diacritics.clean(name); // Loại bỏ dấu tiếng Việt trong chuỗi tìm kiếm

    const allProducts = await ProductModel.find(); // Truy xuất tất cả sản phẩm từ cơ sở dữ liệu

    const filteredProducts = allProducts.filter((product) => {
      const normalizedTitle = diacritics.clean(product.title); // Loại bỏ dấu tiếng Việt trong trường title của sản phẩm
      const regex = new RegExp(normalizedSearchTerm, "i");
      return regex.test(normalizedTitle); // Kiểm tra xem normalizedTitle có khớp với chuỗi tìm kiếm không
    });

    res.json(filteredProducts);
  } catch (error) {
    console.error("Error fetching products by name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const filterAndsort = async (req, res) => {
  try {
    let filter = req.query.filter; // filter
    let sort = Number(req.query.sort); // sort
    const products = await ProductModel.find();
    let resultProduct = products;

    if (filter) {
      let a = filter.split(":").map(Number);
      if (a[0] !== -1 && a[1] !== -1) {
        resultProduct = _.filter(resultProduct, (product) => {
          return product.gia >= a[0] && product.gia <= a[1];
        });
      }
    }
    if (sort) {
      switch (sort) {
        case 0:
          resultProduct = _.sortBy(resultProduct, "title");
          break;
        case 1:
          resultProduct = _.sortBy(resultProduct, "title").reverse();
          break;
        case 2:
          resultProduct = _.sortBy(resultProduct, "gia");
          break;
        case 3:
          resultProduct = _.sortBy(resultProduct, "gia").reverse();
          break;
        default:
          break;
      }
    }
    res.json(resultProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
