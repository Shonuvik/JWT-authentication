const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //buscar token do cabeçalho
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400).
        json({
            error: "Not Authorized"
        });
    }

   // verify token
   try{
       const decode = jwt.verify(token, "security");
       req.user = decode.user;
       next();
   }catch(err) {
    return res.status(400).json({error: 'Invalid Token '});
   }
}