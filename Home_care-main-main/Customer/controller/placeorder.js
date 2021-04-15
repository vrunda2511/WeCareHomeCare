const client=require("../../Connection/connection");

exports.PlaceOrder=function(req,res){
    (async()=>{
        const orderdata=req.body;
        const placeorder=await client.query('insert into Placeorder(customer_id,subservice_id,address,area,amount,city,pincode,order_date,time_slot) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',[orderdata.customer_id,orderdata.subservice_id,orderdata.address,orderdata.area,orderdata.amount,orderdata.city,orderdata.pincode,orderdata.order_date,orderdata.time_slot],(error)=>{
            if(error){
                return res.status(401).json(error);
            }
            client.query('update cart set status=1  where customer_id=$1 and subservice_id=$2 ',[orderdata.customer_id,orderdata.subservice_id]);
      
            res.status(200).json({
                status:"success",
                msg:"Order Placed Succesfully you will get conformation soon"
            })
        })
    })();
}

exports.ViewOrder=function(req,res){
    (async()=>{
        const customer_id=req.params.id;    
        const odate=req.body;   
        
        const placeorder=await client.query('select placeorder_id,sub_servicename,s.subservice_id,price,time_duration,order_date,order_status from placeorder p left join subservices s on s.subservice_id =p.subservice_id where customer_id=$1 and order_date=$2 order by placeorder_id',[customer_id,odate.odate],(error,response)=>{
            if(error){
                return res.status(401).json(error);
            }
            
            res.status(200).json(response.rows
            )
        })
    })();
}

exports.ViewOrderDates=function(req,res){
    (async()=>{
        const customer_id=req.params.id;        
        const placeorder=await client.query('select order_date  as order_date from placeorder p left join subservices s on s.subservice_id =p.subservice_id where customer_id=$1 group by order_date order by order_date DESC',[customer_id],(error,response)=>{
            if(error){
                return res.status(401).json(error);
            }
            
            res.status(200).json(response.rows)
        })
    })();
}

exports.ViewOrderAddress=function(req,res){
    (async()=>{
        const customer_id=req.params.id;        
        const placeorderaddress=await client.query('select customer_id,address,area,city from customer where customer_id=$1',[customer_id],(error,response)=>{
            if(error){
                return res.status(401).json(error);
            }
            res.status(200).json(response.rows[0]
            )
        })
    })();
}


