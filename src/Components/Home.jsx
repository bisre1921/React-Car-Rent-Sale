import home2 from "../Assets/home2.jpg";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
      <div>
         <div 
            id="home" 
            className="relative h-[600px]"
            style={{
              background : `url(${home2}) center, no-repeat`,
              backgroundSize: "cover" ,
              backgroundRepeat: "no-repeat" ,
            }}
          >   
         </div>
            <div className="absolute top-[150px] left-[10px] md:left-[50px] 2xl:top-[150px] 2xl:left-[190px] bg-transparent mt-20 text-white">
              <div className="">
                <h1 className="text-3xl lg:text-6xl font-bold mb-4">
                  Unlock Your <span className="text-amber-700">Automotive Destiny</span> 
                </h1>
                <h3 className="text-xl lg:text-3xl font-semibold mb-8 2xl:pl-20">
                  Your <span className="text-amber-700">Premier</span>  Destination for Car Sales and Rentals
                </h3>
              </div>
              <p className="tracking-wider font-medium text-md lg:text-xl mb-4 ">
                Welcome to our premier car hub, where you can effortlessly sell, rent, or buy the perfect vehicle. <br />
                With our user-friendly platform, you can seamlessly list your car for sale, browse available rentals, or find your next ride. <br />
                <span className="text-amber-700">Experience automotive freedom today.</span> 
              </p>
              <div className="flex gap-8">
                <button className="border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150" onClick={() => navigate("/sign-in")}>
                  Sign-In
                </button>
                <button className="border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150" onClick={() => navigate("/sign-up")}>
                  Sign-Up
                </button>
              </div>
            </div>
      </div>
  )
}

export default Home