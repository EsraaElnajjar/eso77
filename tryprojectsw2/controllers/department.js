import department from '../models/department.js';

export const index = async(req, res) => {
    // const subjects = await subject.find().lean(); // to retrieve all columns (name, code)
     const departments = await department.find().lean(); // to retrieve only the name column
     res.render('./departments/index', { departments });
 };

 export const create = async(req, res) => {
    res.render('./departments/create');
};

export const store = (req, res) => {
    console.log(req.body); // body contain the data in the form
   /* const name = req.body.name;
    const code = req.body.code;
    const department = req.body.department;
    console.log(name);*/

    const {name, code} = req.body;
    department.create({
        name: name, // = name,
        code
    });
    // res.send('Added');
    res.redirect('/departments');
    //console.log(name);
};


export const show = async (req, res) => {
    // 1- grap id of the selected subjects:
    const {_id} = req.params;  // =  const _id = req.params._id;
    //console.log(_id);

    // 2- show info about the subject with this id:
    const singleDepartment = await department.findById(_id).lean();
   // console.log(singleDepartment);

    // 3- render "show" template:
    res.render('departments/show', {singleDepartment});
}



export const editDept = async(req,res)=>{
    const {id}=req.params;
    const editFromDept = await department.findById(id).lean();
    const departments =  await department.find().lean();
    console.log(departments);
  res.render('departments/edit', {departments , department: editFromDept});
  };

  export const update=async (req,res)=>{
    const {name,code}= req.body;
    const {id} = req.params;
    await department.findByIdAndUpdate(id, {$set:{name, code}});
     
    res.redirect('/departments');
  };
  export const deleteOne =async (req,res)=>{
    const {id} =req.params;
    await department.findByIdAndDelete(id);
    return res.redirect('/departments')
  };
