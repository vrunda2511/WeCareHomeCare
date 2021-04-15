import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./subserviceCard.styles.css";
import MyVerticallyCenteredModal from '../subServiceModal/subServiceModel.component'
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import FeedBackShowModal from '../feedback-modal/feedbackShow-modal.component';
import Constant from "../../api/api";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartSharp';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});



export default function SubserviceCard({ sub_servicename, short_description, price, time_duration, image, long_description, service_name, subserviceId }) {
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [reviewShow, setReviewShow] = React.useState(false);

  const [status, setstatus] = React.useState([]);

  const [cart, setCart] = useState(false);
  const [feedback, setFeedback] = useState([{ avg: '' }]);
  let history = useHistory();
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const customerid = localStorage.getItem("customer_id")
    fetch(Constant.API_URL + "/ViewFeedback/" + subserviceId, requestOptions)
      .then(response => response.json())
      .then(result => setFeedback(result))
      .catch(error => console.log('error', error));
    if (localStorage.getItem("token") !== null) {
      fetch(Constant.API_URL + "/ViewFromCartservicelist/" + customerid, requestOptions)
        .then(response => response.json())
        .then(result => setstatus(result))
        .catch(error => console.log('error', error));
    }


  }, [subserviceId])
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const customerid = localStorage.getItem("customer_id")

      fetch(Constant.API_URL + "/ViewFromCartservicelist/" + customerid, requestOptions)
        .then(response => response.json())
        .then(result => setstatus(result))
        .catch(error => console.log('error', error));
    }
    // console.log(status)
  }, [status])
  let count = feedback.map(({ avg }) => parseFloat(avg))
  // console.log(status)


  function addtocart(subserviceId) {
    if (localStorage.getItem("token") === null) {
      toast.warn('Login is required!! ', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(function () {
        history.push("/signin")
      }, 3000);

    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("subservice_id", subserviceId);
      urlencoded.append("customer_id", localStorage.getItem("customer_id"));

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch(Constant.API_URL + "/AddToCart", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          toast.success('Added to Cart Successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCart(true)
        })
        .catch(error => console.log('error', error));
    }

  };

  function removefromcart(subserviceId) {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(Constant.API_URL + "/RemoveFromCartservice/" + subserviceId, requestOptions)
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


  };

  const arr = []
  function cartstatus() {
    if (localStorage.getItem("token") !== null) {
      status.map(({ sid }) => arr.push(sid))
      if (arr.includes(subserviceId)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }

  }


  const val = cartstatus();
  // console.log(val)

  return (
    <div className='subServiceCard'>
      <Card className={classes.root, 'card'}>
        <CardActionArea onClick={() => setModalShow(true)}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {sub_servicename}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {short_description}
            </Typography>
            <Typography className="spanTag" variant="body2" color="textSecondary" display="inline">
              <span className='price'>₹{price}</span><span>Duration: {time_duration}</span>
            </Typography>

          </CardContent>
        </CardActionArea>

        <div className="ratings" >
          <CardActionArea onClick={() => setReviewShow(true)}>

            <Rating
              name="read-only"
              value={count[0]}
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              readOnly
            />
          </CardActionArea>

          <Button size="small" style={{ marginRight: 20 }} onClick={() => setReviewShow(true)}>
            Reviews
        </Button>
          <FeedBackShowModal
            show={reviewShow}
            onHide={() => setReviewShow(false)}
            subserv_id={subserviceId}
          />
        </div>

        <CardActions className="baton">


          {val
            ?
            <div

              style={{ marginLeft: 10 }}> <Button size="small"
                style={{ marginLeft: 5 }}
                className="baton baton1" onClick={(e) => { removefromcart(subserviceId); }} >
                Remove From Cart <RemoveShoppingCartIcon style={{ marginLeft: 5 }} />
              </Button></div>
            :
            <Button size="small"
              style={{ marginLeft: 5 }}
              className="baton baton1" onClick={(e) => { addtocart(subserviceId); }} >
              Add To Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
            </Button>}


          <Button size="small" className="baton" onClick={() => setModalShow(true)}>
            View More
        </Button>

        </CardActions>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          long_description={long_description}
          sub_servicename={sub_servicename}
          service_name={service_name}
        />
      </Card>
    </div>
  );
}