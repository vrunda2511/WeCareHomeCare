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
import image from "../../images/profile.jpg";

export class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onfileupload = e => {
    this.state.file = e.target.files[0];
    console.log(this.state.file);
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              View Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row style={{ padding: 30 }}>
                <Col sm={12} style={{ textAlign: "center" }}>
                  {console.log(this.props.cimage)}
                  {this.props.cimage === "" ? (
                    <img
                      src={image}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100,
                        marginBottom: 20
                      }}
                    />
                  ) : (
                    <img
                      src={this.props.cimage}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100,
                        marginBottom: 20
                      }}
                    />
                  )}
                </Col>
                <Col sm={12} style={{ textAlign: "center" }}>
                  <FormGroup controlId="ServiceName">
                    <FormLabel style={{ fontWeight: "bold", fontSize: 25 }}>
                      {this.props.cfname} {this.props.clname}
                    </FormLabel>
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup controlId="ServiceName">
                    <FormLabel style={{ marginRight: 15, fontWeight: "bold" }}>
                      Mo.No
                    </FormLabel>
                    <FormLabel>{this.props.cmno}</FormLabel>
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup controlId="ServiceName">
                    <FormLabel style={{ marginRight: 25, fontWeight: "bold" }}>
                      Email
                    </FormLabel>

                    <FormLabel>
                      {this.props.cfname} {this.props.cemail}
                    </FormLabel>
                  </FormGroup>
                </Col>
                <Col sm={8}>
                  <FormGroup controlId="ServiceName">
                    <FormLabel style={{ marginRight: 10, fontWeight: "bold" }}>
                      Address
                    </FormLabel>
                    <FormLabel>{this.props.cadd}</FormLabel>
                  </FormGroup>
                </Col>
                <Col sm={4}></Col>
                <Col sm={4}>
                  <FormGroup controlId="ServiceName">
                    <FormLabel style={{ marginRight: 35, fontWeight: "bold" }}>
                      Area
                    </FormLabel>
                    <FormLabel>{this.props.carea}</FormLabel>
                  </FormGroup>
                </Col>
                <Col sm={8}>
                  <FormGroup controlId="ServiceName">
                    <FormLabel style={{ marginRight: 5, fontWeight: "bold" }}>
                      City
                    </FormLabel>
                    <FormLabel>{this.props.ccity}</FormLabel>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary" onClick={this.props.onHide}>Update Service</Button> */}
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
