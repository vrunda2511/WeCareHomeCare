import React from 'react'
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

const FeedBackModal = (prop) => {
  const [value, setValue] = React.useState(0);

  function addfeedback(e) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("subservice_id", prop.subid);
    urlencoded.append("review", e.target.review.value);
    urlencoded.append("rating", value);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    var customer_id = localStorage.getItem("customer_id");
    fetch(Constant.API_URL+"/AddFeedback/" + customer_id, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        toast.success('Thank you so much for your valuable feedback!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(function () {
          prop.onHide()
        }, 3000);


      })
      .catch(error => console.log('error', error));

  }
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
            Feedback
                  </Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => { e.preventDefault(); addfeedback(e); }}>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Review</Form.Label>
              <Form.Control as="textarea" rows={3} name="review" />
            </Form.Group>
            {/* <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rate Us</Typography>
              <Rating
                name={prop.name}
                value={value}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  setValue(newValue);
                  console.log(prop.name)
                }}

                IconContainerComponent={IconContainer}
              />
            </Box> */}
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rate Us</Typography>
              <Rating
                 defaultValue={2}
                precision={1}
                name={prop.name}
                value={value}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  setValue(newValue);
                  console.log(prop.name)
                }}

                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Box>
          </Modal.Body>

          <Modal.Footer>
            <Form.Group>
              <Button variant="primary" type="submit" style={{ background: "#ffe484", backgroundColor: "#ffe484", border: "1px bold #ffe484", borderColor: "#000", color: "#000", fontWeight: "bold" }} >
                Send Feedback
                      </Button>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Form.Group>
            <Button onClick={prop.onHide} style={{ background: "#ffe484", backgroundColor: "#ffe484", border: "1px bold #ffe484", borderColor: "#000", color: "#000", fontWeight: "bold" }}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default FeedBackModal
