import express from 'express'
import { handleaddChannel, handlegetChannelDetail, handleSubscriber } from '../Controller/ChannelController.js';
import { jwtAuthMiddleware } from '../Middlewares/auth.js';
const router=express.Router();

router.post("/",jwtAuthMiddleware,handleaddChannel);
router.get("/:id",handlegetChannelDetail);
router.put("/:id",jwtAuthMiddleware,handleSubscriber)

export default router;