function guestMiddleware (req, res, next){
    
    if(req.session.userLogged){
        return res.redirect("perfilDeusuario")
    }
    next()
   }
   
   module.exports = guestMiddleware