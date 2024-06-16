import profileRoute from "./profileRoute.js";
import cartRoute from "./cartRoute.js";
import productRoute from "./productRoute.js";
import userRoute from "./userRoute.js";

const userroute = (app) => {
  app.use("/api/user/profile", profileRoute);
  app.use("/api/user/cart", cartRoute);
  app.use("/api/user/product", productRoute);
  app.use("/api/user", userRoute);
};

export default userroute;
