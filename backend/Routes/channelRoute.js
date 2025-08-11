import express from 'express'
import { handleaddChannel, handlegetChannelDetail } from '../Controller/ChannelController.js';
import { jwtAuthMiddleware } from '../Middlewares/auth.js';
const router=express.Router();

router.post("/",jwtAuthMiddleware,handleaddChannel);
router.get("/:id",handlegetChannelDetail);

export default router;