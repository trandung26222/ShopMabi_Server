import { UserModel } from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { messageResponse } from "../utils/messageResponse.js";
import { createJWT, verifyToken } from "../utils/jwtAction.js";

export const signup = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await hashPassword(password);

    const users = await UserModel.find();

    if (
      users.find((user) => user.username === username || user.email === email)
    ) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    } else {
      const user = new UserModel({
        username: username,
        email: email,
        password: hashedPassword,
      });
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, "email");
    console.log(password, "password");

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.status(400).json(messageResponse(400, "Invalid email address"));
    } else {
      const checkpassword = await comparePassword(password, user.password);
      if (checkpassword) {
        const payload = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };
        let token = createJWT(payload);

        res.cookie("token", token, {
          httpOnly: true, // Chỉ có thể truy cập bởi máy chủ
          maxAge: 3600000, // Thời gian tồn tại của cookie (1 giờ)
          sameSite: "None", // Cho phép gửi cookie qua các yêu cầu từ các trang web khác
          secure: true, // Chỉ gửi cookie qua kết nối HTTPS
        });

        res.status(200).json(messageResponse(200, "Login successful"));
      } else {
        res.status(400).json(messageResponse(400, "Invalid password"));
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
