import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './cart-card.styles.css'
import { ToastContainer, toast } from 'react-toastify';
import Constant from "../../api/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function CartCard({ cart_id, cartid, sub_servicename, subservice_id, price, time_duration, image }) {
  var subserviceKIID = []

  function removecart(event) {

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(Constant.API_URL+"/RemoveFromCart/" + cart_id, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        toast.warn('Service Removed Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(function () {
          // window.location.reload(false);
      }, 100);
      })
      .catch(error => console.log('error', error));
    
  }




  const classes = useStyles();
  const theme = useTheme();
  var res = [];

  
  return (
    
    

    <Card className={classes.root, 'col-md-6', 'cartCard'}>
      <div className={classes.details}>
        <CardContent className={classes.content}>

          <Typography component="h5" variant="h5">
            {sub_servicename}
            {subserviceKIID.push(subservice_id)}
            {/* {console.log(subserviceKIID)} */}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            ₹{price}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Duration: {time_duration}
          </Typography>
          <Button variant="contained" style={{background:"#ffe484",backgroundColor:"#ffe484",border:"1px bold #ffe484",borderColor:"#000",color:"#000",fontWeight:"bold",marginBottom:10}} color="secondary" onClick={(e) => removecart()}>
            Remove
            </Button>
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
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover, 'cartImage'}
        image={image}
        title="Live from space album cover"
      />
    </Card>

  );
}