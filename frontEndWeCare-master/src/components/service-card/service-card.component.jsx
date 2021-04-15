import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import "./service-card.styles.css"
// import { animateScroll } from 'react-scroll';
import { ArrowForward, ArrowRight } from '../videosection/videosection.styles'
import Constant from "../../api/api";



const Card = ({ service_name, service_id, service_image, history, linkUrl, match }) => {

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <div className={"service-card card text-center shadow"}>
            <div className="overflow">
                <img src={service_image} style={{ backgroundImage: `url(${service_image})` }} alt="" className="card-img-top background-image" />
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{service_name.toUpperCase()}</h4>
                {/* <p className="card-text text-secondary">Hiiiiiii</p> */}
                {/* <div className="button" onClick={ () => history.push('book')}>Book Now</div> */}
                <Link onMouseEnter={onHover} onMouseLeave={onHover} onClick={scrollToTop} className="button" to={{ pathname: '/subservices', state: service_name }}>View{hover ? <ArrowForward /> : <ArrowRight />}</Link>
                {/* `${match.url}${linkUrl}` */}
            </div>
        </div>
    )
};

export default withRouter(Card);