const client = require("../../Connection/connection");
const sgMail = require("@sendgrid/mail");
var nodemailer = require("nodemailer");
var EmailTemplates = require("swig-email-templates");
var dateFormat = require("dateformat");
const dotenv = require('dotenv');
dotenv.config();
exports.ViewOrderData = function(req, res) {
  (async () => {
    const vieworder = await client.query(
      "select p.customer_id,time_slot,placeorder_id ,s.sub_servicename ,s.price,s.time_duration ,p.area ,p.address ,c.firstname as customer_firstname,c.lastname as customer_lastname ,c.mobile_no as customer_mobileno ,p2.firstname as provider_firstname,p2.lastname as provider_lastname,p2.mobile_no as provider_mobileno,p.order_date ,p.order_status from placeorder p,customer c,provider p2,subservices s where c.customer_id =p.customer_id and s.subservice_id =p.subservice_id and s.provider_id =p2.provider_id  and order_status=$1",
      ["pending"],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json({
          status: "Success",
          data: response.rows,
          count: response.rowCount
        });
      }
    );
  })();
};

exports.ViewOrderCancelData = function(req, res) {
  (async () => {
    const vieworder = await client.query(
      "select p.customer_id,time_slot,placeorder_id ,s.sub_servicename ,s.price,s.time_duration ,p.area ,p.address ,c.firstname as customer_firstname,c.lastname as customer_lastname ,c.mobile_no as customer_mobileno ,p2.firstname as provider_firstname,p2.lastname as provider_lastname,p2.mobile_no as provider_mobileno,p.order_date ,p.order_status from placeorder p,customer c,provider p2,subservices s where c.customer_id =p.customer_id and s.subservice_id =p.subservice_id and s.provider_id =p2.provider_id  and order_status=$1",
      ["cancelled"],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json({
          status: "Success",
          data: response.rows,
          count: response.rowCount
        });
      }
    );
  })();
};

exports.UpdateOrderData = function(req, res) {
  (async () => {
    const orderupdatedata = req.body;
    const updateorder = await client.query(
      "update placeorder set order_status=$1 where placeorder_id=$2",
      [orderupdatedata.orderstatus, orderupdatedata.placeorder_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        } else {
          const query = client.query(
            "select email,order_date,firstname,lastname,sub_servicename from placeorder p ,customer c,subservices s where p.customer_id=c.customer_id and p.subservice_id =s.subservice_id and placeorder_id=$1",
            [orderupdatedata.placeorder_id],
            (error, response) => {
              if (error) {
                res.status(401).json(error);
              } else {
                const email = response.rows[0]["email"];
                const fname = response.rows[0]["firstname"];
                const lname = response.rows[0]["lastname"];
                const odate = response.rows[0]["order_date"];
                const sname = response.rows[0]["sub_servicename"];
                const dt = dateFormat(odate, "dS mmmm, yyyy");
              
                const clientWapp = require("twilio")(process.env.accountSid, process.env.authToken);

                clientWapp.messages
                  .create({
                    body:
                      "Dear " +
                      fname +
                      " " +
                      lname +
                      ", Your Order of " +
                      sname +
                      " cleaning is " +
                      orderupdatedata.orderstatus +
                      " for date of " +
                      dt +
                      " Thank you",
                    from: "whatsapp:+14155238886",
                    to: "whatsapp:+919426553286"
                  })
                  .then(message => console.log(message.sid))
                  .done();

                console.log(email);

                var smtpConfig = {
                  service: "smtp.gmail.com",
                  host: "smtp.gmail.com",
                  port: 587,
                  starttls: {
                    enable: true
                  },
                  secureConnection: true,
                  auth: {
                    user: "wecarehomecare.2511@gmail.com",
                    pass: "savaliya1234"
                  }
                };

                var templates = new EmailTemplates();
               
                var transporter = nodemailer.createTransport(smtpConfig);

                var context = {
                  email: "wecarehomecare.2511@gmail.com",
                  link: "www.google.co.in"
                };

                templates.render("activate_email.html", context, function(
                  err,
                  html,
                  text,
                  subject
                ) {
                  transporter.sendMail(
                    {
                      from: "wecarehomecare.2511@gmail.com", // sender address
                      to: email,
                      subject: "From WeCareHomecare Your Order Status details ",
                      text: "Your Order Status details ",
                      html:
                        "<h2>Dear " +
                        fname +
                        " " +
                        lname +
                        "</h2><strong>Your Order of " +
                        sname +
                        " cleaning is " +
                        orderupdatedata.orderstatus +
                        " for date of " +
                        dateFormat(odate, "dS mmmm, yyyy") +
                        "</strong><h2>Thank you!!</h2>"
                    },
                    function(err, reply) {
                      if (err) {
                        console.log(err);
                      } else {
                        res.status(200).json({
                          status: "Success",
                          msg: "Updated order Successfully"
                        });
                      }
                    }
                  );
                });
              }
            }
          );
        }
      }
    );
  })();
};

exports.HistoryOrderData = function(req, res) {
  (async () => {
    const historyorder = await client.query(
      "select p.customer_id ,s.sub_servicename ,s.price,s.time_duration ,p.area ,p.address ,c.firstname as customer_firstname,c.lastname as customer_lastname ,c.mobile_no as customer_mobileno ,p2.firstname as provider_firstname,p2.lastname as provider_lastname,p2.mobile_no as provider_mobileno,p.order_date ,p.order_status from placeorder p,customer c,provider p2,subservices s where c.customer_id =p.customer_id and s.subservice_id =p.subservice_id and order_status!=$1",
      ["pending"],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        } else {
          sgMail.setApiKey(
            "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"
          );
          const msg = {
            to: emailval.email, // Change to your recipient
            from: "wecarehomecare.2511@gmail.com", // Change to your verified sender
            subject: "WeCareHomecare Password Reset Code ",
            text: "Your Password Reset Otp is",
            html: "<strong>Your Password Reset Otp is " + otp + "</strong>"
          };
          sgMail
            .send(msg)
            .then(() => {
              res.status(200).json({
                status: "Success"
              });
              console.log("Email sent");
            })
            .catch(error => {
              console.error(error);
            });
        }
        res.status(200).json({
          status: "Success",
          data: response.rows
        });
      }
    );
  })();
};
