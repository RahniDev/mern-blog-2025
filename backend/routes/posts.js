import express from 'express'
const router = express.Router()
import formidable from 'express-formidable';

import {
    list,
    create,
    edit,
    deletePost,
    getImage,
    readById
} from "../controllers/posts.js"

router.get("/", list)
router.get("/:slug/:id", readById)
router.post("/new-post", formidable(), create)
router.put("/:id/edit", edit)
router.get('/post/photo/:postId', getImage)
router.delete("/:id", (deletePost))

export default router
