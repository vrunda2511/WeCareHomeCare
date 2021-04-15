import React from 'react'
import { ThemeProvider } from 'styled-components';  
import ChatBot from 'react-simple-chatbot';
import image from './chatbot.png'
import '../../App.css'
const config ={
    width: "350px",
    height: "480px",
    floating: true,
  };
  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#323232',
    
    headerFontColor: '#fff9b0',
    headerFontSize: '15px',
    botBubbleColor: '#fff9b0',
    botFontColor: '#000',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };
export default function Chatbot() {
    if (localStorage.getItem("token") === null) {
    return (
        <ThemeProvider className="chatbot" theme={theme}>
        <ChatBot
        className="chatbot"
        headerTitle="WeCareHomeCare"
        
            botAvatar={image}
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
          { value: 1, label: 'Account Related ', trigger: '7' },
          { value: 2, label: 'Orders Related ' , trigger: '8' },
          { value: 3, label: 'Payment Related ', trigger: '9' },
          { value: 4, label: 'Other Queries ', trigger: '18' },
        ],
      },
      {
        id: '7',
        // message: 'Wrong answer, try again.',
        options: [
            { value: 1, label: 'How To Register', trigger: '10' },
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
  />
  </ThemeProvider>
    )}else{
        return (
            <ThemeProvider className="chatbot" theme={theme}>
            <ChatBot
            className="chatbot"
            headerTitle="WeCareHomeCare"
            
                botAvatar={image}
               recognitionEnable={true}
        steps={[
          {
            id: '1',
            message: 'Welcome to WeCareHomeCare.',
            trigger: '5',
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
              { value: 1, label: 'Account Related ', trigger: '7' },
              { value: 2, label: 'Orders Related ' , trigger: '8' },
              { value: 3, label: 'Payment Related ', trigger: '9' },
              { value: 4, label: 'Other Queries ', trigger: '18' },
            ],
          },
          {
            id: '7',
            // message: 'Wrong answer, try again.',
            options: [
                { value: 1, label: 'How To Register', trigger: '10' },
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
      />
      </ThemeProvider>
        ) 
    }
}
