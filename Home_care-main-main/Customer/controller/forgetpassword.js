const client = require("../../Connection/connection");
var nodemailer = require('nodemailer');
var EmailTemplates = require('swig-email-templates');
var crypto = require('crypto');

exports.Otpsend = function (req, res) {
  (async () => {
    const emailval = req.body;
    const verifymail = await client.query(
      "select customer_id from customer where email =$1",
      [emailval.email],
      (error, response) => {
        if (error) {
          res, status(401).json(error);
        } else {
          if (response.rowCount == 1) {
            var otp = Math.floor(1000 + Math.random() * 9000);
            console.log(otp);
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
              to:emailval.email,
              subject: "WeCareHomecare Password Reset Code ",
                text: "Your Password Reset Otp is",
                html: "<strong>Your Password Reset Otp is " + otp + "</strong>"
                   
            }, function(err, reply) {
              if(err){
                console.log(err)
            
              }
              else{
                res.status(200).json({
                        status: "Success",
                      });
            
              }});    
      });

            const otpval = client.query(
              "insert into emailotp(email,otp) values($1,$2)",
              [emailval.email, otp]
            );
          } else {
            res.status(200).json({
              status: "Failed",
              msg: "Email is not valid",
              val: response.rowCount,
            });
          }
        }
      }
    );
  })();
};

exports.Verifyotp = function (req, res) {
  (async () => {
    const verifyvalues = req.body;
    console.log(verifyvalues.email);
    const verifyotp = await client.query(
      "select customer_id from emailotp ,customer where customer.email=emailotp.email and emailotp.email=$1 and otp=$2 and otp_status=$3",
      [verifyvalues.email, verifyvalues.otp, 0],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        } else {
          if (response.rowCount == 1) {
            client.query("update emailotp set otp_status=$1 where email=$2", [
              1,
              verifyvalues.email,
            ]);
            res.status(200).json({
              status: "Success",
              msg: response.rows,
            });
          } else {
            res.status(200).json({
              status: "Failed",
              msg: "OTP is not Correct",
              val: response.rowCount,
            });
          }
        }
      }
    );
  })();
};

//forget password
exports.ForgetPassword = function (req, res) {
  (async () => {
    var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
    var key = 'password';
    const forgetpass = req.body;
    // const checkoldpasswpord=await client.query('select customer_id from customer where password=$1',[updatepass.oldpassword],(error,response)=>{

    // })
    var cipher = crypto.createCipher(algorithm, key);  
    var encrypted = cipher.update(forgetpass.password, 'utf8', 'hex') + cipher.final('hex');
    const forgetpassword = await client.query(
      "update customer set password=$1 where customer_id=$2",
      [encrypted, forgetpass.customer_id],
      (error) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json({
          status: "Success",
          msg: "Password Reset Successfully",
        });
      }
    );
  })();
};

exports.UpdatePassword = function (req, res) {
  (async () => {
    const updatepass = req.body;
    
    const checkoldpasswpord = await client.query(
      "select customer_id,password from customer where customer_id=$1",
      [updatepass.customer_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        } else {
          var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
          var key = 'password';
          var decipher = crypto.createDecipher(algorithm, key);
          var decrypted = decipher.update(response.rows[0]['password'], 'hex', 'utf8') + decipher.final('utf8');
          console.log(decrypted)
          if (updatepass.oldpassword===decrypted) {
            (async () => {
              var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
              var key = 'password';

              var cipher = crypto.createCipher(algorithm, key);  
              var encrypted = cipher.update(updatepass.newpassword, 'utf8', 'hex') + cipher.final('hex');
              const updatepassword = await client.query(
                "update customer set password=$1 where customer_id=$2",
                [encrypted, updatepass.customer_id],
                (error) => {
                  if (error) {
                    res.status(401).json(error);
                  }
                  res.status(200).json({
                    status: "Success",
                    msg: "Password Updated Successfully",
                  });
                }
              );
            })();
          } else {
            res.status(200).json({
              status: "failed",
              msg: "Your old password is not correct",
            });
          }
        }
      }
    );
  })();
};
