import product from "./productRoute.js";

const adminroute = (app) => {
  app.use("/api/admin/product", product);
};

export default adminroute;
