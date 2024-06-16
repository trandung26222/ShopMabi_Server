import bcrypt from "bcrypt";

export const hashPassword = async (matkhau) => {
  const saltRounds = 10; // số lần băm mật khẩu
  try {
    const hash = await bcrypt.hash(matkhau, saltRounds);
    return hash.toString();
  } catch (error) {
    return false;
  }
};
export const comparePassword = async (matkhau, hashmatkhau) => {
  try {
    const result = await bcrypt.compare(matkhau, hashmatkhau);
    return result;
  } catch (error) {
    return error.message.toString();
  }
};
