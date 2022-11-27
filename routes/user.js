import express from "express";
import passport from "passport";
import { getAdminUsers, myProfile } from "../controllers/User.js";
import { logout } from "../controllers/User.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/googlelogin", passport.authenticate("google", {
    scope: ["profile"]
}))

router.get("/login",
    passport.authenticate("google"),
    (req, res, next) => {
        res.send("Logged In");
    });

router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);

//?Admin route
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);
export default router;