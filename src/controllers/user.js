import { UserModel } from "../models/UserModel.js";

export const getProfile = async (req, res) => {
  try {
    const { uid } = req.params; // Lấy uid từ tham số trong yêu cầu
    const user = await UserModel.findOne({ uid: uid }); // Tìm kiếm người dùng với uid tương ứng
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { uid } = req.body; // Lấy uid từ phần thân của yêu cầu (body)
    const updatedUser = await UserModel.findOneAndUpdate(
      { uid: uid }, // Điều kiện tìm kiếm: tìm user có uid tương ứng
      { $set: req.body }, // Dữ liệu cần cập nhật từ req.body
      { new: true } // Trả về bản ghi đã cập nhật
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProfile = async (req, res) => {
  try {
    const profile = new UserModel({
      uid: req.body.uid,
      username: req.body.username,
      email: req.body.email,
    });
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
