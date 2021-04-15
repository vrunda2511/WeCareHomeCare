const client=require("../../Connection/connection");

exports.AddSubService=function(req,res,fileurl){
    (async()=>{
         let subservicedata=req.body;
        const getserviceid=await client.query("select service_id from services where service_name=$1",[subservicedata.service_name]);
        const id=parseInt(getserviceid.rows[0]['service_id']);
        (async()=>{
          const addsubservice=await client.query("insert into SubServices(service_id,provider_id,sub_servicename,image,price,short_description,long_description,time_duration) values($1,$2,$3,$4,$5,$6,$7,$8)",[id,1,subservicedata.sub_servicename,fileurl,subservicedata.price,subservicedata.short_description,subservicedata.long_description,subservicedata.time_duration],(error)=>{

            if(error){
              res.status(401).json(error);
            }
            res.status(200).json({
              status:"Success",
              msg:"Inserted Succesfully"
            })
          })
        })();
       
    })();
}


exports.UpdateSubService=function(req,res,fileurl){
  (async()=>{
      const updatesubservicedata=req.body;
      const subserviceid=req.params.id;
      let dateobj=new Date();
      const updateservice=await client.query('update SubServices set sub_servicename=$1,price=$2,short_description=$3,long_description=$4,time_duration=$5,modified_date=$6,image=$7 where subservice_id=$8',[updatesubservicedata.sub_servicename,updatesubservicedata.price,updatesubservicedata.short_description,updatesubservicedata.long_description,updatesubservicedata.time_duration,(dateobj.getMonth()+1)+'-'+dateobj.getDate()+'-'+dateobj.getFullYear(),fileurl,subserviceid],(error)=>{
        if(error){
          res.status(401).json(error);
        }
        res.status(200).json({
          status:"Success",
          msg:"Updated Successfully"
        })
      })
  })();
}

exports.DeleteSubService=function(req,res){

    (async()=>{
      const subserviceid=req.params.id;
      const deletesubservice=await client.query('delete from SubServices where subservice_id=$1',[subserviceid],(error)=>{
        if(error){
          res.status(401).json(error);
        }
        res.status(200).json({
          status:"Success",
          msg:"Deleted Successfully"
        })

      })
    })();
}