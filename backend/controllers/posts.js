import Post from "../models/Post.js"
import mongoose from "mongoose"
import { errorHandler } from "../helpers/dbErrorHandler.js";
import * as formidable from 'formidable';
import fs from 'fs'

export const read = (req, res) => {
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

// first parse multipart request with formidable
export const parseMultiReq = async (req, res, next) => {

    const form = new formidable.IncomingForm()
    form.keepExtensions = true

    // us promise, could add try..catch
    const [fields, files] = await form.parse(req);

    // now populate body for validator and file handler
    req.body = fields;
    req.files = files;

    next();
}

export const create = (req, res) => {
    // let form = new formidable.IncomingForm()
    // form.keepExtensions = true
        // if (err) {
        //     return res.status(400).json({
        //         error: "Image could not be uploaded."
        //     })
        // }
        console.log('field: ', fields)
        // const { title, body } = fields
        // if (!title || !body) {
        //     return res.status(400).json({
        //         error: "All fields are required"
        //     })
        // }
        let post = new Post(fields)
        if (files.photo) {
            const photoFilePath = files.photo.map((file) => {
                return file.filepath
            })
        
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1MB in size."
                })
            }
            const photoStr = photoFilePath.toString()
            post.photo.data = fs.readFileSync(photoStr)
            // post.photo.data = fs.readFileSync(files.photo.toString())
            post.photo.contentType = files.photo.type
        }
        post.save()
            .then((result) => {
               return res.json(result)
            })
            .catch((err) => {
                console.log(err)
                // return res.status(400).json({
                //     error: errorHandler(err)
                // })
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