import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import validator from 'validator'
import Constant from "../../api/api";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
export default function UpdatePassword() {
    const history = useHistory();

  const classes = useStyles();
  const [password, setpassword] = useState();
  const [cpassword, setcpassword] = useState();
  const [opassword, setopassword] = useState();

  
  function updatepassword(e) {
      console.log(password,cpassword,opassword)
      if(password == null||cpassword == null||opassword==null){
        toast.error('All Fields are required!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      }
     else if (!validator.isStrongPassword(password)) {
        console.log(password)
        toast.error('Password must have 8 charecter with one uppercase,lowercase,number and one special charecter!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else if(password!==cpassword){
        toast.error('Password does not matched Please try again!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsImlhdCI6MTYxNDc2MzI0NH0.sTbvkzxBdR0X4qV89e4X4G0nYwHFBGVoPRLfpONQ-Xg");

        var urlencoded = new URLSearchParams();
        urlencoded.append("oldpassword", opassword);
        urlencoded.append("customer_id", localStorage.getItem("customer_id"));
        urlencoded.append("newpassword",password);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch(Constant.API_URL+"/UpdatePassword", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
            if (result.status === "Success") {
                toast.success('Your Password Updated Succesfully!! ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
              history.push('/')}
            else if(result.status === "failed"){
                toast.error('Your old password is not correct Please try again!! ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        
        })
        .catch(error => console.log('error', error));
            }
  }
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper} style={{marginTop:150,marginBottom:100}}>
            <Avatar className={classes.avatar} style={{backgroundColor:"#ffe484"}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Password
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={e => {
                e.preventDefault();
                updatepassword(e);
              }}>
                 <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="oldpassword"
                label="Old Password"
                type="password"
                id="oldpassword"
                onChange={e => setopassword(e.target.value)}
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                onChange={e => setpassword(e.target.value)}
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="cpassword"
                label="Confirm New Password"
                type="password"
                id="password"
                onChange={e => setcpassword(e.target.value)}
                autoComplete="current-password"
              />
    
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{background:"#ffe484",backgroundColor:"#ffe484",border:"1px bold #ffe484",borderColor:"#000",color:"#000",fontWeight:"bold"}}
              >
                Update Password
              </Button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </form>
          </div>
        </Container>
      );
}

