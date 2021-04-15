import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default class subServiceModel extends Component {

  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.service_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.sub_servicename}</h4>
            <p>
              {this.props.long_description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}




