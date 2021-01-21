// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const db = require('../models');
//const User = require('../models/User')

// GET api/users/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'User endpoint OK!'});
});

// POST api/users/register (Public) allows the user to sign up
router.post('/register', (req, res) => {
    console.log('inside of register')
    //console.log(db)
    console.log("-----req---", req.body )
    console.log("-----IS NAME STILL SHOWING UP-----", req.body.name)
    console.log("-----req---", req.body.username )
    
    //find user by email
    db.User.findOne({ email: req.body.email })
    .then(user => {
        // if email already exits, send a 400 response
        console.log(user);
        if (user) {
            return res.status(400).json({ msg: 'Email already exists' });
        } else {
            // Create a new user
            console.log('else statement');
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                picture: req.body.picture,
                bio: req.body.bio,
                //following: req.body.following,
                followers: req.body.followers,
                follows: req.body.follows
            });
            // Salt and hash the password, then save the user
            bcrypt.genSalt(10, (err, salt) => {
                // if (err) throw Error;
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    // if (error) throw Error;
                    // Change the password in newUser to the hash
                    newUser.password = hash;
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(err => console.log(err));
                })
            })
        }
    })
});

// POST api/users/login (Public)
router.post('/login', async (req, res) => {
    console.log(`/login route for >>> ${req.body}`);
    const email = req.body.email;
    const password = req.body.password;

    // Find a user via email
    db.User.findOne({ email })
    .then(user => {
        // If there is not a user
        console.log(user);
        if (!user) {
            res.status(400).json({ msg: 'User not found'});
        } else {
            // A user is found in the database
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                // Check password for a match
                if (isMatch) {
                    console.log(isMatch);
                    // User match, send a JSON Web Token
                    // Create a token payload
                    // user.expiredToken = Date.now();
                    // await user.save();
                    const payload = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        picture: user.picture,
                        bio: user.bio,
                        following: user.following,
                        followers: user.followers
                        // expiredToken: user.expiredToken
                    };
                    // Sign token
                    // 3600 is one hour
                    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
                        if (error) {
                            res.status(400).json({ msg: 'Session has ended, please log in again.'});
                        }
                        const verifyOptions = {
                            expiresIn:  60,
                        };

                        const  legit = jwt.verify(token, JWT_SECRET, verifyOptions);
                        console.log(legit);
                        console.log({
                            success: true,
                            token: `Bearer ${token}`,
                            userData: legit
                        })
                        res.json({
                            success: true,
                            token: `Bearer ${token}`,
                            userData: legit
                        });
                    });
                } else {
                    return res.status(400).json({ msg: 'Email or Password is incorrect' });
                }
            })
        }
    })
})

// this route will find all the users that are signed up
router.get('/all',(req, res) =>{
    console.log("all users route")
    db.User.find()
    .then(users=> {
        console.log(users)
        res.json(users)
    })
})

//update user account bio and picture
router.put('/update/:id', (req, res) => {
    console.log('---this is put route---');
    console.log('this is req params id', req.params.id)
    console.log('-----this is the user follows-----', req.body.follows )

    db.User.updateMany({_id: req.params.id}, {$set: 
        {           
            picture: req.body.picture,
            bio: req.body.bio      
        },
        
    },{multi : true} )
    .then((user) => {
      res.status(201).json({ user })
    })
    .catch((error) => res.send({ error }))
})

// GET api/users/current (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        picture: user.picture,
        bio: user.bio,
        following: user.following,
        followers: user.followers
    });
});


//this allows user accounts to be deleted
router.delete('/:id', async (req, res) => {
    console.log(`/delete route for >>> ${req.body.id}`);
    console.log("----", req.params.id)
    const email = req.body.email;
    const password = req.body.password;

    // Find a user via email
    db.User.deleteOne({ _id: req.params.id  })
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.send({ error }))
  })

module.exports = router;
