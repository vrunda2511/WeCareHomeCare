import React, { useState } from 'react'
import { ArrowForward, ArrowRight, Video, VideoBg, VideoBtn, VideoContainer, VideoContent, VideoDesc, VideoTitle } from './videosection.styles'

// Video by Michelangelo Buonarroti from Pexels

import video from '../../video/HomeService.mp4'
import { Button } from '../ButtonElements.component'



const VideoSection = () => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <VideoContainer id='home'>
            <VideoBg>
                {/* Video by Michelangelo Buonarroti from Pexels */}
                <Video autoPlay loop muted src={video} type='video/mp4' />
            </VideoBg>
            <VideoContent>
                <VideoTitle>Customer Satisfaction is Our Priority</VideoTitle>
                <VideoDesc>Home Services On Demand</VideoDesc>
                <VideoBtn>
                    <Button onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark='true' to='services'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-30}
                    >Get Started{hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </VideoBtn>
            </VideoContent>

        </VideoContainer>

    )
}

export default VideoSection
