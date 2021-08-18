let db = require('../database/models')

function userLogged(req,res,next) {
    
    res.locals.isLogged = false 

    if (req.cookies.userEmail && !req.session.isLogged) {
        db.Users.findOne({ 
            where: {
                email: req.cookies.userEmail
            }           
        })    
            .then((userFromCookie) => {                   
                    req.session.userLogged = userFromCookie  
                })
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true
    }
        
    next ()
}

module.exports = userLogged
