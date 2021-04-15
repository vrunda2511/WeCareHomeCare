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

export class UpdateSubserviceComponent extends Component {
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
    const id = event.target.subserviceid.value;

    var formdata = new FormData();
    formdata.append("sub_servicename", event.target.subservicename.value);
    formdata.append("profilepicture", this.state.file);
    formdata.append("price", event.target.subserviceprice.value);
    formdata.append(
      "short_description",
      event.target.subserviceshortdesc.value
    );
    formdata.append("long_description", event.target.subservicelongdesc.value);
    formdata.append("time_duration", event.target.subserviceduration.value);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow"
    };

    fetch("http://localhost:4000/api/UpdateSubService/" + id, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        toast.success(
          event.target.subservicename.value + " Updated Successfully ",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          }
        );
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
              Update Subservice
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row>
                <Col sm={6}>
                  <FormGroup controlId="SubserviceId">
                    
                    <Form.Control
                      type="hidden"
                      placeholder="Subservice Id"
                      name="subserviceid"
                      disabled
                      defaultValue={this.props.subid}
                    />
                  </FormGroup>
                  <FormGroup controlId="SubserviceName">
                    <FormLabel>Name</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Subservice Name"
                      name="subservicename"
                      defaultValue={this.props.subname}
                    />
                  </FormGroup>
                  <FormGroup controlId="SubserviceImage">
                    <FormLabel>Image</FormLabel><br/>
                    <input type="file" onChange={this.onfileupload} />
                  </FormGroup>
                  <FormGroup controlId="SubservicePrice">
                    <FormLabel>Price</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Subservice Price"
                      name="subserviceprice"
                      defaultValue={this.props.subprice}
                    />
                  </FormGroup>
                  <FormGroup controlId="SubserviceDuation">
                    <FormLabel>duration</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Subservice duration"
                      name="subserviceduration"
                      defaultValue={this.props.subduration}
                    />
                  </FormGroup>
                  <FormGroup controlId="SubserviceShortDesc">
                    <FormLabel>Short description</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Subservice short description"
                      name="subserviceshortdesc"
                      defaultValue={this.props.subshortdesc}
                    />
                  </FormGroup>
                  <FormGroup controlId="SubserviceLongDesc">
                    <FormLabel>Long description</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Subservice long description"
                      name="subservicelongdesc"
                      defaultValue={this.props.sublongdesc}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Form.Group>
              <Button variant="primary" type="submit"
               
                  >
                Update Service
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

            <Button variant="danger" onClick={this.props.onHide}
                  
                  >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
