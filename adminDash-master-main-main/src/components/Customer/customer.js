import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { ViewComponent } from "./ViewComponent";
import { CreateCustomerComponent } from "./Createcustomer";
import { ButtonToolbar } from 'react-bootstrap';

class ListCustomerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: [],
      count: [],
      addModalShow: false,
      editModalShow: false
    };
  }
  counter(rowno) {
    return (rowno += 1);
  }
  componentDidMount() {
    const apiUrl = "http://localhost:4000/api/AdminViewCustomer";
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => this.setState({ customer: data.data }));
    // .then(count => this.setState({ count: count.count }));
    fetch(apiUrl)
      .then(response => response.json())
      .then(count => this.setState({ count: count.count }));
  }
  deactivecustomer(customer_id) {
   
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("role", "0");
        urlencoded.append("customer_id",customer_id);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/api/AdminActivateCustomer", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result)
            toast.warn('User Deactivated ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        
            setTimeout(function () {
                window.location.reload(false)
            }, 5000);})
     
        .catch(error => console.log('error', error));
        window.location.reload(false)
  }

  activecustomer(customer_id){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("role", "1");
    urlencoded.append("customer_id",customer_id);

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("http://localhost:4000/api/AdminActivateCustomer", requestOptions)
    .then(response => response.text())
    .then(result =>{ console.log(result)
        toast.warn('User Activated ', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    
        setTimeout(function () {
            window.location.reload(false)
        }, 5000);})
    .catch(error => console.log('error', error));
    

  }
  render() {
    const { cid, cfname, clname,cimage,cmno,cemail,cadd,carea,ccity } = this.state;

    var addModalClose = () => this.setState({ addModalShow: false });
    var editModalClose = () => this.setState({ editModalShow: false });
    let i = 1;
    const rowNumber = 1;
    let counter = 1;
    return (
      <div className="container">
        <h2 className="text-center" style={{ marginTop: "15px" }}>
          Customer List
        </h2>
        <div className="row">
                    <ButtonToolbar>
                        <button className="btn btn-info" onClick={() => this.setState({ addModalShow: true })}>
                             Add Customer</button>
                        <CreateCustomerComponent show={this.state.addModalShow} onHide={addModalClose} />
                    </ButtonToolbar>
                </div>
               
        <br></br>
        <div className="row">
          <table
            className="table table-striped table-bordered"
            counter-reset={rowNumber}
          >
            <thead style={{ textAlign: "center" }}>
              <tr counter-increment>
                <th> Customer Name</th>
                <th> Mobile No</th>
                <th> Email</th>
                <th> City</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {this.state.customer.map(customer => (
                <tr key={customer.customer_id} counter-increment={rowNumber}>
                  <td>
                    {customer.firstname} {customer.lastname}
                  </td>
                  <td> {customer.mobile_no} </td>
                  <td> {customer.email}</td>
                  <td>{customer.city}</td>
                

                  <td>
                    {customer.role == 0 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.activecustomer(customer.customer_id);
                        }}>
                        Active
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.deactivecustomer(customer.customer_id);
                        }}
                      >
                        Deactive
                      </button>
                    )}
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
                  <button
                        className="btn btn-primary"
                        onClick={() => this.setState({
                          editModalShow: true,
                          cid:customer.customer_id,
                          cfname:customer.firstname,
                          clname:customer.lastname,
                          cimage:customer.image,
                          cmno:customer.mobile_no,
                          cemail:customer.email,
                          cadd:customer.address,
                          carea:customer.area,
                          ccity:customer.city
                         
                      })}>
                        view
                      </button>
                      <ViewComponent
                                                        show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        sid={cid}
                                                        cfname={cfname}
                                                        clname={clname}
                                                        cimage={cimage}
                                                        cmno={cmno}
                                                        cemail={cemail}
                                                        cadd={cadd}
                                                        carea={carea}
                                                        ccity={ccity}
                                                  
                                                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ListCustomerDetails;
