const client = require("../../Connection/connection");
const stripe = require("stripe")(
  "sk_test_51IXjemSHvBWeZixYSsCKGIqjNMNsUU1LfOfpy7qz3NrNnL9NuIPhrcqG00oRfsUhN4u77HHKnQSA7raxQqv5Ew5O00lpt9lPxY"
);
const { v4: uuidv4 } = require("uuid");

exports.AddToCart = function(req, res) {
  (async () => {
    const cartdata = req.body;
    const addtocart = await client.query(
      "insert into cart(subservice_id,customer_id) values($1,$2)",
      [cartdata.subservice_id, cartdata.customer_id],
      error => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json({
          status: "Success",
          msg: "Service Added into cart"
        });
      }
    );
  })();
};

exports.RemoveFromCart = function(req, res) {
  (async () => {
    const cart_id = req.params.id;
    const removefromcart = await client.query(
      "delete from cart where cart_id=$1",
      [cart_id],
      error => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json({
          status: "Success",
          msg: "Service removed from cart"
        });
      }
    );
  })();
};
exports.RemoveFromCartservice = function(req, res) {
  (async () => {
    const subservice_id = req.params.id;
    const removefromcart = await client.query(
      "delete from cart where subservice_id=$1 and status=0",
      [subservice_id], 
      error => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json({
          status: "Success",
          msg: "Service removed from cart"
        });
      }
    );
  })();
};
exports.ViewFromCart = function(req, res) {
  (async () => {
    const customer_id = req.params.id;
    const viewfromcart = await client.query(
      "select * from cart,subservices where cart.subservice_id=subservices.subservice_id and customer_id=$1 and status=0",
      [customer_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json(response.rows);
      }
    );
  })();
};

exports.ViewFromCartservicelist = function(req, res) {
  (async () => {
    const customer_id = req.params.id;
    const viewfromcart = await client.query(
      "select subservices.subservice_id as sid from cart,subservices where cart.subservice_id=subservices.subservice_id and customer_id=$1 and status=0",
      [customer_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json(response.rows);
      }
    );
  })();
};



exports.ViewFromCarttotal = function(req, res) {
  (async () => {
    const customer_id = req.params.id;
    const viewfromcart = await client.query(
      "select sum(price) from cart,subservices where cart.subservice_id=subservices.subservice_id and customer_id=$1 and status=0",
      [customer_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json(response.rows[0]);
      }
    );
  })();
};
exports.ViewFromCartserviceId = function(req, res) {
  (async () => {
    const customer_id = req.params.id;
    const viewfromcart = await client.query(
      "select subservices.subservice_id,subservices.price from cart,subservices where cart.subservice_id=subservices.subservice_id and customer_id=$1 and status=0",
      [customer_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json(response.rows);
      }
    );
  })();
};
exports.ViewOrderCount = function(req, res) {
  (async () => {
    const customer_id = req.params.id;
    const viewordercount = await client.query(
      "select distinct subservices.subservice_id from cart,subservices where cart.subservice_id=subservices.subservice_id and customer_id=$1",
      [customer_id],
      (error, response) => {
        if (error) {
          res.status(401).json(error);
        }
        res.status(200).json(response.rows);
      }
    );
  })();
};
exports.ViewFromCartTotalPrice=function(req,res){
    (async()=>{
        const customer_id=req.params.id;
        const viewfromcart=await client.query("select  sum(price) price  from cart,subservices where cart.subservice_id=subservices.subservice_id and customer_id=$1 and status=0",[customer_id],(error,response)=>{

            if(error){
                res.status(401).json(error);
            }
            res.status(200).json(response.rows[0]
            )
        })
    })();

}

exports.Getcity=function(req,res){
  (async()=>{
     
      const getcity=await client.query("select city from area group by city ",(error,response)=>{

          if(error){
              res.status(401).json(error);
          }
          res.status(200).json(response.rows
          )
      })
  })();

}
exports.Getarea=function(req,res){
  (async()=>{
     const val=req.params.city;
      const getarea=await client.query("select area_name from area where city=$1 ",[val],(error,response)=>{

          if(error){
              res.status(401).json(error);
          }
          res.status(200).json(response.rows
          )
      })
  })();

}
exports.Getpincode=function(req,res){
  (async()=>{
     const val=req.params.area;
      const getpincode=await client.query("select pincode from area where area_name=$1 ",[val],(error,response)=>{

          if(error){
              res.status(401).json(error);
          }
          res.status(200).json(response.rows[0]
          )
      })
  })();

}

exports.makePayment = (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS", products);
  let amount = 0;
  amount = products;
  const idempotencyKey = uuidv4();
  console.log("token", token.email);
  console.log("id", token.id);

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      console.log(token.card.address_line1);
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the product`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
          },

          {
            idempotencyKey
          }
        )
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
