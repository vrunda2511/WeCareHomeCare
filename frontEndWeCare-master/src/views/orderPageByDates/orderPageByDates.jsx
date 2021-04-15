import React from 'react'
import Navbar from '../../components/navbarother/navbar.components'
import Footer from '../../components/footer/footer.components'
import Login from '../../components/login/login.component'
import OrderByDate from '../../components/orders/order-date.components'
import '../ordersPage/ordersPage.css'

const OrderPageByDates = () => {
    if (localStorage.getItem("token") === null) {
        return (
            <div>

                <Login />

            </div>
        )
    } else {
        return (
            <div className='ordersPage'>
                <Navbar />
                <OrderByDate />
                <Footer />
            </div>
        )
    }
}

export default OrderPageByDates
