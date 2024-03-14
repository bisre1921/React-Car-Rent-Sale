import Home from "../Components/Home";
import About from "../Components/About";
import Testimonials from "../Components/Testimonials";
import Contact from "../Components/Contact";

const FrontPage = () => {
  return (
    <div className="max-w-6xl mx-auto pt-[100px]">
        <Home />
        <About />
        <Testimonials />
        <Contact />
    </div>
  )
}

export default FrontPage