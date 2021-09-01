function adminMiddleware (req, res, next) {

    if(req.session.userLogged == undefined || req.session.userLogged.is_admin == 0) {
        res.redirect ('/')
    } 

    next()
}
   
module.exports = adminMiddleware