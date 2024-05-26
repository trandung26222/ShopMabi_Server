import express from "express";
import {
  getProfile,
  addProfile,
  updateProfile,
} from "../../controllers/user.js";

const router = express.Router();

router.get("/getProfile/:uid", getProfile);
router.put("/updateProfile", updateProfile);
router.post("/addProfile", addProfile);

export default router;
