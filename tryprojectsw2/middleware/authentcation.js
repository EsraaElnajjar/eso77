import jwt from "jsonwebtoken"
 export const authentcation=(req,res,next)=>{
    const {token} = req.cookies;
    console.log(token);
    try{
      const decoded = jwt.verify(token , process.env.JWT_SECTRET);
      req.user=decoded;
      console.log(decoded);
      next();

    }catch(error){
      
      return res.redirect('/login')
    }
};

