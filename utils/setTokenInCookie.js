const setTokenInCookie = (res, token)=> {
     res.cookie('token',token, {
        expires:new Date(Date.now() + 36000),
        httpOnly:true
     })
}

module.exports = setTokenInCookie;