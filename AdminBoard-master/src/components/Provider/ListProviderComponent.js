import React, { Component } from 'react';
import { CreateProviderComponent } from "./CreateProviderComponent"
import { UpdateProviderComponent } from "./UpdateProviderComponent"
import { ButtonToolbar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {FaSearch} from "react-icons/fa";

class ListProviderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            providers: [],
            count:[],
            addModalShow: false,
            editModalShow: false,
            search: "",
            data1: []
        }
    }

    componentDidMount() {
         const apiUrl = 'http://localhost:4000/api/ViewProvider';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({ providers: data.data }
            )
            console.log(data)
        });

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({ data1: data.data }
            )
            console.log(data)
        });
    fetch(apiUrl)
        .then(response => response.json())
        .then(count => {
            this.setState({ count: count.count }
            )
        });
    }
 
    componentDidUpdate(prevProps,prevState){
        if(prevState.providers!==this.state.providers && prevState.data1!==this.state.data1){
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
                    this.setState({ providers: data }
                    )
                     console.log(data)
                });
        }
       }
   
    deleteProvider(providerId) {
        console.log("Delete", providerId)
        const { data1 } = this.state;

        const id = providerId;
        console.log(id);
        const apiUrl = 'http://localhost:4000/api/Deleteprovider/' + id;
        const formData = new FormData();
        formData.append('providerId', providerId);

        const options = {
            method: 'DELETE',
            body: formData
        }

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    toast.success('Provider Deleted Successfully ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    this.setState({
                        response: result,
                        data1: data1.filter(provider => provider.provider_id !== providerId)
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
        const excludeColumns = ["provider_id", "image"];
        const lowerCaseValue = value.toLowerCase().trim();
        if (!lowerCaseValue) {
          this.setState({ data1: this.state.providers });
        } else {
          const filteredData = this.state.providers.filter((item) => {
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

        const { pid, pfirstname, plastname, pgender, pmobileno, pemail, paddress, parea, pimage } = this.state;

        var addModalClose = () => this.setState({ addModalShow: false });
        var editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div className="container">
                <h2 className="text-center" style={{ marginTop: "15px" }}>List of Provider</h2>
                <div className="row" style={{display: "flex", flexDirection: "row",justifyContent: "space-between"}}>
                    <ButtonToolbar>
                        <button className="btn btn-info" onClick={() => this.setState({ addModalShow: true })}>
                             Add Provider</button>
                        <CreateProviderComponent show={this.state.addModalShow} onHide={addModalClose} />
                    </ButtonToolbar>
                <div>
                <FaSearch style={{position:"absolute", marginLeft:163, marginTop:12}} />
                    <input
                        type="text"
                        className="form-control"
                        style={{float:"right",width:300}}
                        placeholder="Search provider"
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
                            <th>Profile</th>

                                <th>Provider Name</th>
                                <th> Gender</th>
                                <th> Email</th>
                                <th> MobileNo</th>
                                <th> Address</th>
                                <th> Area</th>
                                <th colSpan={2}>Actions</th>
                             
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {
                                this.state.data1.map(
                                    provider =>
                                        <tr key={provider.provider_id}>
                                            <td><img src={provider.image} height={80} width={80} style={{margin:0,padding:0,borderRadius:100}}/></td>

                                            <td>{this.capitalize(provider.firstname)}  {this.capitalize(provider.lastname)} </td>
                                            <td>{this.capitalize(provider.gender)}</td>
                                            <td>{provider.email}</td>
                                            <td>{provider.mobile_no}</td>
                                            <td>{this.capitalize(provider.address)}</td>
                                            <td>{this.capitalize(provider.area)}</td>

                                            <td>
                                                <ButtonToolbar>
                                                    <button className="btn btn-info" onClick={() => this.setState({
                                                        editModalShow: true,
                                                        pid: provider.provider_id,
                                                        pfirstname: provider.firstname,
                                                        plastname: provider.lastname,
                                                        pgender: provider.gender,
                                                        pmobileno: provider.mobile_no,
                                                        pemail: provider.email,
                                                        paddress: provider.address,
                                                        parea: provider.area,
                                                        pimage: provider.image
                                                    })}>Update</button>
                                                    <UpdateProviderComponent
                                                        show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        pid={pid}
                                                        pfirstname={pfirstname}
                                                        plastname={plastname}
                                                        pgender={pgender}
                                                        pmobileno={pmobileno}
                                                        pemail={pemail}
                                                        paddress={paddress}
                                                        parea={parea}
                                                        pimage={pimage}
                                                    />
                                                </ButtonToolbar>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteProvider(provider.provider_id) }}>Delete</button>
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

export default ListProviderComponent;