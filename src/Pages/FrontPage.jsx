import Home from "../Components/Home";
import About from "../Components/About";
import Testimonials from "../Components/Testimonials";
import Contact from "../Components/Contact";

const FrontPage = ({loggedIn , theme}) => {
 
  return (
    <div className="overflow-x-hidden mx-auto pt-[20px]">
           <Home loggedIn={loggedIn} theme={theme} />
          <About loggedIn={loggedIn} theme={theme} />
          <Testimonials loggedIn={loggedIn} theme={theme} />
          <Contact loggedIn={loggedIn} theme={theme} />
    </div>
  )
}

export default FrontPage