import express from 'express'
const router = express.Router()

import {
    list,
    create,
    edit,
    deletePost,
    getImage,
    readById
} from "../controllers/posts.js"

router.get("/", list)
router.post("/new-post", create)
router.put("/:id/edit", edit)
router.get('/post/photo/:postId', getImage)
router.get("/:slug/:id", readById)
router.delete("/:id", deletePost)

export default router
