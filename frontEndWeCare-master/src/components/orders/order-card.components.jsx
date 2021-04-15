import React, { Component } from 'react'
import FeedBackModal from '../feedback-modal/feedback-modal.component';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import Constant from "../../api/api";
export default class OrderCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false
    }
  }
  updatestatus() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("placeorder_id", this.props.placeorder_id);
    urlencoded.append("orderstatus", "completed");

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(Constant.API_URL+"/UpdateOrderData", requestOptions)
      .then(response => response.text())
      .then(result => {
        
      })
      .catch(error => console.log('error', error));
  }
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  updatestatuscancel() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("placeorder_id", this.props.placeorder_id);
    urlencoded.append("orderstatus", "cancelled");

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(Constant.API_URL+"/UpdateOrderData", requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result) {
          toast.warn('Your Order is cancelled.you will get refund within 3-4 working days!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(error => console.log('error', error));
  }
  render() {
    return (

      <Card key={this.props.placeorder_id} naam={this.props.sub_servicename} className='card'>
        
          {/* <CardMedia
                     component="img"
                     alt="Contemplative Reptile"
                     height="140"
                     image={image}
                     title="Contemplative Reptile"
                   /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="cardstatus">
              {this.props.sub_servicename}
              
              <span className='price' style={{fontSize:16,marginTop:5}}>₹{this.props.price}</span>
            </Typography>

            <Typography className="spanTag" variant="body2" color="textSecondary" display="inline" style={{fontSize:15,marginTop:5,fontWeight:600}}>
            <div><span>Status:</span> {this.props.order_status=='pending'||this.props.order_status=='cancelled'||this.props.order_status=='rejected'?<span style={{color:"#d44000"}}>{this.Capitalize(this.props.order_status)}</span>:this.props.order_status=='completed'?<span style={{color:"#0779e4"}}>{this.Capitalize(this.props.order_status)}</span>:this.props.order_status=='confirmed'?<span style={{color:"green"}}>{this.Capitalize(this.props.order_status)}</span>:<span style={{color:"black"}}>{this.Capitalize(this.props.order_status)}</span>}
            </div>
            
            <span>Duration: {this.props.time_duration}</span>
            </Typography>
            {/* <Typography className="spanTag" variant="body2" color="textSecondary" display="inline">
            <span className="price" style={{fontSize:13,marginTop:5}}>Status: {this.props.order_status}</span>
            </Typography> */}
          </CardContent>
        
        <CardActions className="batonlist" style={{ padding: "0px!important" }}>
          {/* <Button size="small" className="baton">
            {this.props.order_status}
          </Button> */}

          {this.props.order_status === "completed" ?
            <Button size="small" className="baton baton1"
              onClick={() => this.setState({ modalShow: true })} >
              Feedback
                   </Button> : this.props.order_status === "confirmed" ? <Button size="small" className="baton baton1"
              onClick={() => this.updatestatus()} >
             Mark As Completed
                   </Button> : <div></div>}
          {
            this.props.order_status==="cancelled" ||this.props.order_status==="completed"||this.props.order_status==="rejected" ?
             this.props.order_status==="cancelled"?<div style={{height:32,color:"#ffe484",marginRight:65,paddingTop:3}}>Your Order is Cancelled</div>:this.props.order_status==="rejected"?<div style={{height:32,color:"#ffe484",marginRight:65,paddingTop:3}}>Your Order is Rejected</div>:<div style={{height:32,color:"#ffe484"}}></div>
            : <Button size="small" className="baton baton1"
            // style={{ marginRight: 10 }}
            onClick={() => this.updatestatuscancel()} >
            Cancel order
                   </Button>
          }
         

        </CardActions>
          <FeedBackModal
            name={this.props.sub_servicename}
            subid={this.props.subservice_id}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })} />
         <ToastContainer
           position="top-right"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
         />
      </Card>
    )
  }
}
