import Moment from "react-moment";
import { FaLocationDot } from "react-icons/fa6";

const CarListingItem = ({carListing}) => {
  return (
    <div className="relative bg-zinc-900 shadow-2xl  py-4 px-2 rounded text-center md:mx-16 lg:mx-0 cursor-pointer" >
        <div>
            <h1 className="text-lg lg:text-2xl font-bold mb-4">
                {carListing.model} <span> {carListing.year}</span>
            </h1>
        </div>
        <div>
            <img 
                src={carListing.imageUrls[0]} 
                alt={`${carListing.model} image`}
                className="h-[200px] w-full"
            />
        </div>
        <div className="absolute top-[70px] left-3 bg-amber-700 rounded px-2 py-1">
            {carListing.timestamp && (
                <Moment fromNow>
                    {carListing.timestamp.toDate()}
                </Moment>
            )}
        </div>
        <div className="flex justify-between mt-2">
            <div>
                {carListing.discountedPrice ? (
                    <h1 className="font-bold text-lg ">
                        ${carListing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h1>
                ) : (
                    <h1 className="font-bold text-lg">
                        ${carListing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h1>
                )}
            </div>
            <div className="flex items-center gap-1">
                <FaLocationDot className="text-blue-600" />
                <h1>
                    {carListing.location}
                </h1> 
            </div>
        </div>
        <div className="text-start text-amber-700">
            {carListing.warranty && (
                <h1>
                    <span className="font-semibold">Warranty :</span> {carListing.warranty}
                </h1>
            )}
            <h1>
               <span className="font-semibold">Mileage :</span>  {carListing.mileage}km
            </h1>
            <h1>
                {carListing.bodyStyle}
            </h1>
        </div>
    </div>
  )
}

export default CarListingItem