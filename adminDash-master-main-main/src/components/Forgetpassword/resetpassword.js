import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import validator from 'validator'


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
export default function  ResetPasswordComponent() {
    const history = useHistory();

    const classes = useStyles();
    const [password,setpassword]=useState();
    const [cpassword,setcpassword]=useState();

    function resetpassword(e){
        const cust_id=localStorage.getItem("customer_id")
        if(password===cpassword){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("password", password);
            urlencoded.append("customer_id", cust_id);

            var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };
        

            fetch("http://localhost:4000/api/ForgetPassword", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                toast.success(result.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    localStorage.setItem("customer_id",undefined);
                    localStorage.setItem("email",undefined)

                    history.push('/');
            })
            .catch(error => console.log('error', error));
        }
        else if(!validator.isStrongPassword(password)){
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
        else{
            toast.error("Password not matched", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
               
        }
    }


    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Reset Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e)=>{e.preventDefault();resetpassword(e)}}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>setpassword(e.target.value)}
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="cpassword"
              label="Confirm Password"
              type="password"
              id="password"
              onChange={(e)=>setcpassword(e.target.value)}

              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset Password
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
                   <Link href="/signin" variant="body2" style={{color:"#000"}}>
                Back to sign in?
                  </Link>
            
          </form>
        </div>
      
      </Container>
    );
}
