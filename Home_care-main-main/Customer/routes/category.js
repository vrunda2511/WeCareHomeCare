const express=require('express');
const router=express.Router();

 var getcategory=require('../controller/category');

 router.get("/getAllCategory/",function(req,res){
   return getcategory.getAllCategory(req,res);
 });

 router.get("/getCategoryByName/:catname",function(req,res){
  return getcategory.getCategoryByName(req,res);
});

router.get("/getAllSubCategory",function(req,res){
  return getcategory.getAllSubCategory(req,res);
});
module.exports=router;