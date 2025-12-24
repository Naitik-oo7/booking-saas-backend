import express from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes";
import businessRoutes from "../modules/business/business.routes";
import businessMemberRoutes from "../modules/businessMember/businessMember.routes";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/business", businessRoutes);
router.use("/api/v1/business-members", businessMemberRoutes);

router.get("/", (_, res) => {
  res.json({
    message: "Welcome to Backend API",
    version: "1.0.0",
  });
});

export default router;
