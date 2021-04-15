import React,{useState,useEffect} from "react"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

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
export default function  ForgetPasswordComponent() {
  const history = useHistory();
    const classes = useStyles();
    const [email, setemail] = useState("");
    const[val,setvalue]=useState(true);
    const [otp, setotp] = useState("");
    function sendemail(e){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      
      fetch("http://localhost:4000/api/Otpsend", requestOptions)
        .then(response => response.json())
        .then(result =>{
          if(result.status==="Success"){
            toast.success('Otp sent in Your Mail Please Check it ', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              localStorage.setItem("email",email)
              setemail("")
              setvalue(false)
          }
          else
          {
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
    function sendotp(e){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("email",localStorage.getItem("email"));
      urlencoded.append("otp", otp);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("http://localhost:4000/api/Verifyotp", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
          if(result.status==="Success"){
            localStorage.setItem("customer_id",result.msg[0].customer_id)
            history.push('/ResetPassword');
          }
          else
          {
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
    return(
      <div>
         {val
      ? 
      <div>
         {/* <Button
                type="submit"

                variant="contained"
                color="primary"
                className={classes.submit}
                style={{  fontWeight: "bold",marginTop:40,marginLeft:30 }}
                onClick={(e)=>history.push("/signin")}
            // onClick={(e)=>{e.preventDefault();register(firstName,lastName,gender,mobileno,address,area,city,email,password,cpassword)}}
            >
                Back to home
            </Button> */}
      
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{marginTop:50}}></div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forget Password Here
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>{e.preventDefault();sendemail(e)}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            
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
    </div>
      :
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{marginTop:150}}></div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Write OTP Here
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>{e.preventDefault();sendotp(e)}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            
            name="otp"
            label="OTP"
            name="otp"
            type="number"
           
            onChange={(e)=>setotp(e.target.value)}
            value={otp}
            autoFocus
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send OTP
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
    }
    
      </div>
    )
   

    
  
}