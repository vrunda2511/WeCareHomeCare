import React from 'react'
import Navbar from '../../components/navbarother/navbar.components'
import Footer from '../../components/footer/footer.components'
import Login from '../../components/login/login.component'
import Checkout from '../../components/stripe/placedorder-component'

const PlaceorderPage = (props) => {
    if (localStorage.getItem("token") === null) {
        return (
            <div>

                <Login />

            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <Checkout/>
                <Footer />
            </div>
        )
    }

}

export default PlaceorderPage
