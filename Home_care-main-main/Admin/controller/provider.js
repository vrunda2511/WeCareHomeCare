const client=require("../../Connection/connection");


exports.AddProvider=function(req,res,fileurl){
    (async()=>{
        const getproviderdata=req.body;
        const addprovider=await client.query('insert into Provider(firstname,lastname,gender,mobile_no,email,address,image,area) values($1,$2,$3,$4,$5,$6,$7,$8)',[getproviderdata.firstname,getproviderdata.lastname,getproviderdata.gender,getproviderdata.mobile_no,getproviderdata.email,getproviderdata.address,fileurl,getproviderdata.area],(error)=>{
            if(error){
                res.status(401).json(error);
              }
              res.status(200).json({
                status:"Success",
                msg:"Inserted Succesfully"
              })
        })
    })();
}
exports.UpdateProvider=function(req,res,fileurl){
    (async()=>{
        const getproviderdata=req.body;
        const provider_id=req.params.id;
        let dateobj=new Date();
        const updatecustomer=await client.query("update Provider set firstname=$1,lastname=$2,gender=$3,mobile_no=$4,email=$5,address=$6,image=$7,area=$8,modified_date=$9 where provider_id=$10",[getproviderdata.firstname,getproviderdata.lastname,getproviderdata.gender,getproviderdata.mobile_no,getproviderdata.email,getproviderdata.address,fileurl,getproviderdata.area,(dateobj.getMonth()+1)+'-'+dateobj.getDate()+'-'+dateobj.getFullYear(),provider_id],(error,responce)=>{
            if(error)
            {
                res.status(401).json(error);
            }
            res.status(200).json({
                status:"Success",
                msg:"Provider Updated Succesfully"
            })
        })
    })();
}

exports.Deleteprovider=function(req,res){

    (async()=>{
      const provider_id=req.params.id;
      const deletesubservice=await client.query('delete from provider where provider_id=$1',[provider_id],(error)=>{
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

exports.ViewProvider=function(req,res){
    (async()=>{
        const viewProvider=await client.query("Select firstname,lastname,gender,email,mobile_no,address,area,image,provider_id from provider",(error,response)=>{
            if(error){
                return res.status(401).json(Error);
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