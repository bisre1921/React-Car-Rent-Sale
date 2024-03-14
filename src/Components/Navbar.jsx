import { useEffect, useState } from "react";
import logo from "../Assets/logo.png";
import {Link} from "react-scroll";

const Navbar = () => {
    const [activeSection , setActiveSection] = useState("home");

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
    })
  return (
    <div className="fixed w-full ">
        <nav  className="z-40 flex justify-between max-w-6xl mx-auto items-center">
            <div>
                <Link to="home" smooth={true} duration={500} offset={-100}>
                    <img 
                            src={logo} 
                            alt="logo image" 
                            className="h-20 cursor-pointer"
                    />
                </Link>
            </div>
            <div>
                <ul className="flex gap-12">
                        <li className={activeSection === "home" ? "active text-red-700 cursor-pointer" : "cursor-pointer"}>
                            <Link to="home" smooth={true} duration={500} offset={-100}>
                                Home
                            </Link>
                        </li>
                        <li className={activeSection === "about" ? "active text-red-700 cursor-pointer" : "cursor-pointer"}>
                            <Link to="about" smooth={true} duration={500} offset={-100}>
                                About
                            </Link>
                        </li>
                        <li className={activeSection === "testimonials" ? "active text-red-700 cursor-pointer" : "cursor-pointer"}>
                            <Link to="testimonials" smooth={true} duration={500} offset={-100}>
                                Testimonials
                            </Link>
                        </li>
                        <li className={activeSection === "contact" ? "active text-red-700 cursor-pointer" : "cursor-pointer"}>
                            <Link to="contact" smooth={true} duration={500} offset={-100}>
                                Contact
                            </Link>
                        </li>
                </ul>
            </div>
            <div>
                <ul className="flex gap-12">
                    <li 
                        className="cursor-pointer"
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign In
                    </li>
                    <li 
                        className="cursor-pointer"
                        onClick={() => navigate("/sign-up")}
                    >
                        Sign Up
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar