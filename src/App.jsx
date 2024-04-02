import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SelectRole from './Components/RoleSelection/SelectRole';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SelectRole/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
