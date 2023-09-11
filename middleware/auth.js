const userAuth = (req, res, next)=>{
     console.log(req.cookies)
    if (req.cookies.userLoggedIn ) {
      res.locals.userName = `${req.cookies.userInfo.userName}`
      res.locals.userEmail = req.cookies.userInfo.email;
      res.locals.userId = req.cookies.userInfo._id
      next()
    } else {
      res.redirect('/login')
    }
  }
  
  const loginAuth = (req, res, next)=>{
    if (req.cookies.userLoggedIn) {
      res.redirect('/')
    } else {
      next()
    }
  }
  
  module.exports = {
    userAuth,
    loginAuth
  }