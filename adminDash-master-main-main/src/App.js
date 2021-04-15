import { BrowserRouter as Router, Switch, Route,useHistory  } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Service from "./Views/Service"
import Subservice from "./Views/Subservice"
import Order from "./Views/Order"
import Feedback from "./Views/Feedback"
import Customer from "./Views/Customer"
import SignIN from "./Views/signin";
import SignUp from "./Views/SignUp";
import Provider from "./Views/Provider"
import Individualsubservice from "./Views/Individualservice"
import ForgetPassword from "./Views/Forgetpassword"
import ResetPassword from "./Views/ResetPassword"
import OrderCancel from "./Views/Cancelorder";


function App() {
 
  return (
       <>
        <Router>
        

          <Switch>
            <Route path="/Signin" exact component={SignIN} />
            <Route path="/Signup" exact component={SignUp} />
            <Route path="/ForgetPassword" exact component={ForgetPassword} />
            <Route path="/ResetPassword" exact component={ResetPassword} />
            <Route path="/" exact component={Service} />
            <Route path="/subservice" component={Subservice} />
            <Route path="/provider" component={Provider} />
            <Route path="/order" component={Order} />
            <Route path="/customer" component={Customer} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/individualsubservice" component={Individualsubservice} />
            <Route path="/cancelorder" component={OrderCancel} />

            

  
          </Switch>
        </Router>
      </>
    )
}

export default App;
