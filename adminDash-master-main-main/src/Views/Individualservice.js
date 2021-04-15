import React from 'react'
import IndividualSubServiceComponent from '../components/Subservice/IndividualSubserviceComponent'
import CreateLoginComponent  from '../components/SignIn/signin'
import Navbar from '../components/Navbar/Navbar'
function Individualservice() {
    if(localStorage.getItem('token')!=undefined)
    {
        return (
            <div>
                <Navbar/>
                <IndividualSubServiceComponent />
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

export default Individualservice