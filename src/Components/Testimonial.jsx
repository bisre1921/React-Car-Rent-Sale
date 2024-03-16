import { FaQuoteLeft } from "react-icons/fa";
const Testimonial = ({testimonial}) => {
  return (
    <div className="md:px-24 lg:px-0">
        <div className=" relative bg-zinc-900 shadow-2xl mx-4 mb-16 lg:mb-0 pb-8 pt-20">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[-50px]">
                <img 
                    src={testimonial.image} 
                    alt="testimonial image" 
                    className="h-24 w-24 rounded-full bg-slate-800 p-2"
                />
            </div>
            <h1 className="text-2xl font-bold">
                {testimonial.name}
            </h1>
            <h3 className="text-amber-700 text-lg mb-8">
                {testimonial.profession}
            </h3>
            <p className="flex flex-col items-center justify-center">
                <FaQuoteLeft className="text-white p-4 rounded-full text-5xl bg-amber-700 mb-2" />
                {testimonial.message}
            </p>
        </div>
    </div>
  )
}

export default Testimonial