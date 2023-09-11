const User = require('../models/userModel')
const bcrypt = require('bcrypt')
//const userController = require('../models/userModel')


const mainPage = async (req,res)=> {
    res.render('main')
}

const logIn = (req, res) =>{
    res.render('login', {
      err: ""
    })
  }

  const createUser = (req, res) =>{
    if (req.body.password !== "") {
      let hashedPass = bcrypt.hashSync(req.body.password, 12);
      let userObj ={
        ...req.body,
        password: hashedPass
      }
      console.log(userObj)
      let newUser = User(userObj)
      newUser.save()
      .then(() => {
        res.render('login', {
          err: "You need create your account"
        })
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  const logInUser = (req, res)=>{
    User.findOne({email: req.body.email})
    .then((user) => {
      if (user !== null ) {
        let correctPass = bcrypt.compareSync(req.body.password, user.password);
          if (correctPass ) {
            console.log(user)
            res.cookie('userLoggedIn', 'true');
            res.cookie('userInfo', user);
            res.redirect('/');
          } else{
            res.render('login',{
              err: 'Password is wrong!...Try again!'
          })
      }
      } else {
        res.render('login',{
          err: 'Invalid user or password, signup first'
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const logOut = (req, res)=>{
    res.clearCookie('userLoggedIn');
    res.clearCookie('userInfo')
    res.redirect('/login')
  }


module.exports = {mainPage,logIn,createUser,logInUser,logOut}