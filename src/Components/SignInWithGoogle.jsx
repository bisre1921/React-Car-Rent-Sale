import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import {toast} from "react-toastify";
import { db } from "../firebase";
import {Link , useNavigate} from "react-router-dom";

const SignInWithGoogle = () => {
  const navigate = useNavigate();
  const handleSignInWithGoogle = async(event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth , provider);
      const user = userCredential.user;
      const docRef = doc(db , "users" , user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()) {
        await setDoc(docRef , {
          name : user.displayName , 
          email : user.email , 
          timestamp : serverTimestamp()
        });
      };
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google. Please try again.")
    }
  }
  return (
      <button 
        className="w-full bg-zinc-900 py-2 rounded hover:bg-zinc-700 transition duration-150 flex justify-center items-center gap-2"
        onClick={handleSignInWithGoogle}
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>
  )
}

export default SignInWithGoogle