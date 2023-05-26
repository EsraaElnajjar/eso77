import user from '../models/user.js';
import bcrypt from 'bcryptjs' ;
import  jwt  from 'jsonwebtoken';


export const registerform = (req,res)=>{
    res.render('authentication/register');
};
export const register =async(req,res)=>{
    const{username,email,password,types} =req.body;
    
    const salt=bcrypt.genSaltSync(10);
    const encryptpassword=bcrypt.hashSync(password,salt);
    
  await user.create({username,email,password:encryptpassword,types})
    
}


 export const loginform= (req,res)=>{
    res.render('authentication/login');
}
export const login= async (req,res)=>{
    const{email,password,types} =req.body;
    const loggeduser= await user.findOne({email,types});
    const iscorrectpassword = bcrypt.compareSync(password , loggeduser.password); 
    if(!iscorrectpassword){
      res.send("incorrect password ");
    }
    const data = {
        _id :loggeduser._id,
        email : loggeduser.email,
        types:loggeduser.types
    }
 const jwttoken =jwt.sign(data,process.env.JWT_SECTRET)
 
 res.cookie('token',jwttoken)

console.log(email,password,types)
    
    
   if( types === "admin"){
    
       if ((email==="esraa@gmail.com" && password==="12345") || (email==="alaa@gmail.com" && password==="123") || (email==="aya@gmail.com" && password==="12") || (email==="israa@gmail.com" && password==="1234")){
       res.redirect('/admin')
     }else{
       console.log("incorrect password or email ")
     }
    
    }else if (types === "student"){
        res.redirect('/student')
    }else{
        res.send("logged in doctor");
    }
}
 

 //ee ee 