import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import { ViewFeedbackComponent } from "./ViewFeedbackComponent";
import "./feedback.css";
class ListFeedbackComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbacks: [],
      count: [],
      search: "",
      data1: [],
      addModalShow: false,
      editModalShow: false
    };
  }

  componentDidMount() {
    const apiUrl = "http://localhost:4000/api/AdminViewFeedback";
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ feedbacks: data.data });
        console.log(data);
      });
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ data1: data.data });
        console.log(data);
      });
    fetch(apiUrl)
      .then(response => response.json())
      .then(count => this.setState({ count: count.count }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.feedbacks !== this.state.feedbacks &&
      prevState.data1 !== this.state.data1
    ) {
      const apiUrl = "http://localhost:4000/api/AdminViewFeedback";
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          this.setState({ data1: data });
          console.log(data);
        });
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          this.setState({ feedbacks: data });
          console.log(data);
        });
    }
  }

  deleteFeedback(feedbackId) {
    console.log("Delete", feedbackId);
    const { data1 } = this.state;

    const id = feedbackId;
    console.log(id);
    const apiUrl = "http://localhost:4000/api/DeleteFeedback/" + id;
    const formData = new FormData();
    formData.append("feedbackId", feedbackId);

    const options = {
      method: "DELETE",
      body: formData
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        result => {
          toast.success("Deleted Successfully ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });

          window.location.reload(false);
          this.setState({
            response: result,
            data1: data1.filter(
              feedback => feedback.feeddback_id !== feedbackId
            )
          });
        },
        error => {
          this.setState({ error });
        }
      );
  }
  approvefeedback(feedbackid) {
    // alert(feedbackid);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch(
      "http://localhost:4000/api/ApproveFeedbackStatus/" + feedbackid,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        toast.success("Approved Successfully ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        window.location.reload(false);
      })
      .catch(error => console.log("error", error));
  }
  handleChange(value) {
    this.setState({ search: value });
    this.filterData(value);
  }

  filterData(value) {
    const excludeColumns = ["feedback_id", "subservice_id", "customer_id"];
    const lowerCaseValue = value.toLowerCase().trim();
    if (!lowerCaseValue) {
      this.setState({ data1: this.state.feedbacks });
    } else {
      const filteredData = this.state.feedbacks.filter(item => {
        return Object.keys(item).some(key => {
          return excludeColumns.includes(key)
            ? false
            : item[key]
                .toString()
                .toLowerCase()
                .includes(lowerCaseValue);
        });
      });
      this.setState({ data1: filteredData });
    }
  }
  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  render() {
    const { creview } = this.state;

    var addModalClose = () => this.setState({ addModalShow: false });
    var editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div className="container">
        <h2
          className="text-center"
          style={{ marginTop: "25px", marginBottom: "5px" }}
        >
          Feedback
        </h2>

        <div>
          <FaSearch
            style={{
              marginLeft: -35,
              marginTop: 9,
              marginRight: 9,
              color: "#000",
              float: "right",
              opacity: 0.5
            }}
          />
          <input
            type="text"
            className="form-control"
            style={{ float: "right", width: 300 }}
            placeholder="Search feedback"
            onChange={e => this.handleChange(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Service Name</th>
                <th>Subservice Name</th>
                <th>Provider Name</th>
                <th>Customer Name</th>
                <th>Rating</th>
                <th>Review</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {this.state.data1.map(feedback => (
                <tr key={feedback.feedback_id}>
                  <td>{this.capitalize(feedback.service_name)} </td>
                  <td>{this.capitalize(feedback.sub_servicename)}</td>
                  <td>
                    {this.capitalize(feedback.providername)} {this.capitalize(feedback.providerlastname)}
                  </td>
                  <td>
                    {this.capitalize(feedback.customername)} {this.capitalize(feedback.customerlastname)}
                  </td>
                  <td style={{ alignItems: "center", width: 20 }}>
                    <Rating
                      name="size-small"
                      className="feedback"
                      style={{ marginLeft: 0 }}
                      defaultValue={feedback.rating}
                      
                      readOnly
                    />
                  </td>
                  {feedback.review.length <= 13 ? (
                    <td>{this.capitalize(feedback.review)}</td>
                  ) : (
                    <td>
                      {feedback.review.substring(0, 13)}
                      <Link
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            creview: feedback.review
                          })
                        }
                      >
                        {" "}
                        <br />
                        Read More
                      </Link>
                      <ViewFeedbackComponent
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        creview={creview}
                      />
                    </td>
                  )}
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this item?"
                          )
                        )
                          this.deleteFeedback(feedback.feedback_id);
                      }}
                    >
                      Delete
                    </button>
                    <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                  </td>
                  {feedback.status === 0 ? (
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() =>
                          this.approvefeedback(feedback.feedback_id)
                        }
                      >
                        Approve
                      </button>
                      <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                    </td>
                  ) : (
                    <td>
                      <button className="btn btn-info" disabled>
                        Approved
                      </button>
                      <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListFeedbackComponent;
