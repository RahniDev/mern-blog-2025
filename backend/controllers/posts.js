import Post from "../models/Post.js"
import mongoose from "mongoose"
import { errorHandler } from "../helpers/dbErrorHandler.js";
import * as formidable from 'formidable';
import fs from 'fs'


export const read = (req, res) => {
    return res.json(req.post)
}

export const getImage = (req, res) => {
    const { postId } = req.params;

    Post.findById(postId)
        .select('photo')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(404).json({
                    error: 'Post or image not found',
                });
            }

            res.set('Access-Control-Allow-Origin', '*');  // Allow all origins (or restrict to your frontend URL)
            res.set('Content-Type', post.photo.contentType);  // Set the MIME type of the image
            res.send(post.photo.data);  // Send binary data as the image
        });
};

export const list = (req, res) => {
    const sort = { title: 1 }
    Post.find()
        .sort(sort)
        .then((posts) => {
            const postsWithImageUrls = posts.map(post => {
                const imageUrl = post.photo ? `http://localhost:8000/post/photo/${post._id}` : null;
                return { ...post.toObject(), imageUrl }; 
            }
            );
            res.json(postsWithImageUrls);
        })
        .catch((err) => res.status(400).json("Error: " + err))
}


export const readBySlug = (req, res) => {
    const id = req.params.id
    const slug = req.params.slug
    Post.findById(id)
        .select('photo')
        .then((post) => res.json(post))
        .catch((err) => res.status(400).json("Error: " + err))
}


export const create = (req, res) => {
    const { fields, files } = req;
    // console.log('Fields:', fields);
    // console.log('Files:', files);
    const post = new Post(fields);


    if (files && files.photo) {
        const photoFilePath = files.photo.path;
        const photoSize = files.photo.size;


        if (photoSize > 1000000) {
            return res.status(400).json({
                error: "Image should be less than 1MB in size."
            });
        }


        post.photo.data = fs.readFileSync(photoFilePath);
        post.photo.contentType = files.photo.type;  // Set the MIME type of the image
    }


    post.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error("Error saving post:", err);
            return res.status(400).json({
                error: "Error saving post to the database",
                message: err.message,
            });
        });
};


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
