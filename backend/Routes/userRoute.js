import express from 'express'
import { handleAddUser,handleLoginUser,handleUserProfile} from '../Controller/userController.js';
import { jwtAuthMiddleware } from '../Middlewares/auth.js';

const router=express.Router();


router.post("/signin",handleAddUser);
router.post("/login",handleLoginUser);
router.get("/profile",jwtAuthMiddleware,handleUserProfile);


export default router