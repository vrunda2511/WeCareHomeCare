import React from "react";
import ResetPasswordComponent from "../../components/Forgetpassword/resetpassword";
import ForgetPasswordComponent from "../../components/Forgetpassword/forgetpassword";

function ResetPassword() {
  if (localStorage.getItem("email") !== "undefined") {
    return (
      <div>
        <ResetPasswordComponent />
      </div>
    );
  } else {
    return (
      <div>
        <ForgetPasswordComponent />
      </div>
    );
  }
}

export default ResetPassword;
