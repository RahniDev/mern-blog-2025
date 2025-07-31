import Post from "../models/Post.js"
import mongoose from "mongoose"
import { errorHandler } from "../helpers/dbErrorHandler.js";
import formidable from 'formidable';
import fs from 'fs'


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
export const read = (req, res) => {
    return res.json(req.post)
}

export const getImage = (req, res) => {
    const { postId } = req.params;

    Post.findById(postId)
        .select('photo')
        .exec()
        .then((post) => {
            if (!post || !post.photo || !post.photo.data) {
                return res.status(404).json({ error: 'Image not found' });
            }

            res.set('Content-Type', post.photo.contentType);
            return res.send(post.photo.data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
};

export const readById = (req, res) => {
    const id = req.params.id
    Post.findById(id)
        .then((post) => res.json(post))
        .catch((err) => res.status(400).json("Error: " + err))
}

export const create = (req, res) => {
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => {
        // console.log('FIELDS:', fields);
        // console.log('FILES:', files);
        if (err) {
            console.error("Form parsing error:", err);
            return res.status(400).json({ error: "Image could not be uploaded" });
        }
        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const body = Array.isArray(fields.body) ? fields.body[0] : fields.body;

        const post = new Post({title,
            body});

        if (files.photo && files.photo.length > 0) {
            const photo = files.photo[0];

            const photoSize = photo.size;

            if (photoSize > 1_000_000) {
                return res.status(400).json({
                    error: "Image should be less than 1MB in size."
                });
            }

            post.photo.data = fs.readFileSync(photo.filepath);
            post.photo.contentType = photo.mimetype;  // Set the MIME type
        }

        post.save()
            .then((result) => res.json(result))
            .catch((err) => {
                console.error("Error saving post:", err);
                res.status(400).json({
                    error: "Error saving post to the database"
                });
            });
    })
};



export const edit = (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Form parsing error:", err);
            return res.status(400).json({ error: "Image could not be uploaded" });
        }

        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const body = Array.isArray(fields.body) ? fields.body[0] : fields.body;

        const updatedPost = { title, body };

        if (files.photo && files.photo.length > 0) {
            const photo = files.photo[0];
            const photoSize = photo.size;

            if (photoSize > 1_000_000) {
                return res.status(400).json({ error: "Image should be less than 1MB" });
            }

            updatedPost.photo = {
                data: fs.readFileSync(photo.filepath),
                contentType: photo.mimetype
            };
        }

        Post.findByIdAndUpdate(
            req.params.id,
            { $set: updatedPost },
            { new: true })
            .then((result) => {
                return res.json(result);
            })
            .catch((error) => {
                console.error("Error updating post:", error);
                return res.status(400).json({ error: "Failed to update post" });
            })
    }
    );
};

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
