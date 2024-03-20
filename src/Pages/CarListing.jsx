import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { db } from "../firebase";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import SwiperCore, { EffectFade , Autoplay , Navigation,  Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle"; 

const CarListing = () => {
    const auth = getAuth();
    const params = useParams();
    const [car , setCar] = useState(null);
    const [loading , setLoading] = useState(true);
    SwiperCore.use([Autoplay, Navigation, Pagination]);

    useEffect(() => {
        const fetchCar = async() => {
            const docRef = doc(db , "sales" , params.carId);
            const docSnap =  await getDoc(docRef);
            if(docSnap.exists()) {
                setCar(docSnap.data());
                setLoading(false);
            };
        }
        fetchCar();
    } ,[]);

    if(loading) {
        return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", 
              }}
          >
            <ClipLoader color="white" size={50} />
          </div>
          )
    }
    
    return (
    <div className="text-white mx-auto mb-10">
        <div className="flex items-center justify-center">
            <h1 className="text-3xl lg:text-6xl font-bold mb-4">
                {car.model} <span className="text-amber-700">{car.year}</span>
            </h1>
        </div>
        <div className="mx-0 lg:mx-8">
            <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: "progressbar" }}
                effect="fade"
                modules={[EffectFade]}
                autoplay={{ delay: 1000 }}
            >
                {car.imageUrls.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                        <div>
                            <img
                                src={car.imageUrls[index]}
                                alt={`${car.model} images`}
                                className="w-full h-80"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
            <div className="mx-4 xl:mx-0">
                <h1 className="text-amber-700  text-center mb-4 text-2xl lg:text-4xl font-bold">
                    Car Information
                </h1>
                <div className ="flex flex-col items-start bg-zinc-900 shadow-2xl py-8 pl-4 rounded text-center md:mx-16 lg:mx-0">
                    <h3 className="font-bold mb-2 text-xl">
                        Model : <span className="text-gray-400 font-semibold text-md">{car.model}</span>
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Mileage : <span className="text-gray-400 font-semibold text-md">{car.mileage}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Vin : <span className="text-gray-400 font-semibold text-md">{car.vin}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Condition : <span className="text-gray-400 font-semibold text-md">{car.condition}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Mechanical Issues : <span className="text-gray-400 font-semibold text-md">{car.mechanicalIssues}</span>  
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Accidental History : <span className="text-gray-400 font-semibold text-md">{car.accidentHistory}</span> 
                    </h3>
                </div>
            </div>
            <div className="mx-4 xl:mx-0">
                <h1 className="text-amber-700 text-center mb-4  text-2xl lg:text-4xl font-bold">
                    Exterior and Interior features
                </h1>
                <div className ="flex flex-col items-start bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
                    <h3 className="font-bold mb-2 text-xl">
                        Exterior Color : <span className="text-gray-400 font-semibold text-md">{car.exteriorColor}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Interior Color : <span className="text-gray-400 font-semibold text-md">{car.interiorColor}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Body Style : <span className="text-gray-400 font-semibold text-md">{car.bodyStyle}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Anti Lock Brakes : <span className="text-gray-400 font-semibold text-md">{car.brakes}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Navigation System : <span className="text-gray-400 font-semibold text-md">{car.navigation}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Transmission Type : <span className="text-gray-400 font-semibold text-md">{car.transmission}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Engine Size : <span className="text-gray-400 font-semibold text-md">{car.engineSize}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Fuel Type : <span className="text-gray-400 font-semibold text-md">{car.fuelType}</span> 
                    </h3>
                </div>
            </div>
            <div className="mx-4 xl:mx-0">
                <h1 className="text-amber-700 text-center mb-4  text-2xl lg:text-4xl font-bold">
                    Additional Detail of Cars
                </h1>
                <div className ="flex flex-col items-start bg-zinc-900 shadow-2xl py-8 pl-4 rounded text-center md:mx-16 lg:mx-0">
                    
                    <h3 className="font-bold mb-2 text-xl">
                        Location : <span className="text-gray-400 font-semibold text-md">{car.location}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Vin : <span className="text-gray-400 font-semibold text-md">{car.vin}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Vehicle History Report : <span className="text-gray-400 font-semibold text-md">{car.history}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Any Modification or update : <span className="text-gray-400 font-semibold text-md">{car.modification}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl pr-[50px]">
                        Warranty Information : <span className="text-gray-400 font-semibold text-md">{car.warranty}</span> 
                    </h3>
                    
                    <h3 className="font-bold mb-2 text-xl">
                        Description : <span className="text-gray-400 font-semibold text-md">{car.description}</span> 
                    </h3>
                </div>
            </div>
            <div className="mx-4 xl:mx-0">
                <h1 className="text-amber-700 text-center mb-4  text-2xl lg:text-4xl font-bold">
                    Seller Contact
                </h1>
                <div className ="flex flex-col items-start bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
                    <h3 className="font-bold mb-2 text-xl">
                        Seller Name : <span className="text-gray-400 font-semibold text-md">{car.sellerName}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Seller Phone Number : <span className="text-gray-400 font-semibold text-md">{car.sellerPhoneNo}</span> 
                    </h3>
                </div>
            </div>
            <div className="mx-4 xl:mx-0">
                <h1 className="text-amber-700 text-center mb-4  text-2xl lg:text-4xl font-bold">
                    Car Price
                </h1>
                <div className ="flex flex-col items-start bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
                    <h3 className="font-bold mb-2 text-xl">
                        Regular Price : <span className="text-gray-400 font-semibold text-md">${car.regularPrice}</span> 
                    </h3>
                    <h3 className="font-bold mb-2 text-xl">
                        Discount Price : <span className="text-gray-400 font-semibold text-md">${car.discountedPrice}</span> 
                    </h3>
                </div>
               
            </div>
        </div>
        
    </div>
  )
}

export default CarListing