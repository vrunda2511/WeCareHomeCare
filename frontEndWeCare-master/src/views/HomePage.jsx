import React, { useState } from 'react'
import Contact from '../components/contact/contact.components'
import Faq from '../components/faq/faq.components'
import Footer from '../components/footer/footer.components'
import { homeObjOne } from '../components/infosection/infosection.data'
import InfoSection from '../components/infosection/infosection.component'
import Navbar from '../components/navabar/navbar.components'
import ServiceList from '../components/service-list/service-list.component'
// import CardList from '../components/service-cardlist/service-cardlist.componet'
// import CardList from '../components/service-cardlist'
import Sidebar from '../components/sidebar/sidebar.components'
import VideoSection from '../components/videosection/videosection.component'
import Chatbot from '../components/chatbot/chatbot.component'

// import ChatBot from 'react-simple-chatbot';
// const config ={
//     width: "400px",
//     height: "500px",
//     floating: true,
//   };
const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }


    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <VideoSection />
            {/* <CardList /> */}
            <ServiceList />
            {/* <Services /> */}
            <InfoSection {...homeObjOne} />
            {/* <InfoSection {...homeObjTwo}/>   */}
            <Faq />
            <Contact />
            <Footer />
            <Chatbot />
            {/* <InfoSection {...homeObjThree}/>   */}
          {/* <LearningOptions /> */}
          {/* <Chatbot config={Config} actionProvider={} messageParser={LearningOptions} /> */}
          {/* <ChatBot
           recognitionEnable={true}
    steps={[
      {
        id: '1',
        message: 'Welcome to WeCareHomeCare.',
        trigger: '2',
      },
      {
        id: '2',
        message: 'What is your name?. ',
        
        trigger: '3',
      },
      {
        id: '3',
        user:true,
        trigger: '4',
      },
      {
        id: '4',
        message: 'Hi {previousValue}, nice to meet you! ',
       
        trigger: '5',
      },
      {
        id: '5',
        message: 'How Can I Help You? ',
       
        trigger: '6',
      },
      {
        id: '6',
        options: [
          { value: 1, label: 'Account Related', trigger: '7' },
          { value: 2, label: 'Orders Related', trigger: '8' },
          { value: 3, label: 'Payment Related', trigger: '9' },
          { value: 4, label: 'Other Queries', trigger: '18' },
        ],
      },
      {
        id: '7',
        // message: 'Wrong answer, try again.',
        options: [
            { value: 1, label: 'How To Register?', trigger: '10' },
            { value: 2, label: 'Forgot Password', trigger: '12' },
            { value: 3, label: 'Go Back', trigger: '6' },
          ],
        //  trigger: '2',
      },
      {
        id: '8',
        // message: 'Wrong answer, try again.',
        options: [
            { value: 1, label: 'Place Order', trigger: '13' },
            { value: 2, label: 'Cancel Order', trigger: '14' },
            { value: 3, label: 'Order Status', trigger: '15' },
            { value: 3, label: 'Go Back', trigger: '6' },
          ],
        // trigger: '2',
      },
      {
        id: '9',
        // message: 'Wrong answer, try again.',
        options: [
            { value: 1, label: 'Payment Method', trigger: '16' },
            { value: 2, label: 'Refund Policy', trigger: '17' },
            { value: 3, label: 'Go Back', trigger: '6' },
           
          ],
        // trigger: '2',
      },
      {
        id: '10',
        message: "Go to SignIn -> Don't have an account? Sign Up -> Enter Valid Information -> Registered Successfully -> You will Notify by Mail.",
       
        trigger: '11',
      },
      {
        id: '11',
        // message: 'Wrong answer, try again.',
        options: [
            { value: 1, label: 'Go Back', trigger: '6' },
           
          ],
        // trigger: '2',
      },
      {
        id: '12',
        message: 'Go to SignIn -> Forgot Password -> Enter registered mail -> Check OTP on mail -> Enter OTP -> Reset password',
       
        trigger: '11',
      },
      {
        id: '13',
        message: 'Go to Services -> Select Service -> Add to Cart -> Enter Address and Payment Details -> Order Placed Successfully',
       
        trigger: '11',
      },
      {
        id: '14',
        message: 'Go to Account -> Select Orders -> Select Placed Order -> Select Cancel -> Order Cancelled Successfully',
       
        trigger: '11',
      },
      {
        id: '15',
        message: 'Go to Account -> Select Orders -> Select Placed Order -> Here you can see your order status',
       
        trigger: '11',
      },
      {
        id: '16',
        message: 'Only card payment is accepted.',
       
        trigger: '11',
      },
      {
        id: '17',
        message: 'If your order is cancelled or rejected, You will get refund within 5-7 business days.',
       
        trigger: '11',
      },
      {
        id: '18',
        message: "For more information contact us on +918758394357 or mail us on wecarehomecare.2511 @gmailcom.",
       
        trigger: '19',
      },{
        id: '19',
        message: 'We will reach you soon. Thank you.',
       
        trigger: '11',
      },
   
    ]}
    {...config}
  /> */}
        </>
    )
}

export default Home
