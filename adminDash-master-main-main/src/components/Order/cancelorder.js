import React, { Component } from 'react';
import dateFormat from 'dateformat'
import { ToastContainer, toast } from 'react-toastify';
import { ButtonToolbar } from 'react-bootstrap';
import {  Link} from "react-router-dom";
class ListOrderCancelDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: [],
            count:  []
            
        }
        }
        componentDidMount() {
            const apiUrl = 'http://localhost:4000/api/ViewOrderCancelData';
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => this.setState({ order: data.data }));
                // .then(count => this.setState({ count: count.count }));
                fetch(apiUrl)
                .then(response => response.json())
                .then(count => this.setState({ count: count.count }));
             
        }
    render(){
        const rowNumber=1
        return(
            
                <div className="container">
                    <h2 className="text-center" style={{ marginTop: "15px" }}>Cancel Order List</h2>
                    <div className="row">
                        <ButtonToolbar>
                                 <Link to="/order" className="btn btn-info">Back To Orders</Link>
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
    export default ListOrderCancelDetails