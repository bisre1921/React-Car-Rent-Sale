import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react"
import { db } from "../firebase";
import {toast} from "react-toastify";

const ContactSeller = ({car , useRef , theme}) => {
    const [message , setMessage] = useState("");
    const [sellerData , setSellerData] = useState(null);

    useEffect(() => {
        const fetchSellerData = async() => {
            const docRef = doc(db , "users" , useRef);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setSellerData(docSnap.data());
            } else {
                toast.error("Could not get Seller data, please try again");
            }
        };
        fetchSellerData();
    } , [useRef]);
    console.log(car);

    const handleMessageInputChange = (event) => {
        setMessage(event.target.value);
    };

  return (
    <div>
        {sellerData !== null && (
            <div className="mt-2">
                <p className="text-center mb-2">
                    Contact {sellerData.name} for {car.model} {car.year}
                </p>
                <textarea 
                    placeholder="message..."
                    className={`resize-none w-full h-[70px] px-4 py-2 text-xl ${theme ? "bg-zinc-40 border-2" : "bg-white"} text-gray-700  border border-gray-300 rounded transition duration-150 ease-in-out`}
                    onChange={handleMessageInputChange}
                ></textarea>
                <a href={`mailto:${sellerData.email}?Subject=${car.model}&body=${message}`}>
                    <button className={`bg-blue-600 px-4 py-1 w-full ${theme ? "hover:bg-zinc-200" : "hover:bg-transparent"}  hover:border transition duration-150`}>
                        Send
                    </button>
                </a>
            </div>
        )}
        
    </div>
  )
}

export default ContactSeller