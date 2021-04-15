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
import { InputLabel } from "@material-ui/core";

export class CreateProviderComponent extends Component {
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
  handleSubmit(event) {
    event.preventDefault();
    var formdata = new FormData();
    formdata.append("firstname", event.target.providerfirstname.value);
    formdata.append("lastname", event.target.providerlastname.value);
    formdata.append("gender", event.target.providergender.value);
    formdata.append("mobile_no", event.target.providermobileno.value);
    formdata.append("email", event.target.provideremail.value);
    formdata.append("address", event.target.provideraddress.value);
    formdata.append("profilepicture", this.state.file);
    formdata.append("area", event.target.providerarea.value);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("http://localhost:4000/api/AddProvider", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        toast.success("Provider Added Successfully ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      })
      .catch(error => console.log("error", error));
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
              Add Provider
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
                      name="providerfirstname"
                    />
                  </FormGroup>
                  <FormGroup controlId="LastName">
                    <FormLabel> Lastname</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="LastName"
                      name="providerlastname"
                    />
                  </FormGroup>
                  <FormControl variant="outlined" controlId="gender" style={{width:350}}>
                            <FormLabel htmlFor="outlined-age-native-simple">Gender</FormLabel>
                            <Select
                            native
                            
                            label="Gender"
                            inputProps={{
                                name: 'providergender',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value="Male"> Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                            </Select>
                        </FormControl>
                  <FormGroup controlId="ProviderEmail">
                    <FormLabel>Email</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="provideremail"
                    />
                  </FormGroup>
                  <FormGroup controlId="ProviderMobileNo">
                    <FormLabel>MobileNo</FormLabel>
                    <Form.Control
                      type="number"
                      placeholder="MobileNo"
                      name="providermobileno"
                    />
                  </FormGroup>
                  <FormGroup controlId="ProviderAddress">
                    <FormLabel>Address</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="provideraddress"
                    />
                  </FormGroup>
                  <FormGroup controlId="ProviderArea">
                    <FormLabel>Area</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Area"
                      name="providerarea"
                    />
                  </FormGroup>

                  <FormGroup controlId="ProviderImage">
                    <FormLabel>Profile Image</FormLabel><br/>
                    <input type="file" onChange={this.onfileupload} />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Form.Group>
              <Button variant="primary" type="submit">
                Add Provider
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
