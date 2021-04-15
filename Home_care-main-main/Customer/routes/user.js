const express=require('express');
const router=express.Router();
var UserManagement=require('../controller/user')
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images');
  },
  filename: (req, file, cb) => {
    //console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({ storage: storage });


//signup route
router.post('/Signup',(req,res)=>{
  return UserManagement.Signup(req,res);
})


//signin route
router.post('/SignIn',(req,res)=>{
  return UserManagement.SignIn(req,res);
})

//signout route
router.get('/Signout',(req,res)=>{
  return UserManagement.Signout(req,res);
})

router.put('/Updatecustomer/:id',upload.single('profilepicture'),function(req,res,next){
  if (!req.file) {
      res.status(500);
      
      return next(err);
    } 
    fileurl='http://localhost:4000/images/' + req.file.filename;
    console.log(fileurl);
  return UserManagement.UpdateCustomer(req,res,fileurl);
})

router.get('/ViewCustomer/:id',(req,res)=>{
  return UserManagement.ViewCustomer(req,res);
})
router.get('/AdminViewCustomer',(req,res)=>{
  return UserManagement.AdminViewCustomer(req,res);
})
router.put('/AdminActivateCustomer',(req,res)=>{
  return UserManagement.AdminActivateCustomer(req,res);
})

//for testing purpose
router.get('/test',UserManagement.isSignedIn,(req,res)=>{
  return res.send("A protected route")
})

module.exports=router;