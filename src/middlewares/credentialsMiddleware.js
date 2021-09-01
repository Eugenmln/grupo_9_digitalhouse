
function credentialsMiddleware (req, res, next) {

    if(req.session.userLogged && req.session.userLogged.is_admin == 0) {
        res.locals.admin = false
    } 

    next()

}
   
module.exports = credentialsMiddleware
