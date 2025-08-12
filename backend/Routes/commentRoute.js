import express from 'express';
import {handleAddComment,handleGetComments} from "../Controller/commentController.js"
import { jwtAuthMiddleware } from '../Middlewares/auth.js';
const router=express.Router();

router.post("/:id",jwtAuthMiddleware,handleAddComment)
router.get("/:id",handleGetComments)


export default router;