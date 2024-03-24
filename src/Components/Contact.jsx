import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

const Contact = ({theme}) => {
  return (
    <div className={`mx-auto max-w-6xl ${theme ? "text-black" : "text-white "} h-[500px] mt-[800px] lg:mt-0`} id="contact">
      <div className={`flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-24 ${theme ? "bg-zinc-200" : "bg-zinc-900"}  shadow-2xl py-16 px-8 rounded`}>      
        <div>
          <h1 className="text-6xl font-bold mb-16 text-center">
            Contact <span  className="text-amber-700">Us</span> 
          </h1>
        </div>
        <div className="flex flex-col flex-1">
          <input 
            type="text"
            placeholder="Email..." 
            className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
          />
          <input 
            type="text" 
            placeholder="Subject..."
            className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
          />
          <textarea placeholder="Message..." className="border-white rounded w-full mb-4 resize-none text-black h-24 pl-4 font-semibold">
          </textarea>
          <button className={`w-1/3 mx-auto border rounded px-4 py-1 ${theme ? "hover:bg-white" : "hover:bg-transparent"} bg-amber-700  transition duration-150`}>
            Send
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center gap-8 pt-10">
          <FaInstagram className="rounded-full bg-amber-700 p-3 text-white text-6xl cursor-pointer" />
          <FaTiktok className="rounded-full bg-amber-700 p-3 text-white text-6xl cursor-pointer"/>
          <FaTelegramPlane className="rounded-full bg-amber-700 p-3 text-white text-6xl cursor-pointer"/>
        </div>
    </div>
  )
}

export default Contact