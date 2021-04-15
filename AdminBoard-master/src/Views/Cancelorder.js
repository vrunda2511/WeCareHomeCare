import React from 'react'
import CreateLoginComponent  from '../components/SignIn/signin'
import Navbar from '../components/Navbar/Navbar'
import ListOrderCancelDetails from '../components/Order/cancelorder'
function OrderCancel() {
    if(localStorage.getItem('token')!=undefined)
    {
        return (
            <div>
                <Navbar/>
                <ListOrderCancelDetails />
            </div>
        )
    }
    else{
        return (
            <div>
                <CreateLoginComponent />
          </div>
              
        )
        
    }
}

export default OrderCancel
