import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, FormLabel, Modal } from 'react-bootstrap'
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ToastContainer, toast } from 'react-toastify';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Constant from "../../api/api";


const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
    rating: 1
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
    rating: 2

  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
    rating: 3

  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
    rating: 4
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
    rating: 5
  },
};

function IconContainer(props) {
  const { value, ...other } = props;

  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {

  value: PropTypes.number.isRequired,

};

const FeedBackShowModal = (prop) => {
  const [value, setValue] = React.useState(0);
  const [review, setReview] = useState([{rating: ''}]);


  useEffect(() => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var urlencoded = new URLSearchParams();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  fetch(Constant.API_URL+"/ViewFeedbackhistory/"+prop.subserv_id, requestOptions)
    .then(response => response.json())
    .then(result => setReview(result))
    .catch(error => console.log('error', error));

  },[prop.subserv_id])

// console.log(review)
  return (
    <div>
      {/* {console.log(prop.subid)} */}

      <Modal
        {...prop}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Reviews
                  </Modal.Title>
        </Modal.Header>
       
          <Modal.Body>
            {review.map(({rating,firstname, lastname,review})=>
            <div>
            <div style={{display:"flex", justifyContent:"space-between",marginBottom:"0px",height:30}}>

              <p style={{marginBottom:"0px"}}>{firstname} {lastname}</p>
              <Box component="fieldset" mb={3} borderColor="transparent">
              
              <Rating
                name="read-only"
                value={rating}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                readOnly

              />
            </Box>
            </div>
            <p style={{paddingBottom:10,borderBottom:"1px solid"}}>{review}</p>
             
            </div>
            
            )}
          </Modal.Body>

          <Modal.Footer>
              
            <Button onClick={prop.onHide} style={{ background: "#ffe484", backgroundColor: "#ffe484", border: "1px bold #ffe484", borderColor: "#000", color: "#000", fontWeight: "bold" }}>Close</Button>
          </Modal.Footer>
      
      </Modal>
    </div>
  )
}

export default FeedBackShowModal
