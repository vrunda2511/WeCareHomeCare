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

export class CreateSubserviceComponent extends Component {
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
    // console.log()

    var formdata = new FormData();
    formdata.append("profilepicture", this.state.file);
    formdata.append("sub_servicename", event.target.subservicename.value);
    formdata.append("price", event.target.subserviceprice.value);
    formdata.append(
      "short_description",
      event.target.subserviceshortdesc.value
    );
    formdata.append("long_description", event.target.subservicelongdesc.value);
    formdata.append("time_duration", event.target.subserviceduration.value);
    formdata.append("service_name", localStorage.getItem("service_name"));

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("http://localhost:4000/api/AddSubService", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        toast.success(
          event.target.subservicename.value + "Added Successfully ",
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
              Add Subservice
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Subservice Name"
                      name="subservicename"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Image</FormLabel><br/>
                    <input type="file" onChange={this.onfileupload} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Price</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Subservice Price"
                      name="subserviceprice"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>duration</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Subservice duration"
                      name="subserviceduration"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>short description</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Short description"
                      name="subserviceshortdesc"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>long description</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Long description"
                      name="subservicelongdesc"
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
                Add Subservice
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
