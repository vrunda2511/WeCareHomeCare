import React from 'react'
import ListCustomerDetails from '../components/Customer/customer'
import CreateLoginComponent  from '../components/SignIn/signin'
import Navbar from '../components/Navbar/Navbar'
function Customer() {
    if(localStorage.getItem('token')!=undefined)
    {
        return (
            <div>
                <Navbar/>
                <ListCustomerDetails />
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

export default Customer
