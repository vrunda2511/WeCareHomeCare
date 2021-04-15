import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import dateFormat from 'dateformat';
import { ToastContainer, toast } from 'react-toastify';
import Constant from "../../api/api";
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { animateScroll as scroll } from 'react-scroll';
import Conformation from "./conformation-component";



const StripeCheckout = ({
  products,
  orderaddress, 
  cartState,
  areaState,
  cityState,
  pincodeState,
  dateState,
  timeState,
  hide,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });
  const [modal1Show, setModal1Show] = React.useState(false);
  const [placestatus, setplacestatus] = React.useState(false);
  // console.log(placestatus);


// console.log(cartState)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("customer_id")
const history=useHistory()
  const getFinalAmount = () => {
    // console.log("products",products);
     let amount = 0;
   
      amount = products;
 
    return amount;
  };
  let totalPrice = 0
  let subserviceKIID = [];
  let subserviceKPrice = [];


  const AddId=()=> {
      subserviceKIID = [];
      subserviceKPrice = [];
      cartState.map(({ subservice_id, price }) => {
          if (subserviceKIID.indexOf(subservice_id) === -1) {
              subserviceKIID.push(subservice_id)
              subserviceKPrice.push(price)
              totalPrice = totalPrice + price
          }
          console.log(subserviceKIID, subserviceKPrice)
      })
  }
  const makePayment = token => {
    
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`http://localhost:4000/api/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
    .then(response => {
      console.log(response);
      localStorage.setItem("status",true);
      //call further methods
      const{status}=response;
      console.log("STATUS",status)
      afterSubmit();

      })
      .catch(error => console.log(error));



      
  };
  const afterSubmit=(event)=>{
    //  event.preventDefault();
    // console.log(dateSlot+""+this.state.timeSlot)
    var customer_id=localStorage.getItem("customer_id");
    // console.log("vacity" + this.state.cityval)
    var GivenDate = dateState;
    var CurrentDate = new Date();
    CurrentDate = dateFormat(CurrentDate, "yyyy-mm-dd")
    // GivenDate = new Date();
    console.log(CurrentDate, pincodeState.pincode, GivenDate, timeState,dateState, cityState,areaState,subserviceKIID.length)
    if (pincodeState == "" || GivenDate == "" || timeState == "") {
        toast.error('All Fields Are Required', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else if (GivenDate < CurrentDate) {
        toast.error('Please enter valid date', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else {
        AddId();
        let i;
        for (i = 0; i < subserviceKIID.length; i++) {
            console.log(subserviceKIID[i], orderaddress.address,orderaddress.area,orderaddress.city, subserviceKPrice[i], dateState, timeState, pincodeState)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("customer_id", customer_id);
            urlencoded.append("subservice_id", subserviceKIID[i]);
            urlencoded.append("address", orderaddress.address);
            urlencoded.append("area", areaState);
            urlencoded.append("amount", subserviceKPrice[i]);
            urlencoded.append("city",cityState);
            urlencoded.append("pincode",pincodeState.pincode);
            urlencoded.append("order_date",dateState);
            urlencoded.append("time_slot", timeState);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch(`http://localhost:4000/api/PlaceOrder`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    // setplacestatus(true)
                    // console.log(placestatus);
                    scroll.scrollToTop();
                    history.push({
                      pathname: '/placed',
                      state: { detail: dateState}
                    })

                    // setModal1Show(true)
          
                })
                .catch(error => console.log('error', error));
        }


        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        // var urlencoded = new URLSearchParams();
        // urlencoded.append("customer_id", "1");
        // urlencoded.append("subservice_id", "2");
        // urlencoded.append("address", "5,sunrisepark");
        // urlencoded.append("area", "bodakdev");
        // urlencoded.append("amount", "1200");
        // urlencoded.append("city", "surat");
        // urlencoded.append("pincode", "395006");
        // urlencoded.append("time_slot", "12:30-2:00");
        // urlencoded.append("order_date", "2021-03-03");

        // var requestOptions = {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: urlencoded,
        //   redirect: 'follow'
        // };

        // fetch("http://localhost:4000/api/PlaceOrder", requestOptions)
        //   .then(response => response.text())
        //   .then(result => console.log(result))
        //   .catch(error => console.log('error', error));



        
        // this.props.onHide()


        //alert(event.target.date.value+" "+event.target.timeslot.value+" "+event.target.pincode.value)
        //var dt=event.target.date.value
// toast.success("Congratulations you will get confirmation soon", {
//                       position: "top-right",
//                       autoClose: 2000,
//                       hideProgressBar: false,
//                       closeOnClick: true,
//                       pauseOnHover: true,
//                       draggable: true,
//                       progress: undefined,
//                   });
                //   setTimeout(function () {
                //     history.push('/placed')
                //     scroll.scrollToTop();

                // }, 2000)

    }


  }
  
  useEffect(() => {
    AddId()
  }, [])
  const showStripeButton = () => {
    
    return  (
     <div>
             <StripeCheckoutButton
        stripeKey="pk_test_51IXjemSHvBWeZixYZfzJW1zYu5vhes9DY2IijjngfQlQ9sCVVp2C45WsSGqNsaQpd4Vgc4LAW2n1qKAvdeRG0Iax00bXOQKXhS"
        token={makePayment}
        amount={getFinalAmount() * 100 }
        name="Place Order"
        email={localStorage.getItem('email')}
        currency="INR">
        
        <Button  type="submit"  className="baton baton1" style={{marginTop:"0px!important",background:"#000"}}>Checkout</Button>
      
      </StripeCheckoutButton>
     <Conformation
     show={modal1Show}
     onHide={() => setModal1Show(false)}
    
   />
   </div>

    )
  };

  return (
    <div style={{marginTop:7}}>
   
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;