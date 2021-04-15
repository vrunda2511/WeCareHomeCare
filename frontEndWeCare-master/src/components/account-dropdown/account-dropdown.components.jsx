import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './account-dropdown.styles.css'
import { useHistory } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';


export default function AccountDropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let historylink = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let history = useHistory();
  function redirectToProfile() {
    history.push('/profile');
    scroll.scrollToTop();

  }
  function redirectToUpdatePassword() {
    history.push('/updatepassword');
    scroll.scrollToTop();

  }
  function redirectToOrders() {
    history.push('/orders');
    scroll.scrollToTop();
  }
  return (
    <div>
      <Button className='dropButton' aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        Account
      <ArrowDropDownIcon />
      </Button>
      <Menu

        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        style={{
          marginTop:30,
          padding: 10,
          width: 400
        }}
      >
        <MenuItem onClick={handleClose, redirectToProfile}>Profile</MenuItem>
        <MenuItem onClick={handleClose, redirectToOrders}>Order</MenuItem>
        <MenuItem onClick={handleClose,redirectToUpdatePassword}>Update Password</MenuItem>
      </Menu>
    </div>
  );
}