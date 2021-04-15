import React from 'react'
import Profile from '../../components/porfile/profile.component'
import Navbar from '../../components/navbarother/navbar.components'

import Footer from '../../components/footer/footer.components'
import Login from '../../components/login/login.component'
import { ToastContainer, toast } from 'react-toastify';



const ProfilePage = () => {
    if (localStorage.getItem("token") === null) {
        return (
            <div>
                {
                    toast.success("Login is Required", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
                <Login />
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
        )
    } else {
        return (
            <div>
                <Navbar />
                <Profile />
                <Footer />
            </div>
        )
    }

}

export default ProfilePage
