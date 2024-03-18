import Home from "../Components/Home";
import About from "../Components/About";
import Testimonials from "../Components/Testimonials";
import Contact from "../Components/Contact";

const FrontPage = ({loggedIn}) => {
 
  return (
    <div className="overflow-x-hidden mx-auto pt-[20px]">
           <Home loggedIn={loggedIn} />
          <About loggedIn={loggedIn} />
          <Testimonials loggedIn={loggedIn} />
          <Contact loggedIn={loggedIn} />
    </div>
  )
}

export default FrontPage