import Post from "../models/Post.js"
import mongoose from "mongoose"
import { errorHandler } from "../helpers/dbErrorHandler.js";


export const read = (req, res) => {
    console.log(req.post)
    return res.json(req.post)
}

export const list = (req, res) => {
    const sort = { title: 1 }
    Post.find()
        .sort(sort)
        .then((posts) => res.json(posts))
        .catch((err) => res.status(400).json("Error: " + err))
}

export const readBySlug = (req, res) => {
    const id = req.params.id
    const slug = req.params.slug
    Post.findById(id)
        .then((post) => res.json(post))
        .catch((err) => res.status(400).json("Error: " + err))
}

export const create = (req, res) => {
    const { title, body } = req.body
    const post = new Post({
        title,
        body
    })
    post.save()
        .then((response) => {
            console.log("response" + response)
            res.send(response)
        })
        .catch((err) => {
            return res.status(400).json({
                error: errorHandler(err)
            })
        })
}
const Schema = mongoose.Schema;
export const edit = (req, res) => {
    const id = req.params.id
    if (!Schema.Types.ObjectID.isValid(id))
        return res.status(400).send(`No post with given id: ${id}`)
    const { title, body } = req.body

    const updatedPost = { title, body }
    Post.findByIdAndUpdate(
        id,
        {
            $set: updatedPost,
        },
        { new: true },
        (error, data) => {
            if (error) {
                return error
            } else {
                res.send(data)
                console.log(data)
            }
        }
    )
}

export const deletePost = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(() => {
            console.log(req.params.id)
            res.status(200).json({
                message: "Deleted!"
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
}