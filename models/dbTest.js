const db = require('.')

// console.log(db)

// db.User.create({ 
    
//   username: 'username', 
//   email: 'email', 
//   password: 'password', 
  //picture: 'picture',
  //bio: 'bio', 
  //followers: 'followers',
  //follows: 'follows'

// }).then((users) => console.log(users))


// db.User.find().then((users)=>{
//     console.log(users)
// })

async function addUser(){
    const userOne = await db.User.findOne({ email: 'upnext@mail.com' })
   // console.log(userOne);
    const userTwo = await db.User.findOne({ email: 'follow@follow.com' })
    // console.log(userTwo)
    // //userTwo.follows =[]
    // userTwo.follows.push(userOne.id)
    // userTwo.save()
    //console.log(userTwo)
    //console.log(userTwo.follows)
    console.log('user one id ',userOne._id)

    //this populate is working
    userTwo.populate('follows').execPopulate().then(function (user){
        console.log('these is the User with follows populated', user)
        console.log('these are your follows objects', user.follows)

        // const next = user.follows
        // next.push(userOne._id)
        // UserTwo.save()
    })


}

addUser()