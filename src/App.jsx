import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SelectRole from './Components/RoleSelection/SelectRole';
import UserReg from './Components/Registration/UserReg'
import SPReg from './Components/Registration/SPReg'
import UserSignInTemp from "./Components/Templates/UserSignInTemp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SelectRole/>}/>
          <Route exact path="/playersignup" element={<UserReg/>}/>
          <Route exact path="/spreg" element={<SPReg/>}/>
          <Route exact path="/login" element={<UserSignInTemp/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
