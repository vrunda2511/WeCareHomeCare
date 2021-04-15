const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')
var multer  = require('multer');

var SubServiceManagement=require('../controller/subservice');

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



router.post('/AddSubService',upload.single('profilepicture'),function(req,res,next){
    if (!req.file) {
        res.status(500);
        
        return next(err);
      } 
      fileurl='http://localhost:4000/images/' + req.file.filename
    return SubServiceManagement.AddSubService(req,res,fileurl);
});

router.put('/UpdateSubService/:id',upload.single('profilepicture'),function(req,res,next){
  if (!req.file) {
      res.status(500);
      
      return next(err);
    } 
    fileurl='http://localhost:4000/images/' + req.file.filename
    return SubServiceManagement.UpdateSubService(req,res,fileurl);
})

router.delete('/DeleteSubService/:id',function(req,res){
    return SubServiceManagement.DeleteSubService(req,res);
})

module.exports=router;