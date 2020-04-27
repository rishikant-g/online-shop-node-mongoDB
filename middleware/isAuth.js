const session = require('express-session');

module.exports= (req,res,next)=>{
    if(!req.session.isLogin){
      return res.redirect('/login');  
    }
    next();
}