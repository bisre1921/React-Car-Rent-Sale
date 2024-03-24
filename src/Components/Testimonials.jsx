import Testimonial from "./Testimonial"
import testimonial1 from "../Assets/testimonial1.png";
import testimonial2 from "../Assets/testimonial2.png";
import testimonial3 from "../Assets/testimonial3.png";

const Testimonials = ({theme}) => {
  const testimonials = [
    { 
      name : "Emily Johnson" , 
      message : "I had a great experience renting a car from this website. The process was smooth, the car was in excellent condition, and the customer service was top-notch. I highly recommend it!" , 
      profession : "Software Engineer" , 
      image : testimonial1 ,
    } , 
    { 
      name : "John Smith" , 
      message : "I recently sold my car through this platform, and I couldn't be happier with the outcome. The listing process was straightforward, and I found a buyer quickly. Thank you!" , 
      profession : "Marketing Manager" , 
      image : testimonial2 ,
    } , 
    { 
      name : "Sarah Thompson" , 
      message : "I've been using this website to search for a new car, and I'm impressed by the wide selection and user-friendly interface. It's been a breeze to navigate through different listings and compare options." , 
      profession : "Teacher" , 
      image : testimonial3 ,
    }
  ]
  return (
    <div className={`h-[700px] max-w-6xl mx-auto ${theme ? "text-black" : "text-white"}  text-center`} id="testimonials">
      <div className="mb-16">
        <h3 className="text-xl lg:text-3xl font-semibold">Testimonials</h3>
        <h1 className="text-3xl lg:text-6xl font-bold">What our <span className="text-amber-700">users</span> say</h1>

      </div>
      <div className="flex flex-col  lg:flex-row justify-between">
        {testimonials.map((testimonial) => (
          <Testimonial theme={theme} testimonial={testimonial} key={testimonial.name} />
        ))}
      </div>
    </div>
  )
}

export default Testimonials