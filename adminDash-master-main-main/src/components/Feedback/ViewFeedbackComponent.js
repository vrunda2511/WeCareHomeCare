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


export class ViewFeedbackComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  

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
              Review
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row style={{ padding: 30 }}>
               
                <Col sm={12}>
                  <FormGroup controlId="ServiceName">
                    
                    <FormLabel>{this.props.creview}</FormLabel>
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
