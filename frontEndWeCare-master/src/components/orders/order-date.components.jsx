import React, { Component } from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import "./orders.styles.css"
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import image from '../../images/nodatafound.png'
import Constant from "../../api/api";

export default class OrderByDate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ordersDate: []
            
        }
    }


    componentDidMount() {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



var requestOptions = {
  method: 'GET',
  headers: myHeaders,

  redirect: 'follow'
};
var customer_id = localStorage.getItem("customer_id");

fetch(Constant.API_URL+"/ViewOrderDates/"+customer_id, requestOptions)
  .then(response => response.json())
  .then(data => this.setState({ ordersDate: data }))
  .catch(error => console.log('error', error));
    }


    render() {
        if(this.state.ordersDate.length==0){
            return(
                <div className='header'>
                   <img src={image} alt='logo' style={{ height: "200px",margin:100 }} />
                </div>
            )
        }
        else{
            return (
          
                <div >
                    <div className='header'>
                        Your Orders
                         </div>
                    <div className='container-fluid, row nthcard, lissst'>
                        {this.state.ordersDate.map(({ order_date }) => (
                            <div key={order_date} className='orderCard'>
                                <Card  className='card' style={{marginBottom:160}}>
        {/* <CardActionArea> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h5">
            Order For: <br />{dateFormat(order_date, "dS mmmm, yyyy")}
            </Typography>
          </CardContent>
        {/* </CardActionArea> */}
        <CardActions className="baton">
          
          <Link size="small" className="baton" style={{marginLeft:10}}  to={{ pathname: '/yourorders', state: order_date }}>View Orders</Link>
        </CardActions>
      </Card>
                            </div>
                        ))} 
                    </div>
                </div>
            )
        }
      
    }
}