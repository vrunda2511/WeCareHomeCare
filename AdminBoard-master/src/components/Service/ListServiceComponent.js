import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { CreateServiceComponent } from "./CreateServiceComponent"
import { UpdateServiceComponent } from "./UpdateServiceComponent"
import { ButtonToolbar } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { ToastContainer, toast } from 'react-toastify';
import {FaSearch} from "react-icons/fa";

class ListServiceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            services: [],
            addModalShow: false,
            editModalShow: false,
            search: "",
            data1: []
        }
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:4000/api/getAllCategory';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ services: data }));
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ data1: data }));
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.services!==this.state.services && prevState.data1!==this.state.data1){
            const apiUrl = 'http://localhost:4000/api/getAllCategory';
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.setState({ data1: data }
                    )
                     console.log(data)
                });
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.setState({ services: data }
                    )
                     console.log(data)
                });
        }
       }

    deleteService(serviceId) {
        console.log("Delete", serviceId)
        const { data1 } = this.state;

        const id = serviceId;
        const apiUrl = 'http://localhost:4000/api/DeleteService/' + id;
        const formData = new FormData();
        formData.append('serviceId', serviceId);

        const options = {
            method: 'DELETE',
            body: formData
        }

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        response: result,
                        data1: data1.filter(service => service.service_id !== serviceId)
                    });
                    toast.success(' Deleted Successfully ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }
    handleChange(value) {
        this.setState({ search: value });
        this.filterData(value);
      }
    
    filterData(value) {
        const excludeColumns = ["service_id","service_image"];
        const lowerCaseValue = value.toLowerCase().trim();
        if (!lowerCaseValue) {
          this.setState({ data1: this.state.services });
        } else {
          const filteredData = this.state.services.filter((item) => {
            return Object.keys(item).some((key) => {
              return excludeColumns.includes(key)
                ? false
                : item[key].toString().toLowerCase().includes(lowerCaseValue);
            });
          });
          this.setState({ data1: filteredData });
        }
    }

    render() {
        const { sid, sname, simage } = this.state;

        var addModalClose = () => this.setState({ addModalShow: false });
        var editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div className="container">
                <h2 className="text-center" style={{ marginTop: "15px" }}>Main Service</h2>
                <div className="row"  style={{display: "flex", flexDirection: "row",justifyContent: "space-between"}}>
                    <ButtonToolbar>
                        <button className="btn btn-info" onClick={() => this.setState({ addModalShow: true })}> Add Service</button>
                        <CreateServiceComponent show={this.state.addModalShow} onHide={addModalClose} />
                    </ButtonToolbar>
                    <div>
                    <FaSearch style={{position:"absolute", marginLeft:160, marginTop:12}} />
                    <input
                        type="text"
                        className="form-control"
                        style={{float:"right",width:300}}
                        placeholder="Search services"
                        onChange={(e) => this.handleChange(e.target.value)}
                        style={{paddingTop:5,paddingBottom:5}}
                    />
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th>Service Name</th>
                                <th>Service Created Date</th>
                                <th>Service Modified Date</th>
                                <th colSpan={3}>Actions</th>
                             
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {
                                this.state.data1.map(
                                    service =>
                                        <tr key={service.service_id}>
                                            <td>{service.service_name} </td>
                                            <td>{dateFormat(service.created_date, "dS mmmm, yyyy")}</td>
                                            <td>{dateFormat(service.modified_date, "dS mmmm, yyyy")}</td>
                                            <td>
                                                <ButtonToolbar>
                                                    <button className="btn btn-info" style={{ marginLeft: "30px" }} onClick={() => this.setState({
                                                        editModalShow: true,
                                                        sid: service.service_id,
                                                        sname: service.service_name,
                                                        simage: service.service_image
                                                    })}>Update</button>
                                                    <UpdateServiceComponent
                                                        show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        sid={sid}
                                                        sname={sname}
                                                        simage={simage}
                                                    />
                                                </ButtonToolbar>
                                            </td>
                                            <td>
                                                <ButtonToolbar>
                                                    <button className="btn btn-info" style={{ marginLeft: "30px",paddingLeft:20,paddingRight:20 }} onClick={e => { localStorage.setItem("service_name", service.service_name) }}><Link to='/individualsubservice' style={{ color: "white" }}>View</Link></button>
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
                                                </ButtonToolbar>
                                            </td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteService(service.service_id) }}>Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListServiceComponent;