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
import CarListing from "./Pages/CarListing";
import Profile from "./Pages/Profile";
import EditCarListing from "./Pages/EditCarListing";
import Buy from "./Pages/Buy";
import Rent from "./Pages/Rent";

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
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route> 
          <Route path="/sale" element={<PrivateRoute />}>
            <Route path="/sale" element={<Sale />} />
          </Route>
          <Route path="/buy-rent" element={<PrivateRoute />}>
            <Route path="/buy-rent" element={<BuyRent />} />
          </Route>
          <Route path="/car/:carId" element={<CarListing />} />
          <Route path="/edit-carListing/:listingId" element={<PrivateRoute />}>
            <Route path="/edit-carListing/:listingId" element={<EditCarListing />} />
          </Route>
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
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