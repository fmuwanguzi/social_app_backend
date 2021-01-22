const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//followers and following schemas
// const followSchema = new Schema({
//     following: [{
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }]
    // followers: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }]
//})

// User Schema
const userSchema = new Schema({
    //username should be unique
    username: {
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
        type: String
    },
    // following:[
    //     this
    // ],
    // followers:[
    //     this
    // ],
    follows:[ 
        {type: Schema.ObjectId, 
        ref: 'User'} 
        
    ],
    followers:[ 
        {type: Schema.ObjectId, 
        ref: 'User'} 
        
    ],
    // following:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
        
    // },
    // followers:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
        
    // },
    date: { //time stamp when user registers
        type: Date,
        default: Date.now()
    }
});

//module.exports = Follow = mongoose.model('Follow', followSchema);
module.exports = User = mongoose.model('User', userSchema);