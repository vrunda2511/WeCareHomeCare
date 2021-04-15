// import { FaBars } from 'react-icons/fa';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';
import styled from 'styled-components';

export const Nav = styled.nav`
    opacity: ${({ scrollNav }) => (scrollNav ? '1': '0.7')};;
    background: #010606;
    /* opacity: 0.7;
    filter: alpha(opacity=70); */
    height: 65px;
    margin-top: -80px;
    display: flex;
    /* modified from space-between */
    justify-content: center;
    /* padding: 0.5rem calc((100vw - 1000px) / 2); */
    z-index: 10;
    /* Third Nav */
    /* justify-content: flex-start; */  
    /* mine */
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
`;


export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 65px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1400px;
`;

export const NavLogo = styled(LinkR)`
    /* background: #000; */
    color: #fff;
    display: flex;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
   
    align-items: center;
    font-weight: bold;
    text-decoration: none;
    color: #ffe484 !important;

    /* &:hover {
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    color: #15cdfc !important;
    } */
`;

export const MobileIcon = styled.div`
    display: none;
    color: #fff;
    &:hover {
    transition: 0.2s ease-in-out;
    /* background: #fff; */
    color: #ffe484 !important;
    text-decoration: none;
}


  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;    
    top: 0;
    right: 0;
    /* padding-bottom: px; */
    transform: translate(-100%, 18%);
    font-size: 1.8rem;
    cursor: pointer;
}
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right:-22px;    
    
    @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavItem = styled.li`
    height:65px;
    
`

export const NavLinks = styled.a`
    color: #fff !important;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1.5rem;
    height:100%;
    font-weight: 500 ;
    text-align: center;
    font-size: 1rem;
    line-height: 1.5;
    cursor: pointer;
    
    &.active{
        border-bottom: 3px solid #ffe484
    }
    &:hover {
    transition: all 0.2s ease-in-out;
    color: #ffe484 !important;
    text-decoration: none;
    }
`


export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
    display: none;
  }
`
export const NavBtnLink = styled(LinkR)`
    white-space:nowrap;
    padding: 10px 22px;
    font-weight: 500;
    color: #ffe484;
    border-color: #ffe484;
    border: 1px solid;
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    background-image: none;
    box-sizing: border-box;
    /* outline: none; */
    border-radius: .25rem;

    cursor: pointer;
    /* transition: all 0.5s ease-in-out; */
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    text-decoration: none;
    
    &:hover {
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        color: #0d0d0d !important;
        /* opacity: 100%; */
        background-color: #ffe484;
        /* border-color: #ffe484; */
        text-decoration: none;
        
    }
`
export const Cart = styled.div`
    color: #ffe484;
    margin-left: 20px;
    cursor: pointer;
    
    }
  `
  // &:hover {
    //   color: #494949;
    //   background: #ffffff;
    //   border-color: #494949;