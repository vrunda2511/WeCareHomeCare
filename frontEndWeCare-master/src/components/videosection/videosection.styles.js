import styled from "styled-components";
import { MdKeyboardArrowRight, MdArrowForward,MdKeyboardArrowLeft,MdArrowBack } from "react-icons/md";

export const VideoContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  height: 800px;
  position: relative;
  z-index: 1;

  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%),
      rgba(0, 0, 0, 0.6) 100%,
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
  }
`;
export const VideoBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const Video = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;
export const VideoContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 400px;

  @media screen and (max-width: 768px) {
    margin-top: 200px;
  }
  @media screen and (max-width: 480px) {
    margin-top: 200px;
  }
`;
export const VideoTitle = styled.h1`
  color: #ffe484;
  font-size: 45px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const VideoDesc = styled.p`
  margin-top: 24px;
  color: #ffe484;
  font-size: 24px;
  text-align: center;
  max-width: 600px;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
export const VideoBtn = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ArrowForward = styled(MdArrowForward)`
  /* margin-top: 8px; */
  margin-left: 8px;
  font-size: 20px;
`;
export const ArrowRight = styled(MdKeyboardArrowRight)`
  /* margin-top: 8px; */
  margin-left: 8px;
  font-size: 20px;
`;

export const ArrowBack = styled(MdArrowBack)`
   margin-top: 2px; 
  margin-right: 8px;
  font-size: 20px;
`;
export const ArrowLeft = styled(MdKeyboardArrowLeft)`
   margin-top: 2px; 
  margin-right: 8px;
  font-size: 20px;
`;

