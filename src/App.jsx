import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Navbar from "./Components/Navbar";
import FrontPage from "./Pages/FrontPage";
import ForgotPassword from "./Pages/ForgotPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BuyRent from "./Pages/BuyRent";
import Sale from "./Pages/Sale";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {

  const [loggedIn , setLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      if(user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false)
      }
    });
   
  } , [auth]);

  return (
    <div>
      <Router>
        <Navbar loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<FrontPage loggedIn={loggedIn} />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="sale" element={<PrivateRoute />}>
            <Route path="/sale" element={<Sale />} />
          </Route>
          <Route path="buy-rent" element={<PrivateRoute />}>
            <Route path="/buy-rent" element={<BuyRent />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
/>
    </div>
  )
};



export default App;