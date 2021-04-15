import React, { useState, useEffect } from 'react'
import './profile.styles.css'
import { ToastContainer, toast } from 'react-toastify';
import Constant from "../../api/api";
import image from "../../images/profile.jpg";

const Profile = () => {

	const [details, setdetails] = useState([{
		firstname: "",
		lastname: "",
		gender: "",
		mobile_no: "",
		email: "",
		file: "",
		address: "",
		area: "",
		city: ""
	}]);


	useEffect(() => {
		// var urlencoded = new URLSearchParams();
		var requestOptions = {
			method: 'GET',
			// body: urlencoded,
			redirect: 'follow'
		};
		var id = localStorage.getItem("customer_id");

		fetch(Constant.API_URL+"/ViewCustomer/" + id, requestOptions)
			.then(response => response.json())
			.then(data => setdetails(data[0]))
			.catch(error => console.log('error', error));
			console.log(details)

	}, [])

	function onfileupload(evt) {
		// details.file=e.target.files[0];
		// console.log(details.file)
		const value = evt.target.files[0];
		setdetails({
			...details,
			[evt.target.name]: value
		});
		console.log(value)
	}

	function handleChange(evt) {
		const value = evt.target.value;
		setdetails({
			...details,
			[evt.target.name]: value
		});
	}


	function handleSubmit(event) {
	
		var formdata = new FormData();
		formdata.append("firstname", details.firstname);
		formdata.append("lastname", details.lastname);
		formdata.append("mobile_no", details.mobile_no);
		formdata.append("email", details.email);
		formdata.append("address", details.address);
		formdata.append("profilepicture", details.file);
		formdata.append("area", details.area);
		formdata.append("city", details.city);
		formdata.append("gender", details.gender);

		var requestOptions = {
			method: 'PUT',
			body: formdata,
			redirect: 'follow'
		};

		var customer_id = localStorage.getItem("customer_id");
		fetch(Constant.API_URL+"/UpdateCustomer/" + customer_id, requestOptions)
			.then(response => response.text())
			.then(result => {
				console.log(result)
				toast.success('Profile Updated Successfully', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.location.reload(false);
			})
			.catch(error => console.log('error', error));


	}

	return (
		<div className='profilePage' style={{ marginTop: 80 }}>
			<div className="container">
				<div className="row gutters">
					<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
						<div className="cardi h-100">
							<div className="cardi-body">
								<div className="account-settings">
									<div className="user-profile">
										<div className="user-avatar">
											{details.image===""?(
                    <img
                      src={image}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100,
                        marginBottom: 20
                      }}
                    />
                  ):
										(	<img src={details.image} alt="Maxwell Admin" />)}

										</div>
										<h5 className="user-name">{details.firstname} {details.lastname}</h5>
										<h6 className="user-mobile_no">{details.mobile_no}</h6>
										<h6 className="user-email">{details.email}</h6>
									</div>
									<div className="about">
										<h5 style={{color:"#ffe484",fontWeight:"bold"}}>Address</h5>
										<p>Address :- {details.address}</p>
										<p>Area :- {details.area}</p>
										<p>City :- {details.city}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
						<form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
							<div className="cardi h-100">
								<div className="cardi-body">
									<div className="row gutters">

										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<h6 className="mb-2 " style={{color:"#ffe484",fontWeight:"bold"}}>Personal Details</h6>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="firstName">First Name</label>
												<input type="text" name='firstname' defaultValue={details.firstname} onChange={handleChange} className="form-control" id="firstName" placeholder="Enter First Name" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="lastName">Last Name</label>
												<input type="text" name='lastname' defaultValue={details.lastname} onChange={handleChange} className="form-control" id="lastName" placeholder="Enter Last Name" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="gender">Gender</label>
												<input type="text" name='gender' defaultValue={details.gender} onChange={handleChange} className="form-control" id="gender" placeholder="Enter Gender" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="email">Email</label>
												<input type="email" name='email' defaultValue={details.email} onChange={handleChange} className="form-control" id="email" placeholder="Enter Email ID" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="phone">Mobile Number</label>
												<input type="text" name='mobile_no' defaultValue={details.mobile_no} onChange={handleChange} className="form-control" id="mobile" placeholder="Enter Mobile Number" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="img">Profile Picture</label>
												<input type="file" name='file' defaultValue={details.image}  onChange={onfileupload} id="img" placeholder="Choose Your Profile Picture" />
											</div>
										</div>
									</div>
									<div className="row gutters">
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<h6 className="mt-3 mb-2" style={{color:"#ffe484",fontWeight:"bold"}}>Address</h6>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="Street">Address Line</label>
												<input type="name" name='address' defaultValue={details.address} onChange={handleChange} className="form-control" id="Street" placeholder="Enter Address" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="area">Area</label>
												<input type="text" name='area' defaultValue={details.area} onChange={handleChange} className="form-control" id="sTate" placeholder="Enter Area" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="ciTy">City</label>
												<input type="name" name='city' defaultValue={details.city} onChange={handleChange} className="form-control" id="ciTy" placeholder="Enter City" />
											</div>
										</div>
									</div>
									<div className="row gutters">
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<div className="text-right">
												{/* <button type="button" id="submit" name="submit" className="btn btn-secondary cancle">Cancel</button> */}
												<button type="submit" id="submit" name="submit" className="btn btn-primary" style={{background:"#ffe484",backgroundColor:"#ffe484",border:"1px bold #ffe484",borderColor:"#ffe484",color:"#000",fontWeight:"bold"}}>Update</button>
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
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
