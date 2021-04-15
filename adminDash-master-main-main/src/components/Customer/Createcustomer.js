import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import validator from 'validator'


export class CreateCustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onfileupload = e => {
    this.state.file = e.target.files[0];
    console.log(this.state.file);
  };
//   handleSubmit(event) {
//     event.preventDefault();
//     var formdata = new FormData();
//     formdata.append("firstname", event.target.customerfirstname.value);
//     formdata.append("lastname", event.target.customerlastname.value);
//     formdata.append("gender", event.target.customergender.value);
//     formdata.append("mobile_no", event.target.customermobileno.value);
//     formdata.append("email", event.target.customeremail.value);
//     formdata.append("address", event.target.customeraddress.value);
//     formdata.append("profilepicture", this.state.file);
//     formdata.append("area", event.target.customerarea.value);

//     var requestOptions = {
//       method: "POST",
//       body: formdata,
//       redirect: "follow"
//     };

//     fetch("http://localhost:4000/api/Addcustomer", requestOptions)
//       .then(response => response.text())
//       .then(result => {
//         console.log(result);
//         toast.success("customer Added Successfully ", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined
//         });
//       })
//       .catch(error => console.log("error", error));
//   }

handleSubmit(event) {

    if (event.target.customerfirstname.value == null || event.target.customerlastname.value == null || event.target.customergender.value == null || event.target.customermobileno.value == null ||  event.target.customeraddress.value == null ||  event.target.customerarea.value == null ||  event.target.customercity.value == null || event.target.customeremail.value == null || event.target.customerpassword.value == null || event.target.customercpassword.value == null) {
        toast.error(' All Field are required!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else if (event.target.customermobileno.value.length>10 || event.target.customermobileno.value.length<10) {
        console.log(event.target.customermobileno.value)
        toast.error('Mobile number must be in 10 digit', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else if (!validator.isEmail(event.target.customeremail.value)) {
        toast.error(' Email is not valid!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else if (!validator.isStrongPassword(event.target.customerpassword.value)) {
        console.log(event.target.customerpassword.value)
        toast.error('Password must have 8 charecter with one uppercase,lowercase,number and one special charecter!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else if (event.target.customerpassword.value !== event.target.customercpassword.value) {
        console.log(event.target.customerpassword.value, event.target.customercpassword.value)
        toast.error('Your Password Does not matched', {
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
        // alert(firstName+lastName+gender+mobileno+address+area+city+email+password+cpassword)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("firstname", event.target.customerfirstname.value);
        urlencoded.append("lastname", event.target.customerlastname.value);
        urlencoded.append("gender", event.target.customergender.value);
        urlencoded.append("mobile_no", event.target.customermobileno.value);
        urlencoded.append("email", event.target.customeremail.value);
        urlencoded.append("password", event.target.customerpassword.value);
        urlencoded.append("address",  event.target.customeraddress.value);
        urlencoded.append("image", "");
        urlencoded.append("area",  event.target.customerarea.value);
        urlencoded.append("city",  event.target.customercity.value);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/api/Signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.status)
                if (result.status === "Success") {
                    toast.success('You have Succesfully Registerd!! ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                   // history.push("/signin")
                }

            })
            .catch(error => console.log('error', error));
    }
}
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Customer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row>
                <Col sm={6}>
                  <FormGroup controlId="FirstName">
                    <FormLabel>Firstname</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="FirstName"
                      name="customerfirstname"
                    />
                  </FormGroup>
                  <FormGroup controlId="LastName">
                    <FormLabel> Lastname</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="LastName"
                      name="customerlastname"
                    />
                  </FormGroup>
                  <FormControl variant="outlined" controlId="gender" style={{width:350}}>
                            <FormLabel htmlFor="outlined-age-native-simple">Gender</FormLabel>
                            <Select
                            native
                            
                            label="Gender"
                            inputProps={{
                                name: 'customergender',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value="Male"> Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                            </Select>
                        </FormControl>
                  <FormGroup controlId="customerEmail">
                    <FormLabel>Email</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="customeremail"
                    />
                  </FormGroup>
                  <FormGroup controlId="customerEmail">
                    <FormLabel>Password</FormLabel>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="customerpassword"
                    />
                  </FormGroup>
                  <FormGroup controlId="customerEmail">
                    <FormLabel>Confirm Password</FormLabel>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="customercpassword"
                    />
                  </FormGroup>
                  <FormGroup controlId="customerMobileNo">
                    <FormLabel>MobileNo</FormLabel>
                    <Form.Control
                      type="number"
                      placeholder="MobileNo"
                      name="customermobileno"
                    />
                  </FormGroup>
                  <FormGroup controlId="customerAddress">
                    <FormLabel>Address</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="customeraddress"
                    />
                  </FormGroup>
                  <FormGroup controlId="customerArea">
                    <FormLabel>Area</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Area"
                      name="customerarea"
                    />
                  </FormGroup>
                  <FormGroup controlId="customerArea">
                    <FormLabel>City</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="city"
                      name="customercity"
                    />
                  </FormGroup>

                 
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Form.Group>
              <Button variant="primary" type="submit">
                Add customer
              </Button>
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
            </Form.Group>

            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
