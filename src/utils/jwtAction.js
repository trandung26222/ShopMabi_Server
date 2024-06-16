import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createJWT = (payload) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.log(error.message);
  }
  return token;
};

export const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error.message);
  }
  return data;
};
