const Client=require('pg').Pool
const dotenv = require('dotenv');
dotenv.config();

const client=new Client({
    host:process.env.NODE_APP_HOST,
    port:process.env.NODE_APP_PORT,
    user:process.env.NODE_APP_USER,
    password:process.env.NODE_APP_PASSWORD,
    database:process.env.NODE_APP_DATABASE
})
client.on("connect",()=>{
    console.log("Database connected");
})
client.on("end",()=>{
    console.log("Database disconnected");
})
module.exports=client;
