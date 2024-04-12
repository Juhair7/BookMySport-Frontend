import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SelectRole from './Components/RoleSelection/SelectRole';
import UserReg from './Components/Registration/UserReg'
import SPReg from './Components/Registration/SPReg'
import UserLogin from "./Components/LoginFunction/UserLogin";
import OTPVerification from "./Components/LoginFunction/OTPVerification";
import NotFound from "./Components/Errorpages/NotFound";
import ForgotPassword from "./Components/LoginFunction/ForgotPassword";
import ResetPassword from "./Components/LoginFunction/ResetPassword";
import MainHome from "./Components/HomePage/MainHome";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainHome/>} />
          <Route exact path="/roleselect" element={<SelectRole />} />
          <Route exact path="/playersignup" element={<UserReg />} />
          <Route exact path="/spreg" element={<SPReg />} />

          <Route exact path="/login" element={<UserLogin />} />
          <Route path="/login/otpverification" element={<OTPVerification />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          

        </Routes>
      </Router>
    </>
  )
}

export default App
