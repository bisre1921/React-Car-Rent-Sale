import { getAuth, onAuthStateChanged } from "firebase/auth";
import home2 from "../Assets/home2.jpg";
import whiteHome from "../Assets/whiteHome.png"
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

const Home = ({loggedIn , theme}) => {
  const [name , setName] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      if(user) {
        setName(user.displayName);
      } else {
        setName(null);
      }
    })
  } , [auth]);

  return (
      <div>
         <div 
            id="home" 
            className={`relative h-[600px]`}
            style={{
                    backgroundImage: `url(${theme ? whiteHome : home2})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
            }}
          >   
         </div>
            <div className={`absolute top-[150px] left-[10px] md:left-[50px] 2xl:top-[150px] 2xl:left-[190px] bg-transparent mt-20 ${theme ? " text-yellow-50 font-bold" : "text-white "}`}>
              <div className="">
                {!loggedIn ? (
                    <div>
                      <h1 className="text-3xl lg:text-6xl font-bold mb-4">
                      Unlock Your <span className="text-amber-700">Automotive Destiny</span> 
                    </h1>
                    <h3 className="text-xl lg:text-3xl font-semibold mb-8">
                      Your <span className="text-amber-700">Premier</span>  Destination for Car Sales and Rentals
                    </h3>
                    <p className="tracking-wider font-medium text-md lg:text-xl mb-4 ">
                      Welcome to our premier car hub, where you can effortlessly sell, rent, or buy the perfect vehicle. <br />
                      With our user-friendly platform, you can seamlessly list your car for sale, browse available rentals, or find your next ride. <br />
                      <span className="text-amber-700">Experience automotive freedom today.</span> 
                   </p>
                    </div>
                ) : (
                  <div>
                      <h1 className="text-3xl lg:text-6xl font-bold mb-4">
                        Welcome <span className="text-amber-700">{name}</span> 
                      </h1>
                      <h3 className="text-xl lg:text-3xl font-semibold mb-8">
                      Your <span className="text-amber-700">Premier</span>  Destination for Car Sales and Rentals
                      </h3>
                      <p className="tracking-wider font-medium text-md lg:text-xl mb-4 ">
                        Explore the diverse world of car selling, renting, and buying at our premier car hub. <br /> 
                        <span className="text-amber-700">Experience automotive freedom today.</span> 
                      </p>
                  </div>
                )}
                
              </div>
              
              <div className="flex gap-8">
                {!loggedIn ? (
                    <button 
                      className="border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150" 
                      onClick={() => navigate("/sign-in")}
                    >
                      Sign-In
                    </button>
                ) : (
                    <button 
                      className="border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150" 
                      onClick={() => navigate("/sale")}
                    >
                      Sale
                    </button>
                )}

                {!loggedIn ? (
                    <button 
                      className="border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150" 
                      onClick={() => navigate("/sign-up")}
                    >
                      Sign-Up
                    </button>
                ) : (
                    <button 
                      className="border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150" 
                      onClick={() => navigate("/buy-rent")}
                    >
                      Buy / Rent
                    </button>
                )}
               
               
              </div>
            </div>
      </div>
  )
}

export default Home