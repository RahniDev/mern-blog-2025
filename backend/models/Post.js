import mongoose from "mongoose"
import slugify from "slugify"


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    body: {
        type: String,
        required: true
    }
})

postSchema.pre("validate", function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})

const Post = mongoose.model('Post', postSchema)
export default Post