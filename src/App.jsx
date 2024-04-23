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
import ServiceProviderDash from "./Components/HomePage/ServiceProviderDash";
import SportsUpload from "./Components/ServiceProviderSportsUpload/SportsUpload";
import ImagesUpload from "./Components/ServiceProviderSportsUpload/ImagesUpload";
import MainNavBar from "./Components/NavBarComp/MainNavBar";
import BookingInterface from "./Components/SlotBookings/BookingInterface";

function App() {
  return (
    <>
      <Router>
      <MainNavBar />
        <Routes>
          {/* Authentication Related Routes */}
          <Route exact path="/" element={<MainHome />} />
          <Route exact path="/roleselect" element={<SelectRole />} />
          <Route exact path="/playersignup" element={<UserReg />} />
          <Route exact path="/spreg" element={<SPReg />} />
          <Route exact path="/login" element={<UserLogin />} />
          <Route path="/login/otpverification" element={<OTPVerification />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />


          {/* Service Provider related Routes */}
          <Route path="/serviceproviderdashboard" element={<ServiceProviderDash />} />
          <Route path="/sportsupload" element={<SportsUpload />} />
          <Route exact path="/imagesupload" element={<ImagesUpload />} />

          {/* Booking related Routes */}
          <Route exact path="/bookslot/:arenaId" element={<BookingInterface />} />


          {/* Error path */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
