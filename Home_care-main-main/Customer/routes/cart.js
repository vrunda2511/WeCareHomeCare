const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')
var cart=require('../controller/cart')

router.post('/AddToCart',(req,res)=>{
    return cart.AddToCart(req,res);
})

router.delete('/RemoveFromCart/:id',(req,res)=>{
    return cart.RemoveFromCart(req,res);
})
router.delete('/RemoveFromCartservice/:id',(req,res)=>{
    return cart.RemoveFromCartservice(req,res);
})

router.get('/ViewFromCart/:id',(req,res)=>{
    return cart.ViewFromCart(req,res);
})
router.get('/ViewFromCartservicelist/:id',(req,res)=>{
    return cart.ViewFromCartservicelist(req,res);
})
router.get('/ViewFromCarttotal/:id',(req,res)=>{
    return cart.ViewFromCarttotal(req,res);
})
router.get('/ViewFromCartserviceId/:id',(req,res)=>{
    return cart.ViewFromCartserviceId(req,res);
})
router.get('/viewordercount/:id',(req,res)=>{
    return cart.ViewOrderCount(req,res);
})
router.post('/stripepayment',(req,res)=>{
    return cart.makePayment(req,res);
})
router.get('/ViewFromCartTotalPrice/:id',(req,res)=>{
    return cart.ViewFromCartTotalPrice(req,res);
})  
router.get('/Getcity',(req,res)=>{
    return cart.Getcity(req,res);
})
router.get('/Getarea/:city',(req,res)=>{
    return cart.Getarea(req,res);
})
router.get('/Getpincode/:area',(req,res)=>{
    return cart.Getpincode(req,res);
})

module.exports=router;