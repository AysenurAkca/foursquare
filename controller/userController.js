const User = require('../models/userModel')
const bcrypt = require('bcrypt')
//const userController = require('../models/userModel')
const jwt = require('jsonwebtoken')

const mainPage = async (req,res)=> {
    res.render('main')
}

const logIn = (req, res) =>{
    res.render('login', {
      err: ""
    })
  }

  const createUser =  async (req, res) =>{
    const checkEmail = await User.findOne({email:req.body.email})
    if(!checkEmail){
      if (req.body.password !== "") {
        let hashedPass = bcrypt.hashSync(req.body.password, 12);
        let userObj ={
          ...req.body,
          password: hashedPass
        }
        let newUser = User(userObj)
        newUser.save()
        .then(() => {
          res.render('login', {
            err: ""
          })
        }).catch((err) => {
          console.log(err);
        });
      }
    }else{

      res.render('signup', {
        err: "The email has already registered! Try again!"
      })
    }
  }

  const logInUser = (req, res)=>{
    User.findOne({email: req.body.email})
    .then((user) => {
      if (user !== null ) {
        let correctPass = bcrypt.compareSync(req.body.password, user.password);
          if (correctPass ) {
            const userToken = jwt.sign({user},"this is secret baby")
                res.cookie('jwt', userToken)
                res.redirect('/places')
          } else{
            res.render('login',{
              err: 'Password is wrong!...Try again!'
          })
      }
      } else {
        res.render('login',{
          err: 'Invalid user or password! Signup first!'
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const logOut = (req, res)=>{
    res.clearCookie('jwt');
    res.redirect('/login')
  }
const signUpPage = (req,res) =>{
  res.render('signup', {
    err:""
  })
}

module.exports = {mainPage,logIn,createUser,logInUser,logOut,signUpPage}