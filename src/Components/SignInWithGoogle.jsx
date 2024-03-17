import { FcGoogle } from "react-icons/fc";

const SignInWithGoogle = () => {
  return (
      <button className="w-full bg-zinc-900 py-2 rounded hover:bg-zinc-700 transition duration-150 flex justify-center items-center gap-2">
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>
  )
}

export default SignInWithGoogle