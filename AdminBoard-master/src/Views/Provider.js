import React from 'react'
import ListProviderComponent from "../components/Provider/ListProviderComponent"
import CreateLoginComponent  from '../components/SignIn/signin'
import Navbar from '../components/Navbar/Navbar'
function Provider() {
    if(localStorage.getItem('token')!=undefined)
    {
        return (
            <div>
                <Navbar/>
                <ListProviderComponent />
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

export default Provider
