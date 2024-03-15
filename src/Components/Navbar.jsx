import { useEffect, useState } from "react";
import logo from "../Assets/logo.png";
import {Link} from "react-scroll";
import {useNavigate , useLocation} from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { TbLetterX } from "react-icons/tb";

const Navbar = () => {
    const [activeSection , setActiveSection] = useState("home");
    const [isMenuClicked , setIsMenuClicked] = useState(false);

    const handleMenuClicked = () => {
        setIsMenuClicked(!isMenuClicked);
    }

    const navigate = useNavigate();
    const location = useLocation();

    const PathName = (route) => {
        if(route === location.pathname) {
            return true;
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
      
            if (scrollPosition < 700) {
              setActiveSection("home");
            } else if (scrollPosition >= 700 && scrollPosition < 1400) {
              setActiveSection("about");
            } else if (scrollPosition >= 1400 && scrollPosition < 2100) {
              setActiveSection("testimonials");
            } else {
              setActiveSection("contact");
            }
          };
      
          window.addEventListener("scroll", handleScroll);
      
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
    } , []);
  return (
        <nav className="sticky top-0 z-50  bg-black text-white">
            <div className={`flex max-w-6xl mx-auto justify-between  ${isMenuClicked ? "items-start" : "items-center"} `}>
                <div>
                    <img 
                        src={logo} 
                        alt="logo" 
                        className="h-16 md:h-24"
                    />
                </div>
                <div className={`md:flex md:flex-row ${isMenuClicked ? 'block' : 'hidden'}`}>
                    <div className="mb-[24px] md:mb-0">
                        <ul className={`flex flex-col md:flex-row gap-6 ${isMenuClicked ? 'justify-center items-center' : ''}`}>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${activeSection === "home" && PathName("/") ? "active text-amber-900 " : ""}  `}>
                                <Link to="home" smooth={true} duration={500} offset={-100} onClick={() => navigate("/")}>
                                    Home
                                </Link>
                            </li>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${activeSection === "about" ? "active text-amber-900 " : ""}  `}>
                                <Link to="about" smooth={true} duration={500} offset={-100}>
                                    About
                                </Link>
                            </li>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${activeSection === "testimonials" ? "active text-amber-900 " : ""}  `}>
                                <Link to="testimonials" smooth={true} duration={500} offset={-100}>
                                    Testimonials
                                </Link>
                            </li>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${activeSection === "contact" ? "active text-amber-900 " : ""}  `}>
                                <Link to="contact" smooth={true} duration={500} offset={-100}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="md:ml-16 lg:ml-40 xl:ml-60">
                        <ul className={`flex flex-col md:flex-row gap-6 ${isMenuClicked ? 'justify-center items-center' : ''}`}>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${PathName("/sign-in") && "active text-amber-900 "}  `} onClick={() => navigate("/sign-in")}>
                                Sign In
                            </li>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${PathName("/sign-up") && "active text-amber-900 "}}  `} onClick={() => navigate("/sign-up")}>
                                Sign Up
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex md:hidden" onClick={handleMenuClicked}>
                    {isMenuClicked ? (
                        <TbLetterX className="text-4xl" />
                    ) : (
                        <IoMenu className="text-4xl" />
                    )}
                    
                </div>
            </div>
        </nav>
  )
}

export default Navbar