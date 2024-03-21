import { useEffect } from "react"
import {db} from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useState } from "react";
import CarListingItem from "../Components/CarListingItem";

const BuyRent = () => {
  const [carListings , setCarListings] = useState(null);
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    const fetchCarListing = async () => {
       try {
        const carListingsRef = collection(db , "sales");
        const querySnap = await getDocs(carListingsRef);
        const carListings = [];
        querySnap.forEach((doc) => {
          return (
            carListings.push({
              id : doc.id , 
              data : doc.data()
            })
          )
        });
        setCarListings(carListings);
        setLoading(false);
       } catch (error) {
        console.log(error)
       }
    };
    fetchCarListing();
  });
  return (
    <div className="text-white max-w-7xl mx-auto my-10">
      <div>
        <h1 className="text-center mb-8">
          You an Select the car which you want to buy
        </h1>
      </div>
      {!loading && carListings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {carListings.map((carListing) => {
                return (
                  <CarListingItem
                    key={carListing.id}
                    id={carListing.id}
                    carListing={carListing.data}
                  />
                )
            })}
        </div>
      )}
     
    </div>
  )
}

export default BuyRent