import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    gioitinh: {
      type: String,
    },
    ngaysinh: {
      type: Date,
    },
    phonenumber: {
      type: String,
    },
    username: {
      type: String,
    },
    uid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("Users", schema);
