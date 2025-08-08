import mongoose from 'mongoose'
import { createHmac } from 'node:crypto';
import uuidv1 from 'uuidv1'

const userSchema = new mongoose.Schema({
name: {
type: String,
trim: true,
required: true,
maxlength: 32
}, 
email: {
    type: String,
    trim: true,
    required: true,
    unique: 32
},
hashed_password: {
    type: String,
    required: true,
},
salt: String,
role: {
    type: Number,
    default: 0
},
history: {
    type: Array,
    default: []
}
}, {timestamps: true})

// virtual field
userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    // saves the encrypted password
    this.hashed_password = this.encryptPassword(password)
})
.get(function () {
    return this._password
})

userSchema.methods = {
authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
},

    encryptPassword: function(password) {
        if (!password) return '';
        // hashes password
        try {
            return createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch (err) {
            return ''
        }
    }
}

const User = mongoose.model('User', userSchema)
export default User