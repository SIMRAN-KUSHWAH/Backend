import express from "express";
import { registerController, loginController, getUsersController,updateUserController,deleteUserController, logoutController } from "../controllers/userController.js";


// Object Router
const router = express.Router();

// add notificiation
router.post("/register", registerController);

// get notification
router.post("/login", loginController);


router.get('/user/get',getUsersController );

router.put('/user/:userId', updateUserController);
 router.delete('/user/:userId', deleteUserController)
 router.post("/logout", logoutController);
export default router;
