import { Router } from "express";
import { registerform,register,login, loginform} from "../controllers/user.js";


const router =new Router();
router.get('/register',registerform);

router.post('/register',register)
router.get('/login',loginform);

router.post('/login',login);



export default router;
