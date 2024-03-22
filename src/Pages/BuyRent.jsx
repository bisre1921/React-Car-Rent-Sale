import { useEffect } from "react"
import {db} from "../firebase";
import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import CarListingItem from "../Components/CarListingItem";
import { Link } from "react-router-dom";

const BuyRent = () => {
  //const [carListings , setCarListings] = useState(null);
  const [saleListings , setSaleListings] = useState(null);
  const [rentListings , setRentListings] = useState(null);
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    const fetchCarListing = async () => {
       try {
        const carListingsRef = collection(db , "sales");
        const q = query(carListingsRef , where("type" , "==" , "sale") , orderBy("timestamp" , "desc") , limit(3));
        const querySnap = await getDocs(q);
        const carListings = [];
        querySnap.forEach((doc) => {
          return (
            carListings.push({
              id : doc.id , 
              data : doc.data()
            })
          )
        });
        setSaleListings(carListings);
        setLoading(false);
       } catch (error) {
        console.log(error)
       }
    };
    fetchCarListing();
  });

  useEffect(() => {
    const fetchCarListing = async () => {
       try {
        const carListingsRef = collection(db , "sales");
        const q = query(carListingsRef , where("type" , "==" , "rent") , orderBy("timestamp" , "desc") , limit(3));
        const querySnap = await getDocs(q);
        const carListings = [];
        querySnap.forEach((doc) => {
          return (
            carListings.push({
              id : doc.id , 
              data : doc.data()
            })
          )
        });
        setRentListings(carListings);
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
          Buy OR Rent
        </h1>
      </div>
      <div className="mb-16">
        <div className="mb-4">
          <h1 className="">
            You can Select the car which you want to buy
          </h1>
          <Link to="/buy">
            Show More Cars to Buy
          </Link>
        </div>
          {!loading && saleListings.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {saleListings.map((saleListing) => {
                    return (
                      <CarListingItem
                        key={saleListing.id}
                        id={saleListing.id}
                        carListing={saleListing.data}
                      />
                    )
                })}
            </div>
          )}
      </div>
      <div>
        <div className="mb-4">
          <h1 className="">
            You can Select the car which you want to Rent
          </h1>
          <Link to="/rent">
            Show More Cars to Rent
          </Link>
        </div>
          {!loading && rentListings?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {rentListings.map((rentListing) => {
                    return (
                      <CarListingItem
                        key={rentListing.id}
                        id={rentListing.id}
                        carListing={rentListing.data}
                      />
                    )
                })}
            </div>
          )}
      </div>
     
    </div>
  )
}

export default BuyRent