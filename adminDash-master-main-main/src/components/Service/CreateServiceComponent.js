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

export class CreateServiceComponent extends Component {
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
  handleSubmit(e) {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("profilepicture", this.state.file);
    formdata.append("service_name", e.target.servicename.value);

    var requestOptions = {
      method: "POST",

      body: formdata,
      redirect: "follow"
    };

    fetch("http://localhost:4000/api/AddService", requestOptions)
      .then(response => response.text())
      .then(result => {
        toast.success("Service Added Successfully ", {
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
              Add Service
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row>
                <Col sm={6}>
                  <FormGroup controlId="ServiceName">
                    <FormLabel>Name</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Service Name"
                      name="servicename"
                    />
                  </FormGroup>
                  <FormGroup controlId="ServiceImage">
                    <FormLabel>Image</FormLabel>
                    <br />
                    <input type="file" onChange={this.onfileupload} />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Form.Group>
              <Button variant="primary" type="submit">
                Add Service
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
