import React from 'react';
import './faq.styles.css'

import { Collapse } from 'antd';


const { Panel } = Collapse;

function Faq() {
  return(
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Frequently Asked Questions</h2>
          {/* <p>Quidem reiciendis iure, aperiam blanditiis. Alias esse, nam, ea quam</p> */}
        </div>
        <Collapse defaultActiveKey={['1']}>
          <Panel className="panel" header="Is the service safe and hygienic?" key="1">
            <p>Yes, our professionals display their Aarogya Setu status at the start of the service, maintain social distancing &amp; sanitise all high touch points after the service. Additionally, all professionals carry PPE kits and have undergone training in WHO hygiene guidelines.</p>
          </Panel>
          <Panel className="panel" header="Will the professional arrange items after service?" key="2">
            <p>As per regulations, we recommend you to place the items back where they were. Professionals can help if needed, after your permission.</p>
          </Panel>
          <Panel className="panel" header="Will I have to provide any chemicals/soap?" key="3">
            <p>No,we carry all chemicals.</p>
          </Panel>
          <Panel className="panel" header="My sofa covers aren’t removable. Can you clean it?" key="4">
            <p>Yes! There are several methods that can be used if your fabric sofa does not have removable covers. Rest assured, the sofa cleaning professionals hold expertise in the same.</p>
          </Panel>
          <Panel className="panel" header="What quality of material and equipment do you use?" key="5">
            <p>Our company use industrial grade products for cleaning and disinfectants which are odorless and leave no chemical waste behind.</p>
          </Panel>
          <Panel className="panel" header="What is the use of Mark as Completed in orders?" key="6">
            <p>When your order is completed then click on <span style={{fontWeight:"bold"}}> Mark As Completed </span> button.</p>
          </Panel>
          <Panel className="panel" header="When can I give feedback?" key="7">
            <p>Once your order is completed then click on <span style={{fontWeight:"bold"}}> Mark As Completed </span>button, after that you can give feedback.</p>
          </Panel>
          <Panel className="panel" header="Can I cancel an order I just placed?" key="8">
            <p>Yes, you can cancel the order anytime you want.Go to your Orders and select the order you want to cancel.After successful cancellation you will receive confirmation mail.And your payment will be refunded within 2-3 working days.</p>
          </Panel>
          <Panel className="panel" header="If I can't able to login by my own, do you provide any help?" key="9">
            <p> Yes,we are here to help our customers. You can speak to a live customer service representative at  WeCareHomeCare,the best phone number to call is <span style={{fontWeight:"bold"}}> +918758394357 </span>Even you can reach us at our email address <a href="mailto:wecarehomecare.2511@gmail.com" style={{textDecoration:"none",color:"#000",fontWeight:"bold"}}> wecarehomecare.2511@gmail.com </a>and we will reply you within 24 working hours.</p>
          </Panel>
          <Panel className="panel" header=" Is there any facility to provide feedback?" key="10">
            <p> Customer can give feedback only after your ordered service is completed. One can leave their valuable reviews and star rating for a particular service.</p>
          </Panel>
          
        </Collapse>
        
      </div>
    </div>  
  );
}

export default Faq;