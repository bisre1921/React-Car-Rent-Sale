import Home from "../Components/Home";
import About from "../Components/About";
import Testimonials from "../Components/Testimonials";
import Contact from "../Components/Contact";

const FrontPage = () => {
  return (
    <div className="overflow-x-hidden mx-auto pt-[20px]">
        <Home />
        <About />
        <Testimonials />
        <Contact />
    </div>
  )
}

export default FrontPage