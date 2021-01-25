const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//post schemas
const postSchema = new Schema({
    post: {
        type: String,
        type: Date,
        default: Date.now()
    }
})

// User Schema
const userSchema = new Schema({
    //name should be unique
    name: {
        type: String,
        required: true,
        //unique: true
    },
    //email should be unique so users can't use the same e-mail
    email: {
        type: String,
        required: true,
        //unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    picture:{
        type: String,
    },
    bio:{
        type: String,
    },
    //array of posts so a user can have multiple posts
    posts:[
        {
            type: String, 
            ref: 'Post'
        }
    ],
    //array of user objects
    follows:[ 
        {
            type: Schema.ObjectId, 
            ref: 'User'
        }         
    ],
    followers:[ 
        {
            type: Schema.ObjectId, 
            ref: 'User'
        }         
    ],
    date: { //time stamp when user registers
        type: Date,
        default: Date.now()
    }
});

module.exports = Post = mongoose.model('Post', postSchema);
module.exports = User = mongoose.model('User', userSchema);