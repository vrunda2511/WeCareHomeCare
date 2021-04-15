import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default class Conformation extends Component {

  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="md"
          scrollable={true}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Terms and Conditions
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
            <p>1. <b>Introduction</b></p>
            <p>Welcome to <b>wecarehomecare</b></p>
<p>These Terms of Service (“Terms”, “Terms of Service”) govern your use of our website located at <b>www.wecarehomecare.com</b> (together or individually “Service”) operated by <b>wecarehomecare</b>.</p>
<p>Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</p>

          </Modal.Body>
         
        </Modal>
      </div>
    )
  }
}




