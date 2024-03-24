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
  const [theme , setTheme] = useState(false);
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

  const handleThemeClicked = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    // Set background color based on the theme
    document.body.style.backgroundColor = theme ? "white" : "black";
  }, [theme]);

  return (
    <div> 
      <Router>
        <Navbar 
          loggedIn={loggedIn} 
          handleThemeClicked = {handleThemeClicked}
          theme = {theme}
        />
        <Routes>
          <Route path="/" element={<FrontPage theme={theme} loggedIn={loggedIn} />} />
          <Route path="/sign-in" element={<SignIn theme={theme} />} />
          <Route path="/sign-up" element={<SignUp theme={theme} />} />
          <Route path="/forgot-password" element={<ForgotPassword theme={theme} />} />
          <Route path="/profile" element={<PrivateRoute theme={theme} />}>
            <Route path="/profile" element={<Profile theme={theme}  />} />
          </Route> 
          <Route path="/sale" element={<PrivateRoute />}>
            <Route path="/sale" element={<Sale theme={theme} />} />
          </Route>
          <Route path="/buy-rent" element={<PrivateRoute />}>
            <Route path="/buy-rent" element={<BuyRent theme={theme} />} />
          </Route>
          <Route path="/car/:carId" element={<CarListing theme={theme} />} />
          <Route path="/edit-carListing/:listingId" element={<PrivateRoute />}>
            <Route path="/edit-carListing/:listingId" element={<EditCarListing theme={theme} />} />
          </Route>
          <Route path="/buy" element={<Buy theme={theme} />} />
          <Route path="/rent" element={<Rent theme={theme} />} />
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