import signInUp from "../Assets/signInUp.png";
import {Link , useNavigate} from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import SignInWithGoogle from "../Components/SignInWithGoogle";
import SignUp from "./SignUp";
import { useState } from "react";
import {toast} from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    email : "" , 
    password : ""
  });
  const {email , password} = formData;

  const handleFormInputChange = (event) => {
    setFormData(() => ({
      ...formData , 
      [event.target.id] : event.target.value
    }));
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth , email , password);
      if(userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid email or password. Please check your credentials and try again.")
    }
  }

  return (
    <div className="max-w-7xl mx-auto  text-white">
      <h1 className="text-6xl font-bold mb-16 text-center">
        Sign <span className="text-amber-700">In</span> 
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
              value={email}
              onChange={handleFormInputChange}
              className="w-full rounded px-2 py-4 mb-6 font-bold text-xl text-black"
            />
            <input 
              type="password" 
              placeholder="password..."
              id="password"
              value={password}
              onChange={handleFormInputChange}
              className="w-full rounded px-2 py-4 mb-6 font-bold text-xl text-black"
            />
            <div className="flex gap-4 flex-col lg:flex-row justify-between mb-6">
                <p>Don't have an account?
                  <Link to="/sign-up" element={<SignUp />} className="ml-2 text-amber-700 font-bold text-xl hover:text-amber-500 transition duration-150">
                    Sign Up
                  </Link>
                </p>
                <p className="text-center border-none mt-6 lg:mt-0 lg:border px-2 py-2 rounded bg-zinc-900 hover:bg-transparent">
                  <Link to="/forgot-password" element={<ForgotPassword />}>
                    Forgot password
                  </Link>
                </p>
            </div>
            <div className="fex justify-center items-center text-center">
              <button className="w-full bg-zinc-900 shadow-xl py-2 transition duration-150 hover:bg-zinc-700 hover:shadow-2xl">
                Sign In
              </button>
              <p className="my-2">
                OR
              </p>
              <div>
                <SignInWithGoogle />
              </div>
            </div>
          </form>
        </div>
       
      </div>
    </div>
  )
}

export default SignIn