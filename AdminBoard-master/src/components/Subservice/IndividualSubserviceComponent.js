import React, { Component } from 'react';
import { CreateSubserviceComponent } from "./CreateSubserviceComponent"
import { UpdateSubserviceComponent } from "./UpdateSubserviceComponent"
import { ButtonToolbar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom"
import {FaSearch} from "react-icons/fa";

class IndividualServiceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            individualservices: [],
            addModalShow: false,
            editModalShow: false,
            search: "",
            data1: []
        }
    }

    componentDidMount() {
        const catname = localStorage.getItem("service_name");
        console.log(catname)
        const apiUrl = 'http://localhost:4000/api/getCategoryByName/' + catname;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ individualservices: data }));

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setState({ data1: data }));
    }
     
   componentDidUpdate(prevProps,prevState){
    if(prevState.individualservices!==this.state.individualservices && prevState.data1!==this.state.data1){
        const apiUrl = 'http://localhost:4000/api/ViewProvider';
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
                this.setState({ individualservices: data }
                )
                 console.log(data)
            });
    }
   }
   

    deleteService(subserviceId) {
        console.log("Delete", subserviceId)
        const { data1 } = this.state;

        const id = subserviceId;
        const apiUrl = 'http://localhost:4000/api/DeleteSubService/' + id;
        const formData = new FormData();
        formData.append('subserviceId', subserviceId);

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
                        data1: data1.filter(individualservice => individualservice.subservice_id !== subserviceId)
                    });
                    toast.success('Deleted Successfully ', {
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
        const excludeColumns = ["subservice_id", "image"];
        const lowerCaseValue = value.toLowerCase().trim();
        if (!lowerCaseValue) {
          this.setState({ data1: this.state.individualservices });
        } else {
          const filteredData = this.state.individualservices.filter((item) => {
            return Object.keys(item).some((key) => {
              return excludeColumns.includes(key)
                ? false
                : item[key].toString().toLowerCase().includes(lowerCaseValue);
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
        const { subid, subname, subimage, subprice, subduration, subshortdesc, sublongdesc } = this.state;

        var addModalClose = () => this.setState({ addModalShow: false });
        var editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div className="container">
                <h2 className="text-center" style={{ marginTop: "15px" }}>SubServices</h2>
                <div className="row" style={{display: "flex", flexDirection: "row",justifyContent: "space-between"}}>
                    <ButtonToolbar>
                        <button className="btn btn-info" style={{marginRight: "30px",paddingLeft:30,paddingRight:30}} ><Link to='/' style={{ color: "white" ,textDecoration:"none"}}>Back</Link></button>
                        <button className="btn btn-info" onClick={() => this.setState({ addModalShow: true })} > Add Subservice</button>
                             
                        <CreateSubserviceComponent show={this.state.addModalShow} onHide={addModalClose} />
                    </ButtonToolbar>
                    <div>
                    <FaSearch style={{position:"absolute", marginLeft:175, marginTop:12}} />
                    <input
                        type="text"
                        className="form-control"
                        style={{float:"right",width:400}}
                        placeholder="Search subsubservices"
                        onChange={(e) => this.handleChange(e.target.value)}
                        style={{paddingTop:5,paddingBottom:5}}
                    />
                    </div>
                        
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered" style={{textAlign:"center"}}>

                        <thead style={{ textAlign: "center" }}>
                            <tr>
                            <th>Subservice Image</th>
                                {/* <th>Service Name</th> */}
                                <th>Subservice Name</th>
                                <th>Provider Name</th>
                              
                                <th>Subservice price</th>
                                <th>Subservice duration</th>
                                <th colSpan={2}>Action</th>
                              
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {
                                this.state.data1.map(
                                    individualservice =>
                                        <tr key={individualservice.subservice_id}>
                                            <td><img src= {individualservice.image} height={80} width={80} style={{borderRadius:5}}/>
                                               </td>
                                            {/* <td>{localStorage.getItem("service_name")}</td> */}
                                            <td>{this.capitalize(individualservice.sub_servicename)} </td>
                                            <td>{this.capitalize(individualservice.providername)} {this.capitalize(individualservice.providerlname)}</td>
                                            
                                            <td> ₹{individualservice.price}</td>
                                            <td>{individualservice.time_duration}</td>

                                            <td>
                                                <ButtonToolbar>
                                                    <button className="btn btn-info" onClick={() => this.setState({
                                                        editModalShow: true,
                                                        subid: individualservice.subservice_id,
                                                        subname: individualservice.sub_servicename,
                                                        subimage: individualservice.image,
                                                        subprice: individualservice.price,
                                                        subduration: individualservice.time_duration,
                                                        subshortdesc: individualservice.short_description,
                                                        sublongdesc: individualservice.long_description
                                                    })}>Update</button>
                                                    <UpdateSubserviceComponent
                                                        show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        subid={subid}
                                                        subname={subname}
                                                        subimage={subimage}
                                                        subprice={subprice}
                                                        subduration={subduration}
                                                        subshortdesc={subshortdesc}
                                                        sublongdesc={sublongdesc}
                                                    />
                                                </ButtonToolbar>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteService(individualservice.subservice_id) }}>Delete</button>
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

export default IndividualServiceComponent;