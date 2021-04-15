import React from 'react';
import './contact.styles.css'
import { MdEmail } from "react-icons/md";

import { Button } from 'antd';
// const { TextArea } = Input;

function Contact() {
  return (
    <div id="contact" className="block contactBlock">
      <div className="quickSupport">
          <h3 className="pagebodytitle2">Want quick support?</h3>
          <p className="ptag pagebodytitle2">Our Mission is to empower millions of service professionals by delivering services at-home in a way that has never been experienced before.</p>
          <Button className="buton pagebodybutton" type="primary" size="large" href="mailto:wecarehomecare.2511@gmail.com"><MdEmail style={{marginRight:"4px", marginBottom:"2px"}} />Email Us</Button>
          {/* <button className="button" href="mailto:abc@gmail.com">Email Us</button> */}
        </div>
    </div>
  );
}

export default Contact;