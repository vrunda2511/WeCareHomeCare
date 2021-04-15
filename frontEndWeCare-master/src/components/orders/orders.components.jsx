import React, { Component } from 'react'
import OrderCard from './order-card.components';
import "./orders.styles.css"
import image from '../../images/nodatafound.png'
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom'
import { ArrowBack, ArrowLeft } from '../videosection/videosection.styles'
import Constant from "../../api/api";
import { ToastContainer, toast } from 'react-toastify';


export default class Orders extends Component {



    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            modalShow: false,
            hover:false
        }
    }

    onHover = () => {
        this.setState({hover:!this.state.hover})
    }

    componentDidMount() {
        // toast.warn('Dear Customer, if your order is completed then click on Mark As Completed button.\n Thank You', {
        //     position: "top-left",
        //     autoClose: 20000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var customer_id = localStorage.getItem("customer_id");
        let val = dateFormat(this.props.location.state, "yyyy-mm-dd");
       
        var urlencoded = new URLSearchParams();
        urlencoded.append("odate", val);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(Constant.API_URL+"/ViewOrder/"+customer_id, requestOptions)
            .then(response => response.json())
            .then(result => this.setState({orders:result}))
            .catch(error => console.log('error', error));
    }

componentDidUpdate(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var customer_id = localStorage.getItem("customer_id");
    let val = dateFormat(this.props.location.state, "yyyy-mm-dd");
   
    var urlencoded = new URLSearchParams();
    urlencoded.append("odate", val);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(Constant.API_URL+"/ViewOrder/"+customer_id, requestOptions)
        .then(response => response.json())
        .then(result => this.setState({orders:result}))
        .catch(error => console.log('error', error));
}


    render() {
        if (this.state.orders.length == 0) {
            return (
                <div className='header'>
                    <img src={image} alt='logo' style={{ height: "200px", margin: 100 }} />
                </div>
            )
        }
        else {
            return (
                
                <div>
                      <ToastContainer
                position="top-left"
                autoClose={20000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
                    <div className='header'>
                        Your Orders for {dateFormat(this.props.location.state, "dd,mmmm yyyy")}
                         </div>
                         <div style={{ width:100}}>
                         <Link to='/orders' style={{ color: "black" ,textDecoration:"none"}}> <button className="btn btn-info baton baton1" style={{marginLeft:30,marginTop:20,paddingLeft:15,paddingRight:25,background:"#000",border:"2px solid #ffe484",color: "black"}}  onMouseEnter={this.onHover} onMouseLeave={this.onHover}>{this.state.hover ? <ArrowBack /> : <ArrowLeft />}Back</button></Link>
                         </div>
                    <div className='container-fluid, row nthcard, lissst' style={{marginBottom:130}}>
                        {this.state.orders.map(({ placeorder_id, ...otherOrderProps }) => (
                            <div key={placeorder_id} className=''>
                                <OrderCard key={placeorder_id} {...otherOrderProps} placeorder_id={placeorder_id} />
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

    }
}
