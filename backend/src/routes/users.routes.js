import express from "express";
import {getAuthenticatedUser, login, logout, signup} from "../controllers/users.controller.js";
import {requiresAuth} from "../middleware/auth.js";

const router = express.Router();

router.get("/", requiresAuth,  getAuthenticatedUser)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


export default router;
