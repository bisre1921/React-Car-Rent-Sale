import Moment from "react-moment";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import {Link} from "react-router-dom";

const CarListingItem = ({carListing , id , editPost , deletePost}) => {
    const [isEditHovering, setIsEditHovering] = useState(false);
    const [isDeleteHovering, setIsDeleteHovering] = useState(false);
  return (
    <Link to={`/car/${id}`}>
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
            <div className="flex justify-between items-center text-start text-amber-700">
                <div>
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
                <div className="flex gap-2 ">
                    {editPost && (
                        <div 
                            onMouseEnter={() => setIsEditHovering(true)} 
                            onMouseLeave={() => setIsEditHovering(false)}
                            className=""
                            onClick={() => editPost(carListing.id)}
                        >
                            <MdEdit className="text-xl text-blue-600" />
                            {isEditHovering && <span className="absolute right-10 text-white">Edit</span>}
                        </div>
                    )}
                    {deletePost && (
                        <div 
                            onMouseEnter={() => setIsDeleteHovering(true)} 
                            onMouseLeave={() => setIsDeleteHovering(false)}
                            className="relative"
                            onClick={() => deletePost(carListing.id)}
                        >
                            <MdDelete className="text-red-600 text-xl"/>
                            {isDeleteHovering && <span className="absolute right-0 text-white">Delete</span>}
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    </Link>
  )
}

export default CarListingItem