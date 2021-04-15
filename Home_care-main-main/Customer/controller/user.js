const client=require("../../Connection/connection");
var jwt=require('jsonwebtoken')
var expressJwt=require('express-jwt')
var nodemailer = require('nodemailer');
var EmailTemplates = require('swig-email-templates');
var crypto = require('crypto');


exports.Signup=function(req,res){
    (async()=>{
        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var key = 'password';

        const getuserdata=req.body;
        var cipher = crypto.createCipher(algorithm, key);  
        var encrypted = cipher.update(getuserdata.password, 'utf8', 'hex') + cipher.final('hex');
        console.log(encrypted)
        const checkemail=await client.query('select email from customer where email=$1',[getuserdata.email],(err,response)=>{
            if(response.rowCount===0){
                (async()=>{
                    const adduser=await client.query('insert into customer(firstname,lastname,gender,mobile_no,email,password,address,image,area,city) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[getuserdata.firstname,getuserdata.lastname,getuserdata.gender,getuserdata.mobile_no,getuserdata.email,encrypted,getuserdata.address,getuserdata.image,getuserdata.area,getuserdata.city],(error)=>{
                        if(error)
                        {
                            res.status(401).json(error);
                        }
                        var smtpConfig =  {
                            service: 'smtp.gmail.com',
                            host: 'smtp.gmail.com',
                            port: 587,
                            starttls: {
                                enable: true
                            },
                            secureConnection: true,
                            auth: {
                                user: 'wecarehomecare.2511@gmail.com',
                                pass: 'savaliya1234'
                            }
                        }
                    
                        var templates = new EmailTemplates();  
                        var transporter = nodemailer.createTransport(smtpConfig);   
                        
                        var context = {
                          email:'wecarehomecare.2511@gmail.com',
                          link : 'www.google.co.in'
                        };
                        
                        templates.render('activate_email.html', context, function(err, html,text, subject) {    
                        
                          transporter.sendMail({
                            from: 'wecarehomecare.2511@gmail.com', // sender address
                            to:getuserdata.email,
                            subject: "WeCareHomecare Account Created ",
                              text: "Congratulations,you have successfully created your account.Now you can enjoy our services.",
                              html: '<h1>Congratulations</h1><h3>You have successfully created your account. Now you can enjoy our services.</h3><h2 style="padding-top: 20px;">Our On-Demand Services</h2><a href="http://localhost:3000/"><img style="display:inline-block; margin:10px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkPjyQEMrs6mtBfLbcWUCBfZR7V7Y-0UprzQ&usqp=CAU" width="170" height="170" border="0"></a><a href="http://localhost:3000/"><img style="display:inline-block;margin:10px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvnY15Nf4OM82CycatyuVX9zb8gqpNs3LAw&usqp=CAU" width="170" height="170" border="0"></a><a href="http://localhost:3000/"><img style="display:inline-block;margin:10px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkPjyQEMrs6mtBfLbcWUCBfZR7V7Y-0UprzQ&usqp=CAU" width="170" height="170" border="0"></a><a href="http://localhost:3000/"><img style="display:inline-block;margin:10px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTdzvmYy9e5BCt1S3OyE9o287dDyHXA_lww&usqp=CAU" width="170" height="170" border="0"></a><h3>Thank You.</h3>'  
                            }, function(err, reply) {
                            if(err){
                              console.log(err)
                          
                            }
                            else{
                                res.status(200).json({
                                    status:"Success",
                                    msg:"User added Succesfully"
                                })
                            }});    
                    });
            
                    })
                })();
               
            }   
            else{
                res.status(401).json({
                    status:'Fail',
                    msg:'Email is alredy exist'
                })
            }
        })


        
    })();
}

