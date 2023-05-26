import express from "express";
import { engine } from 'express-handlebars';
import methodoverride from 'method-override';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import departmentRouter from './routes/departments.js';
import cookieParser from "cookie-parser";

mongoose.connect(process.env.mongoconnectionurl)
import subjectsRouter from './routes/subjects.js';
import authRoutes from './routes/auth.js'
import {authentcation} from './middleware/authentcation.js';
const app = express();
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(methodoverride('_method'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');
app.use('/',authRoutes)

app.use('/subjects',authentcation,subjectsRouter);
app.use('/departments', departmentRouter);



    app.use('/subjects',subjectsRouter);
app.use('/',authRoutes)

app.get('/student',(req,res)=>{
    res.render("student");
    });
    
app.post('/enrolljava',async (req,res)=>{
   
      res.render("enrolljava"); 
    });
app.post('/enrollphp', async(req,res)=>{
  
        res.render("enrollphp"); 
      });
app.post('/enrolldatabase',async (req,res)=>{
    
        res.render("enrolldatabase"); 
});
    app.post('/classjava', (req,res)=>{
res.render("classjava"); 
 });
app.post('/classphp', (req,res)=>{
        res.render("classphp"); 
});
app.post('/classdatabase', (req,res)=>{
res.render("classdatabase"); 
    });
app.get('/admin',(req,res)=>{
    res.render("admin");
})
app.post('/addcourse',(req,res)=>{
    res.render('subjects');
})
app.post('/adddepartment',(req,res)=>{
    res.render('departments');
})
app.post('/registers',(req,res)=>{
   res.redirect('/register')
});
app.listen(process.env.port,()=>{
    console.log('start the app on http://Localhost '+process.env.port);
});
