const express = require('express')
const router = express.Router()

const {
    list,
    parseMultiReq,
    create,
    readBySlug,
    edit,
    deletePost
} = require("../controllers/posts")

router.get("/", list)
router.get("/:slug/:id", readBySlug)
router.post("/new-post", create)
router.put("/:id/edit", edit)
router.delete("/:id", (deletePost))

module.exports = router;