exports.SignIn=function(req,res){
    (async()=>{
       
        const {email,password}=req.body;
        
        const checkemail=await client.query('select email,customer_id from customer where email=$1 and role=1',[email],(error,result)=>{
            if(error){
                res.status(401).json(error);
            }
            if(result.rowCount<=0){
                res.status(401).json({
                    status:'Fail',
                    msg:'Email  not exist'
                })
            }
            else
            {

                (async()=>{
                    const login=await client.query('select email,customer_id,firstname,lastname,role,password from customer where email=$1',[email],(error,logincreadancial)=>{
                        if(error){
                            res.status(401).json(error);
                        }
                        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
                        var key = 'password';
                        var decipher = crypto.createDecipher(algorithm, key);
                        var decrypted = decipher.update(logincreadancial.rows[0]['password'], 'hex', 'utf8') + decipher.final('utf8');
                        console.log(decrypted)
                        if(decrypted!==password){
                            res.status(401).json({
                                status:'Fail',
                                msg:'Password incorrect please try again'
                            })
                        }else{
                            // res.status(200).json({
                            //     status:'Succesfull',
                            //     msg:logincreadancial.rows
                            // })

                            //craete token
                            console.log("login")
                            const token=jwt.sign({_id:logincreadancial.rows[0]['customer_id']},"vrundasavaliya")
                            //put token in cookie
                            res.cookie('token',token,{expire:new Date()+9999})
                            //send responce to frontend
                            res.status(200).json({
                                status:"Success",
                                data:logincreadancial.rows,
                                token:token
            
                            })
                        }
                      
                       
                    })
                })();
            }
           //check login credancial
          
        })
    })();
}

exports.Signout=function(req,res){
    res.clearCookie("token")
    res.json({
        msg:"User Signout Successfully"
    });
};

exports.UpdateCustomer=function(req,res,fileurl){
    (async()=>{
        const updatedata=req.body;
        const customer_id=req.params.id;
        let dateobj=new Date();
        console.log(updatedata);
        console.log(fileurl);

        const updatecustomer=await client.query("update customer set firstname=$1,lastname=$2,mobile_no=$3,email=$4,address=$5,image=$6,area=$7,modified_date=$8,city=$9,gender=$10 where customer_id=$11",[updatedata.firstname,updatedata.lastname,updatedata.mobile_no,updatedata.email,updatedata.address,fileurl,updatedata.area,(dateobj.getMonth()+1)+'-'+dateobj.getDate()+'-'+dateobj.getFullYear(),updatedata.city,updatedata.gender,customer_id],(error)=>{
            if(error){
                 res.status(401).json(error);
            }
            res.status(200).json({
                msg:"Updated succesfully"
            })
        })
    })();
}

exports.ViewCustomer=function(req,res){
    (async()=>{
        const customer_id=req.params.id;
        const viewcustomer=await client.query("select customer_id, firstname,lastname,gender,mobile_no,email,address,image,area,city from customer where customer_id=$1",[customer_id],(error,responce)=>{
            if(error){
                 res.status(401).json(error);
            }
            res.status(200).json(
                responce.rows
            )
        })
    })();
}
exports.AdminViewCustomer=function(req,res){
    (async()=>{
        const Adminviewcustomer=await client.query("select  customer_id,role, firstname,lastname,gender,mobile_no,email,address,image,area,city from customer",(error,responce)=>{
            if(error){
                 res.status(401).json(error);
            }
            res.status(200).json(
                
                {
                    data:responce.rows,
                    count:responce.rowCount
                }
                
            )
        })
    })();
}
exports.AdminActivateCustomer=function(req,res){
    (async()=>{
        const roleview=req.body;
        const Adminviewcustomer=await client.query("update customer set role=$1 where customer_id=$2",[roleview.role,roleview.customer_id],(error,responce)=>{
            if(error){
                 res.status(401).json(error);
            }
            res.status(200).json(
                {
                    status:"Success",
                    msg:"Updated Successfully"
                }
                
            )
        })
    })();
}

//protected routes
exports.isSignedIn=expressJwt({
    secret: "vrundasavaliya",
    userProperty: "auth",
    algorithms: ['HS256']
});