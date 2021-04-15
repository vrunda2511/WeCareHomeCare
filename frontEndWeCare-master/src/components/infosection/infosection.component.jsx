import React, { useState } from 'react'
import { Button } from '../ButtonElements.component'
import { ArrowForward, ArrowRight } from '../videosection/videosection.styles'
import '../service-list/service-list.styles.css'

import {
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    Column2,
    Img,
    ImgWrap,
}
    from './infosection.styles'


const InfoSection = ({ lightBg, id, imgStart, lightText, darkText, topLine, headLine, description, buttonLabel, img, alt, primary, dark, dark2 }) => {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }
    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}  >
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1 className="pagebody">
                            <TextWrapper>
                                <TopLine lightText={lightText}>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headLine}</Heading>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                                <BtnWrap><Button to='services'
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-30}
                                    primary={primary ? 1 : 0}
                                    dark={dark ? 1 : 0}
                                    dar2={dark2 ? 1 : 0}
                                    onMouseEnter={onHover} onMouseLeave={onHover}
                                >{buttonLabel}{hover ? <ArrowForward /> : <ArrowRight />}</Button></BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2 className="pagebodytitle">
                            <ImgWrap>
                                <Img src={img} alt={alt} />
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}

export default InfoSection
