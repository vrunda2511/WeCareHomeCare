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

export class UpdateServiceComponent extends Component {
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
    const id = event.target.serviceid.value;

    var formdata = new FormData();
    formdata.append("service_name", event.target.servicename.value);
    formdata.append("profilepicture", this.state.file);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow"
    };

    fetch("http://localhost:4000/api/UpdateService/" + id, requestOptions)
      .then(response => response.text())
      .then(result => {
        toast.success(
          event.target.servicename.value + " Updated Successfully ",
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
        console.log(result);
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
              Update Service
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row>
                <Col sm={6}>
                  <FormGroup controlId="ServiceId">
                   
                    <Form.Control
                      type="hidden"
                      placeholder="Service Id"
                      name="serviceid"
                      disabled
                      defaultValue={this.props.sid}
                    />
                  </FormGroup>
                  <FormGroup controlId="ServiceName">
                    <FormLabel> Name</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Service Name"
                      name="servicename"
                      defaultValue={this.props.sname}
                    />
                  </FormGroup>
                  <FormGroup controlId="ServiceImage">
                    <FormLabel> Image</FormLabel><br/>
                    <input type="file" onChange={this.onfileupload} />
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
            {/* <Button variant="primary" onClick={this.props.onHide}>Update Service</Button> */}
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
