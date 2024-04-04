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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<h1>Dashboard</h1>} />
          <Route exact path="/roleselect" element={<SelectRole />} />
          <Route exact path="/playersignup" element={<UserReg />} />
          <Route exact path="/spreg" element={<SPReg />} />

          <Route exact path="/login" element={<UserLogin />} />
          <Route path="/login/otpverification" element={<OTPVerification />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
