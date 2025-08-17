import express from 'express'
import { handleAddVideo,handleDeleteVideo,handleGetVideos,handleUpdateVideo,handleLikes,handleDislikes,handleGetVideo } from '../Controller/videoController.js'
import { jwtAuthMiddleware } from '../Middlewares/auth.js'
const router=express.Router()


router.get("/",handleGetVideos)
router.get("/:id",handleGetVideo)
router.post("/",jwtAuthMiddleware,handleAddVideo)
router.put("/:id",jwtAuthMiddleware,handleUpdateVideo)
router.delete("/:id",jwtAuthMiddleware,handleDeleteVideo)
router.put("/like/:id",jwtAuthMiddleware,handleLikes)
router.put("/dislike/:id",jwtAuthMiddleware,handleDislikes)

export default router