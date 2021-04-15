const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')


 
var forgetpass=require('../controller/forgetpassword');

router.post('/Otpsend',(req,res)=>{
    return forgetpass.Otpsend(req,res);
})

router.post('/Verifyotp',(req,res)=>{
    return forgetpass.Verifyotp(req,res);
})

router.put('/ForgetPassword',(req,res)=>{
    return forgetpass.ForgetPassword(req,res);
})

router.put('/UpdatePassword',isSignedIn,(req,res)=>{
    return forgetpass.UpdatePassword(req,res);
})

module.exports=router;