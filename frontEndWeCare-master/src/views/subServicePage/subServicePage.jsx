import React, { Component } from 'react';

import Navbar from '../../components/navbarother/navbar.components';
import Footer from '../../components/footer/footer.components';
import SubserveiceList from '../../components/subserviceList/subservicelist.component';
import './subServicePage.css'


class SubServicePage extends Component {


    render() {
        return (
            <div className='SubServicePage'>
                <Navbar />
                <SubserveiceList {...this.props} />
                <Footer />
            </div>
        )
    }
}

export default SubServicePage;