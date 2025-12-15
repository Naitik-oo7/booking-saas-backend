import express from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", userRoutes);

router.get("/", (_, res) => {
  res.json({
    message: "Welcome to Backend API",
    version: "1.0.0",
  });
});

export default router;
