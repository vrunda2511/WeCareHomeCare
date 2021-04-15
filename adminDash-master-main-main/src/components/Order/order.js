import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import dateFormat from 'dateformat'
import { ToastContainer, toast } from 'react-toastify';
import { ButtonToolbar } from 'react-bootstrap';
import {  Link} from "react-router-dom";
 class ListOrderDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            order: [],
            count:  []
            
           
        }
    }

    confirmorder(placeorder_id) {   

        const { order } = this.state;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        // myHeaders.append("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsImlhdCI6MTYxNTAwOTMyMX0.UA5rdGGciVUCUrqBrr3fl-HWf83TDTwk9yEUn6VyyGE");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("placeorder_id", placeorder_id);
        urlencoded.append("orderstatus", "confirmed");
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("http://localhost:4000/api/UpdateOrderData", requestOptions)
          .then(response => response.text())
          .then(
            (result) => {
                toast.success('Order Confirm Successfully ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                this.setState({
                    response: result,
                    order: order.filter(order => order.placeorder_id !== placeorder_id)
                });
            },
            (error) => {
                this.setState({ error });
            })
    }

    rejectorder(placeorder_id) {   

        const { order } = this.state;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        // myHeaders.append("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsImlhdCI6MTYxNTAwOTMyMX0.UA5rdGGciVUCUrqBrr3fl-HWf83TDTwk9yEUn6VyyGE");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("placeorder_id", placeorder_id);
        urlencoded.append("orderstatus", "Rejected");
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("http://localhost:4000/api/UpdateOrderData", requestOptions)
          .then(response => response.text())
          .then(
            (result) => {
                toast.success('Order Rejected Successfully ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                this.setState({
                    response: result,
                    order: order.filter(order => order.placeorder_id !== placeorder_id)
                });
            },
            (error) => {
                this.setState({ error });
            })
    }


     counter(rowno){
        return rowno+=1;
    }
    componentDidMount() {
        const apiUrl = 'http://localhost:4000/api/ViewOrderData';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ order: data.data }));
            // .then(count => this.setState({ count: count.count }));
            fetch(apiUrl)
            .then(response => response.json())
            .then(count => this.setState({ count: count.count }));
         
    }
    render() {
        let i=1;
        const rowNumber=1
        let counter=1
        return (
            <div className="container">
                <h2 className="text-center" style={{ marginTop: "15px" }}>Order List</h2>
                <div className="row">
                    <ButtonToolbar>
                             <Link to="/cancelorder" className="btn btn-danger">Cancel Orders</Link>
                        {/* <CreateProviderComponent show={this.state.addModalShow} onHide={addModalClose} /> */}
                    </ButtonToolbar>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered"   counter-reset={rowNumber}>
                        
                        <thead style={{ textAlign: "center" }}>
                            <tr counter-increment>
                                
                                <th> Customer Name</th>
                                 <th>Service</th>
                                 <th > Address</th>
                                <th > Area</th>
                                <th> Provider Name</th>
                                <th >Provider Contact</th>
                                <th>Time Slot</th>
                                <th>Order Date</th>
                                <th> Amount</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {
                                this.state.order.map(
                                    order =>
                                        <tr key={order.customer_id} >
                                            
                                            <td>{order.customer_firstname} {order.customer_lastname}</td>
                                            <td> {order.sub_servicename} </td>
                                            <td>{order.address}</td>
                                            <td>{order.area}</td>
                                            <td>{order.provider_firstname} {order.provider_lastname}</td>
                                            <td> {order.provider_mobileno} </td>
                                            <td> {order.time_slot} </td>
                                            <td>{dateFormat(order.order_date, "dS mmmm, yyyy")}</td>
                                            <td> ₹{order.price} </td>
                                            
                                            <td>
                                                <button className="btn btn-info" type="submit"
                                                 onClick={()=>this.confirmorder(order.placeorder_id)}>Confirm </button>
                                                {/* <button style={{ marginLeft: "10px" }} className="btn btn-info"> <Link to="ViewServiceComponent" params={{ service_name: service.service_name }}>View</Link> </button> */}
                                                <ToastContainer
                                                position="top-center"
                                                autoClose={5000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                                />
                                            </td>
                                            <td>
                                            <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={()=>this.rejectorder(order.placeorder_id)} >Reject </button>
                                            <ToastContainer
                                            position="top-center"
                                            autoClose={5000}
                                            hideProgressBar={false}
                                            newestOnTop={false}
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            />
                                            </td>

                                          
                                        </tr>
                                )
                            }
                           
                        </tbody>
                      
                     
                    </table>
                  
                </div>
            </div>
        )
    }
}
export default ListOrderDetails