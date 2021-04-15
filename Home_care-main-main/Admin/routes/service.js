const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')
var multer  = require('multer');
var ServiceManagement=require('../controller/service');

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

router.post('/AddService',upload.single('profilepicture'),function(req,res,next){
    if (!req.file) {
        res.status(500);
        
        return next(err);
      } 
      fileurl='http://localhost:4000/images/' + req.file.filename
     return ServiceManagement.AddService(req,res,fileurl);
});

router.put('/UpdateService/:id',upload.single('profilepicture'),function(req,res,next){
  if (!req.file) {
      res.status(500);
      
      return next(err);
    } 
    fileurl='http://localhost:4000/images/' + req.file.filename
    return ServiceManagement.UpdateService(req,res,fileurl);
});

router.delete('/DeleteService/:id',function(req,res){
    return ServiceManagement.DeletedService(req,res);
});



module.exports=router;