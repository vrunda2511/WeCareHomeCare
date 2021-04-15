import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/HomePage.jsx";
import "antd/dist/antd.css";
import SignInPage from "./views/sign-in-sign-up-page/sign-in.component";
import SignUpPage from "./views/sign-in-sign-up-page/sign-up.component";
import SubServeicePage from "./views/subServicePage/subServicePage";
import OrderPage from "./views/ordersPage/orderPage";
import ProfilePage from "./views/Profilepage/profilepage";
import ForgetPassword from "./views/ForgetPasswordpage/Forgetpassword";
import ResetPassword from "./views/ResetPasswordPage/ResetPassword";
import UpdatePass from "./views/UpdatePassword/updatepassword";
import OrderPageByDates from "./views/orderPageByDates/orderPageByDates";
import PlaceorderPage from "./views/Placeorderpage/placeorder";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/profile" component={ProfilePage} />
       
        <Route path="/ForgetPassword" component={ForgetPassword} />
        <Route path="/ResetPassword" component={ResetPassword} />
        <Route path="/updatepassword" component={UpdatePass} />
        <Route path="/yourorders" component={OrderPage} />
        <Route path="/orders" component={OrderPageByDates} />
        <Route path="/placed" component={PlaceorderPage} />

        
        
        <Route
          path="/subservices"
          component={props => <SubServeicePage {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
