import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    msp: {
      type: String,
    },
    newin: {
      type: Boolean,
    },
    srcimg: {
      type: [String],
    },
    title: {
      type: String,
    },
    gia: {
      type: Number,
    },
    color: {
      type: [String],
    },
    freeship: {
      type: Boolean,
    },
    giamgia: {
      type: Number,
    },
    size: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("Products", schema);
