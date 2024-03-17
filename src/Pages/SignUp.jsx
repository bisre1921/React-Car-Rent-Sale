import signInUp from "../Assets/signInUp.png";
import {Link , useNavigate} from "react-router-dom";
import SignInWithGoogle from "../Components/SignInWithGoogle";
import SignIn from "./SignIn";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {toast} from "react-toastify";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    name : "" , 
    email : "" , 
    password : ""
  });

  const [showPassword , setShowPassword] = useState(false);

  const {name , email , password} = formData;

  const handleFormInputChange = (event) => {
    setFormData((prevState) => (
      {
        ...prevState , 
        [event.target.id] : event.target.value
      }
    ));
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth , email , password);
      updateProfile(auth.currentUser , {
        displayName : name
      })
      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db , "users" , user.uid) , formDataCopy);
      toast.success("User created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error creating user. please try again")
    }

  }

  return (
    <div className="max-w-7xl mx-auto  text-white">
      <h1 className="text-6xl font-bold mb-16 text-center">
        Sign <span className="text-amber-700">Up</span> 
      </h1>
      <div className="flex flex-col lg:flex-row gap-16 justify-center items-center px-2 lg:px-8">
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
              type="text" 
              placeholder="name..."
              id="name"
              value={name}
              onChange={handleFormInputChange}
              className="w-full 2xl:w-[400px] rounded px-2 py-4 mb-6 font-bold text-xl text-black"
            />
            <input 
              type="email" 
              placeholder="email..."
              value={email}
              id="email"
              onChange={handleFormInputChange}
              className="w-full rounded px-2 py-4 mb-6 font-bold text-xl text-black"
            />
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="password..."
                value={password}
                id="password"
                onChange={handleFormInputChange}
                className="w-full rounded px-2 py-4 mb-6 font-bold text-xl text-black"
              />
              {showPassword ? (
                  <IoEyeOff  
                    className="absolute top-5 right-2 text-black text-xl cursor-pointer" 
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
              ) : (
                  <IoEye 
                    className="absolute top-5 right-2 text-black text-xl cursor-pointer" 
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
              )}
              
            </div>
            <div className="flex flex-col lg:flex-row justify-between mb-6">
                <p>have an account?
                  <Link to="/sign-in" element={<SignIn />} className="ml-2 text-amber-700 font-bold text-xl hover:text-amber-500 transition duration-150">
                    Sign In
                  </Link>
                </p>
            </div>
            <div className="fex justify-center items-center text-center">
              <button className="w-full bg-zinc-900 shadow-xl py-2 transition duration-150 hover:bg-zinc-700 hover:shadow-2xl">
                Sign Up
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

export default SignUp