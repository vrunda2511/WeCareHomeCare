import React from 'react'
import ListSubserviceComponent from '../components/Subservice/ListSubserviceComponent'
import CreateLoginComponent  from '../components/SignIn/signin'
import Navbar from '../components/Navbar/Navbar'

function Subservice() {
    if(localStorage.getItem('token')!=undefined)
    {
        return (
            <div>
                <Navbar/>
                <ListSubserviceComponent />
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

export default Subservice
