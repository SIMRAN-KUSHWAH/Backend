import express from "express";
import { registerParentsController,loginParentController,getparentsController,updateparentController,deleteParentController } from "../controllers/registerController.js";


// Object Router
const router = express.Router();

// add notificiation
router.post("/parents/register", registerParentsController);

// get notification
router.post("/parents/login", loginParentController);


router.get('/parents/get',getparentsController );

router.put('/parents/:userId', updateparentController);
 router.delete('/parents/:userId', deleteParentController)

export default router;