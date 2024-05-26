import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import adminroute from "./src/routes/admin/index.js";
import userroute from "./src/routes/user/index.js";
import morgan from "morgan";

// ----------------------------------------------------------------
dotenv.config();

const app = express();
app.use(cors({}));

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

adminroute(app);
userroute(app);
// ----------------------------------------------------------------
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((err) => {
    console.log("Connection to database failed!", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
