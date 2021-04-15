import React, { useState, useEffect } from "react"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { ArrowBack, ArrowLeft } from '../videosection/videosection.styles'
import Constant from "../../api/api";

function Copyright() {
  useEffect(() => {
    console.log("renderes")
  }, []);
  
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        We Care Home Care
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
export default function Login() {
  const history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();
  console.log("this");
  const [hover, setHover] = useState(false)

  const onHover = () => {
      setHover(!hover)
  }
  function handleSubmit(event) {
    console.log("dfdf")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", username);
    urlencoded.append("password", password);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(Constant.API_URL+"/SignIn", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Success') {
          localStorage.setItem('token', result.token)
          localStorage.setItem('customer_id', result.data.map(({ customer_id }) => customer_id))
          localStorage.setItem('email', result.data.map(({ email }) => email))

          
          toast.success('You are Logged In ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history.push('/');

        }
        else {
          toast.error(result.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        }
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <Button
                type="submit"

                variant="contained"
                color="primary"
                className="baton baton2"
                style={{marginLeft:30,marginTop:20,paddingLeft:15,paddingRight:25,background:"#000",border:"1px solid #000!important",color: "black"}}
                // style={{ background: "#ffe484", backgroundColor: "#ffe484", border: "1px bold #ffe484", borderColor: "#000", color: "#000", fontWeight: "bold",marginTop:0,marginLeft:30 }}
                onClick={(e)=>history.push("/")}
                onMouseEnter={onHover} onMouseLeave={onHover}>
            {hover ? <ArrowBack /> : <ArrowLeft />}
            
                Back to home
            </Button>
  
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}style={{marginTop:0}}>
        <Avatar className={classes.avatar} style={{backgroundColor:"#ffe484"}}>
         
        </Avatar>
        <Typography component="h1" variant="h5" style={{color:"#000",fontWeight:"bold"}}>
          Sign in
            </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={e => setUserName(e.target.value)}
            label="Email Address"
            style={{border:"1px bold #ffe484"}}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            id="password"
          />

          <Button

            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            // onClick={(e)=>{e.preventDefault();login(username,password)}}  
            
            className={classes.submit}
            style={{background:"#ffe484",backgroundColor:"#ffe484",border:"1px bold #ffe484",borderColor:"#000",color:"#000",fontWeight:"bold"}}
          >
            Sign In
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
          <Grid container>
            <Grid item xs>
              <Link href="/ForgetPassword" variant="body2" style={{color:"#000"}}>
                Forgot password?
                  </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" style={{color:"#000"}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
    </div>
  );
}