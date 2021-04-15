const client=require("../../Connection/connection");


exports.AddFeedback=function(req,res){
    (async()=>{
        const feedbackdata=req.body;
        const customer_id=req.params.id;
        const addfeedback=await client.query('insert into feedback(customer_id,subservice_id,review,rating) values($1,$2,$3,$4)',[customer_id,feedbackdata.subservice_id,feedbackdata.review,feedbackdata.rating],(error)=>{
            if(error){
                res.status(401).json(error);
            }
                res.status(200).json({
                status:'Success',
                msg:'Feedback Added Succesfully'
            })
        })
    })();
}

exports.ViewFeedback=function(req,res){
    (async()=>{
        const subservice_id=req.params.id;
        const viewfeedback=await client.query('select avg(rating) from Feedback left join Customer on Customer.customer_id=Feedback.customer_id where subservice_id=$1 and Feedback.status=1',[subservice_id],(error,response)=>{
            if(error){
                res.status(401).json(error);
            }
                res.status(200).json(
                response.rows
            )
        })
    })();
}
exports.ViewFeedbackhistory=function(req,res){
    (async()=>{
        const subservice_id=req.params.id;
        const viewfeedback=await client.query('select * from Feedback left join Customer on Customer.customer_id=Feedback.customer_id where subservice_id=$1 and Feedback.status=1',[subservice_id],(error,response)=>{
            if(error){
                res.status(401).json(error);
            }
                res.status(200).json(
                response.rows
            )
        })
    })();
}


exports.AdminViewFeedback=function(req,res){
    (async()=>{
        const adminviewfeedback=await client.query('select feedback_id,Feedback.status, c.firstname as customername ,c.lastname as customerlastname,p.firstname as providername,p.lastname as providerlastname,review,rating,Feedback.created_date,sub_servicename,service_name,rating from customer c ,services s ,subservices s2,provider p,feedback where feedback.subservice_id =s2.subservice_id and feedback.customer_id =c.customer_id and s2.provider_id=p.provider_id and s.service_id =s2.service_id order by feedback.status',(error,response)=>{
            if(error){
                res.status(401).json(error);
            }
                res.status(200).json(
               
                    {
                        data:response.rows,
                        count:response.rowCount
                    }
            )
        })
    })();
}

exports.DeleteFeedback=function(req,res){
    (async()=>{
        const feedback_id=req.params.id;

        const deletefeedback=await client.query('delete from feedback where feedback_id=$1',[feedback_id],(error)=>{
            if(error){
                res.status(401).json(error);
            }
                res.status(200).json({
                status:'Success',
                msg:"Feedback Deleted"
            })
        })
    })();
}

exports.ApproveFeedbackStatus=function(req,res){
    (async()=>{
        const feedback_id=req.params.id;

        const approvefeedback=await client.query('update feedback set status=$1 where feedback_id=$2',[1,feedback_id],(error)=>{
            if(error){
                res.status(401).json(error);
            }
                res.status(200).json({
                status:'Success',
                msg:"Feedback Updated"
            })
        })
    })();
}





