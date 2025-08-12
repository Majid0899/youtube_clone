import express from 'express';
import {handleAddComment,handleDeleteComment,handleEditComment,handleGetComments} from "../Controller/commentController.js"
import { jwtAuthMiddleware } from '../Middlewares/auth.js';
const router=express.Router();

router.post("/:id",jwtAuthMiddleware,handleAddComment)
router.get("/:id",handleGetComments)
router.put("/:id",jwtAuthMiddleware,handleEditComment)
router.delete("/:id",jwtAuthMiddleware,handleDeleteComment)


export default router;