import { useEffect, useState } from "react";
import logo from "../Assets/logo.png";
import {Link} from "react-scroll";
import {useNavigate , useLocation} from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { TbLetterX } from "react-icons/tb";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";

const Navbar = ({loggedIn , handleThemeClicked , theme}) => {
    const [activeSection , setActiveSection] = useState("home");
    const [isMenuClicked , setIsMenuClicked] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const auth = getAuth();
    const [name, setName] = useState(null);

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
            } else if (scrollPosition >= 1400 && scrollPosition < 2300) {
              setActiveSection("testimonials");
            } else if(scrollPosition >= 2300) {
              setActiveSection("contact");
            }

            setIsScrolling(scrollPosition > 0);
          };
      
          window.addEventListener("scroll", handleScroll);
      
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
    } , []);

    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            if(user) {
                setName(user.displayName);
            } else {
                setName(null);
            }
            
        })
    } , [auth])

    const handleSignOut = async(event) => {
        console.log("clicked")
        //event.preventDefault();
        auth.signOut();
        navigate("/");
        console.log("finished");
    }
  return (
        <nav className={`${isScrolling && !theme ? "bg-zinc-800" : ""} ${isScrolling && theme ? "bg-zinc-200" : ""} sticky top-0 z-50 ${theme ? "text-black" : "text-white"} `}>
            <div className={`flex max-w-6xl mx-auto justify-between  ${isMenuClicked ? "items-start  text-white bg-amber-700" : "items-center"} `}>
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
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${activeSection === "home" && PathName("/") ? "active text-black md:text-amber-700" : ""}  `}>
                                <Link to="home" smooth={true} duration={500} offset={-250} 
                                        onClick={() => {
                                            navigate("/")
                                            setIsMenuClicked(false)
                                            }}>
                                    Home
                                </Link>
                            </li>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${activeSection === "about" ? "active text-black md:text-amber-700" : ""}  `}>
                                <Link to="about" smooth={true} duration={500} offset={-350}
                                        onClick={() => {
                                            setIsMenuClicked(false)
                                            }}>
                                    About
                                </Link>
                            </li>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${activeSection === "testimonials" ? "active text-black md:text-amber-700 " : ""}  `}>
                                <Link to="testimonials" smooth={true} duration={500} offset={-250}
                                        onClick={() => {
                                            setIsMenuClicked(false)
                                            }}>
                                    Testimonials
                                </Link>
                            </li>
                            <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${activeSection === "contact" ? "active text-black md:text-amber-700 " : ""}  `}>
                                <Link to="contact" smooth={true} duration={500} offset={-100}
                                        onClick={() => {
                                            setIsMenuClicked(false)
                                            }}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="md:ml-16 lg:ml-40 xl:ml-60">
                        <ul className={`flex flex-col items-center md:flex-row gap-6 ${isMenuClicked ? 'justify-center items-center' : ''}`}>
                            {!loggedIn ? (
                                    <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${PathName("/sign-in") && "active text-black md:text-amber-700"}  `} 
                                    onClick={() => {
                                        navigate("/sign-in")
                                        setIsMenuClicked(false)
                                        }}>
                                        Sign In
                                    </li>
                            ) : (
                                    <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${PathName("/profile") && "active text-black md:text-amber-700"}  `} 
                                    onClick={() => {
                                        navigate("/profile")
                                        setIsMenuClicked(false)
                                        }}>
                                        {name}
                                    </li>
                            ) }
                            
                            {!loggedIn ? (
                                <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${PathName("/sign-up") && "active text-black md:text-amber-700"}  `} 
                                onClick={() => {
                                    navigate("/sign-up")
                                    setIsMenuClicked(false)
                                    }}>
                                    Sign Up
                                </li>
                            ) : (
                                <li className={` cursor-pointer hover:text-amber-700 hover:tracking-wide transition duration-150  ${PathName("/sign-up") && "active text-black md:text-amber-700"}  `} 
                                    onClick={() => {
                                        handleSignOut();
                                        setIsMenuClicked(false)
                                        }}>
                                    Sign out
                                </li>
                            )}
                            {window.innerWidth >= 768 && (
                                <li 
                                        onClick={() => {
                                            handleThemeClicked()
                                            setIsMenuClicked(false)
                                        } } 
                                        className="text-xl cursor-pointer"
                                    >
                                        {theme ? (
                                            <IoMoon />
                                        ) : (
                                            <IoMdSunny />
                                        )}     
                                </li>
                            )}
                             
                            
                        </ul>
                    </div>
                </div>
                <div className="flex md:hidden items-center" >
                    
                    {window.innerWidth < 768 && !isMenuClicked && (
                        <div 
                            onClick={() => {
                                handleThemeClicked()
                                // setIsMenuClicked(false)
                            } } 
                            className="text-xl cursor-pointer pr-2"
                        >
                            {theme ? (
                                <IoMoon />
                            ) : (
                                <IoMdSunny />
                            )}     
                        </div> 
                    
                    )}
                    <div className=" md:hidden" onClick={handleMenuClicked}>
                        {isMenuClicked ? (
                            <TbLetterX className="text-4xl" />
                        ) : (
                            <IoMenu className="text-4xl" />
                        )}
                    </div>
                   
                </div>
            </div>
        </nav>
  )
}
export default Navbar