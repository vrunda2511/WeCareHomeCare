import React, { Component } from 'react';
import dateFormat from 'dateformat';
import { ToastContainer, toast } from 'react-toastify';

class SubserviceComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subservices: []
        }

    }

    componentDidMount() {
        this.refreshlist()
    }
refreshlist(){
    const apiUrl = 'http://localhost:4000/api/getAllSubCategory';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ subservices: data }));
}

componentDidUpdate(){
    this.refreshlist()
}
    deleteSubService(subserviceId) {
        console.log("Delete", subserviceId)
        const { subservices } = this.state;

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
                        subservices: subservices.filter(subservice => subservice.subservice_id !== subserviceId)
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


    render() {

        //var addModalClose = () => this.setState({ addModalShow: false });
        return (
            <div className="container">
                <h2 className="text-center" style={{ marginTop: "15px" }}>Subservice List</h2>
                
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead style={{ textAlign: "center" }}>
                            <tr>
                               
                                <th> Subservice Name</th>
                                <th> Service Price</th>
                                <th> Time Duration</th>
                                <th> Service Modified Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {
                                this.state.subservices.map(
                                    subservice =>
                                        <tr key={subservice.subservice_id}>
                                            
                                            <td> {subservice.sub_servicename} </td>
                                            <td> {subservice.price}</td>
                                            <td> {subservice.time_duration}</td>
                                            <td> { dateFormat(subservice.modified_date, "dS mmmm, yyyy")}</td>
                                           
                                            <td>
                                               
                                                <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteSubService(subservice.subservice_id) }}>Delete </button>
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

export default SubserviceComponent;