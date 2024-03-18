import UserAuthenticationStatus from "../Hooks/UserAuthenticationStatus";
import ClipLoader from "react-spinners/ClipLoader";
import {Outlet , Navigate} from "react-router-dom"

const PrivateRoute = () => {
    const {loggedIn , checkingStatus} = UserAuthenticationStatus();
    if(checkingStatus) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", 
          }}
      >
        <ClipLoader color="white" size={50} />
      </div>
      )
    }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-up" />
}

export default PrivateRoute