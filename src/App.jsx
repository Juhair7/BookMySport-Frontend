import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SelectRole from './Components/RoleSelection/SelectRole';
import UserReg from './Components/Registration/UserReg'
import SPReg from './Components/Registration/SPReg'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SelectRole/>}/>
          <Route exact path="/playersignup" element={<UserReg/>}/>
          <Route exact path="/spreg" element={<SPReg/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
