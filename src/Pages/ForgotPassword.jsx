import signInUp from "../Assets/signInUp.png";
import {Link , useNavigate} from "react-router-dom";
//import ForgotPassword from "./ForgotPassword";
import SignInWithGoogle from "../Components/SignInWithGoogle";
import SignUp from "./SignUp";
import { useState } from "react";
import {toast} from "react-toastify";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import SignIn from "./SignIn";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const ForgotPassword = ({theme}) => {
  const [email , setEmail] = useState("");


  const handleFormInputChange = (event) => {
    setEmail(event.target.value);
  }

  const handleFormSubmit = async(event) => {
      event.preventDefault();
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth , email);
        toast.success("Password reset email sent successfully. Please check your inbox.");
        
      } catch (error) {
        toast.error("Failed to send password reset email. Please check your email and try again.")
      }
  }
  
  return (
    <div className={`max-w-7xl mx-auto ${theme ? "text-black" : "text-white"}`}>
      <h1 className="text-6xl font-bold mb-16 text-center">
        Forgot <span className="text-amber-700">Password</span> 
      </h1>
      <div className="flex flex-col lg:flex-row gap-16 justify-center items-center ">
        <div className="">
          <img 
            src={signInUp} 
            alt="sign in page image" 
            className="h-[400px]"
          />
        </div>
        <div className="">
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <input 
              type="email" 
              placeholder="email..."
              id="email"
              //value={email}
              onChange={handleFormInputChange}
              className={`${theme ? "bg-zinc-200 border" : ""} w-full rounded px-2 py-4 mb-6 font-bold text-xl text-black`}
            />
            <div className="flex gap-4 flex-col lg:flex-row justify-between mb-6">
                <p>Don't have an account?
                  <Link to="/sign-up" element={<SignUp />} className="ml-2 text-amber-700 font-bold text-xl hover:text-amber-500 transition duration-150">
                    Sign Up
                  </Link>
                </p>
                <p className={`text-center border-none mt-6 lg:mt-0 lg:border px-2 py-2 rounded ${theme ? "bg-zinc-200" : "bg-zinc-900"} hover:bg-transparent`}>
                  <Link to="/sign-in" element={<SignIn />}>
                    Sign In instead
                  </Link>
                </p>
            </div>
            <div className="fex justify-center items-center text-center">
              <button className={`w-full ${theme ? "bg-zinc-200" : "bg-zinc-900"} shadow-xl py-2 transition duration-150 hover:bg-zinc-700 hover:shadow-2xl`}>
                Send Reset Password
              </button>
              <p className="my-2">
                OR
              </p>
              <div>
                <SignInWithGoogle theme={theme} />
              </div>
            </div>
          </form>
        </div>
       
      </div>
    </div>
  )
}

export default ForgotPassword