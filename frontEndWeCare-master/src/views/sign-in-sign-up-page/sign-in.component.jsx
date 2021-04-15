import React from 'react'
// import Navbar from '../../components/navabar/navbar.components'
// import Footer from '../../components/footer/footer.components'
import './sign-in-sign-up.styles.scss'
// import SignIn from '../../components/sign-in/sign-in.components'
// import SignUp from '../../components/sign-up/sign-up.components'
import Login from '../../components/login/login.component'



const SignInPage = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <div className='sign-in-sign-up'>
                {/* <SignIn /> */}
                <Login />
                {/* <SignUp />           */}
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default SignInPage
