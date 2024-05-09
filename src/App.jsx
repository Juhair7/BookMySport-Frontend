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
import PlaygroundDetailsUpdation from "./Components/ServiceProviderDeleteOps/PlaygroundDetailsUpdation";
import CustomGamesDashBoard from "./Components/CustomGames/CustomGamesDashBoard";
import CustomGameCreation from "./Components/CustomGames/CustomGameCreation";
import CustomGameDetails from "./Components/CustomGames/CustomGameDetails";
import YourBookings from "./Components/Bookings/YourBookings"
import SlotReshedule from "./Components/Bookings/SlotReshedule"

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
          <Route exact path="/serviceproviderdashboard" element={<ServiceProviderDash />} />
          <Route exact path="/sportsupload" element={<SportsUpload />} />
          <Route exact path="/imagesupload" element={<ImagesUpload />} />
          <Route exact path="/updatearenadetails" element={<PlaygroundDetailsUpdation />} />

          {/* Booking related Routes */}
          <Route exact path="/bookslot/:arenaId" element={<BookingInterface />} />
          <Route exact path="/yourbookings" element={<YourBookings />} />

          {/* Custom games related Routes */}
          <Route exact path="/customgames" element={<CustomGamesDashBoard />} />
          <Route exact path="/createcustomgame" element={<CustomGameCreation />} />
          <Route exact path="/customgamecreate/:arenaId" element={<CustomGameDetails />} />
          <Route exact path="/slotreshedule" element={<SlotReshedule />} />


          {/* Error path */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
