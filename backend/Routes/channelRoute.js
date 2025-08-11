import express from 'express'
import { handleaddChannel, handlegetChannelDetail } from '../Controller/ChannelController.js';
const router=express.Router();

router.post("/",handleaddChannel);
router.get("/",handlegetChannelDetail)

export default router;