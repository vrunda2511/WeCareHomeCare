var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var app=express();

//customer
const CustomerCategoryRoutes=require('./Customer/routes/category');
const UserRoutes=require('./Customer/routes/user')
const FeedbackRoutes=require('./Customer/routes/feedback')
const addtocart=require('./Customer/routes/cart');
const Placeorder=require('./Customer/routes/placeorder')

const ForgetPassword=require('./Customer/routes/forgetpassword');


//admin
const AdminServiceRoutes=require('./Admin/routes/service');
const AdminSubServiceRoutes=require('./Admin/routes/subservice');
const AdminProviderRoutes=require('./Admin/routes/provider');
const AdminOrderRoutes=require('./Admin/routes/order');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )



app.use('*/images', express.static('uploads/images'))
  //customers

app.use('/api',CustomerCategoryRoutes)
app.use('/api',UserRoutes);
app.use('/api',FeedbackRoutes);
app.use('/api',addtocart)
app.use('/api',Placeorder)
app.use('/api',ForgetPassword)


//Admin
app.use('/api',AdminServiceRoutes)
app.use('/api',AdminSubServiceRoutes)
app.use('/api',AdminProviderRoutes)
app.use('/api',AdminOrderRoutes)  



const port=4000;
app.listen(port,()=>{
    console.log("app is running"+port);
})