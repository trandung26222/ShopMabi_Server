import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
        },
        mau: {
          type: String,
        },
        size: {
          type: String,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model("Carts", schema);
