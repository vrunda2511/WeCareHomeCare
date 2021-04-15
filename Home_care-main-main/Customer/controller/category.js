const client=require("../../Connection/connection");
client.connect();
exports.getAllCategory=function(req,res){
    (async()=>{
        const getallservices=await client.query('select * from Services');
                // console.log(result.rows);
                // console.log(result.rowCount);
                res.status(200).json(getallservices.rows);
        })();    
}
exports.getCategoryByName=function(req,res){  
    (async()=>{
        const catname=req.params.catname;        
        const getserviceid=await client.query('select service_id from Services where service_name=$1',[catname]);
                        // console.log(result.rows);
                        // console.log(result.rowCount);
                // res.json(result.rows[0]['service_id']);
                const id=parseInt(getserviceid.rows[0]['service_id']);
                
                const getSubService=await client.query('select subservice_id,service_name,sub_servicename,firstname as providername,lastname as providerlname,long_description,short_description,subservices.image,price,time_duration from SubServices,Services,Provider where Provider.provider_id=SubServices.provider_id and SubServices.service_id=Services.service_id and SubServices.service_id=$1',[id]);
                res.json(getSubService.rows);
        })();    
}

exports.getAllSubCategory=function(req,res){  
        (async()=>{
            const catname=req.params.catname;        
            const getserviceid=await client.query('select * from SubServices',(error,response)=>{
                    if(error){
                            res.status(401).json(error);
                    }
                    res.status(200).json(response.rows);
            })
                            
        })();    
    }
    
    
    

