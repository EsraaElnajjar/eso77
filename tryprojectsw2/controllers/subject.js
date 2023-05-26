import department from "../models/department.js";
import subject from "../models/subject.js"
import jwt from "jsonwebtoken"

export const index =async(req,res)=>{
  
  console.log(req.user);
    
    const subjects=await subject.find({doctor:req.user._id},{name : 1}).lean();
    res.render('subjects/index',{subjects});

};


export const create = async(req,res)=>{
    const departments =  await department.find().lean();
    console.log(departments);
  res.render('subjects/create',{departments} );

}
export const store = async (req,res)=>{
  console.log(req.body)
  

  const {name,code,department}= req.body
   await subject.create({
    name,
    code,
    department,
    doctor: req.user._id,
  })
res.redirect('/subjects')
  }

export const show = async (req,res)=>{
    const {id}=req.params;
   
  const singlesubject=  await subject.findById(id).populate('department').lean();
  console.log(singlesubject); 
  res.render('subjects/show',{subject : singlesubject})
}
export const edit = async(req,res)=>{
  const {id}=req.params;
  const editFromSubject = await subject.findById(id).lean();
  const departments =  await department.find().lean();
  console.log(departments);
res.render('subjects/edit',{departments , subject: editFromSubject} );

}
export const update=async (req,res)=>{
  console.log(req.body)
  

  const {name,code,department}= req.body
  const {id} = req.params;
  await subject.findByIdAndUpdate(id,{$set:{name  ,code ,department},})
   
  res.redirect('/subjects')
};
export const deleteone =async (req,res)=>{
  const {id} =req.params;
  await subject.findByIdAndDelete(id);
  return res.redirect('/subjects')
};
