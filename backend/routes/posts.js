const express = require('express')
const router = express.Router()

const {
    list,
    create,
    readBySlug,
    edit,
    getImage,
    deletePost
} = require("../controllers/posts")

router.get("/", list)
router.get("/:slug/:id", readBySlug)
router.post("/new-post", create)
router.put("/:id/edit", edit)
router.get('/post/photo/:postId', getImage)
router.delete("/:id", (deletePost))

module.exports = router;