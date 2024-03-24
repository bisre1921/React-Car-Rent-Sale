import { useEffect } from "react"
import {db} from "../firebase";
import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import CarListingItem from "../Components/CarListingItem";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { FaSearch } from "react-icons/fa";

const BuyRent = ({theme}) => {
  const [carListings , setCarListings] = useState([]);
  const [saleListings , setSaleListings] = useState(null);
  const [rentListings , setRentListings] = useState(null);
  const [loading , setLoading] = useState(true);
  const [searchQuery , setSearchQuery] = useState("");


  const filteredCarListings = carListings?.filter((listing) => {
    const { model, year, bodyStyle } = listing.data;
    // Perform case-insensitive search for each key
    return (
      model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bodyStyle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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

  const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
  }


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
        <ClipLoader color={theme ? "black" : "white"} size={50} />
      </div>
    )
  }
  
  return (
    <div className={` ${theme ? "text-black" : "text-white"} max-w-7xl mx-auto my-10`}>
      
      <div>
          <h1 className="text-center text-xl lg:text-3xl font-semibold mb-6">
            Buy OR Rent
          </h1>
      </div>

      <div className="relative flex items-center justify-center mb-12">
        <input 
          type="text" 
          placeholder="Search..."
          onChange={handleSearchInputChange}
          className={`w-full mx-4 lg:w-[600px] ${theme ? "bg-zinc-200" : "bg-zinc-800"} rounded border h-12 px-4 pl-10`}
        />
        <FaSearch className="absolute left-8 lg:left-[220px] xl:left-[350px]" />
      </div>
      {searchQuery && (
           <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredCarListings?.map((listing) => (
              <CarListingItem
                key={listing.id}
                id={listing.id}
                carListing={listing.data}
                theme={theme}
              />
            ))}
          </div>
      )}
     
      
      <div className="mb-16">
      {!loading && !searchQuery && (
          <div className="mb-4">
            <h1 className={`text-xl ${theme ? "text-black" : "text-white"} font-bold`}>
              You can Select the car which you want to buy
            </h1>
            <Link className="font-semibold text-blue-600 hover:text-blue-900 transition duration-200" to="/buy">
              Show More Cars to Buy
            </Link>
          </div>
        )}
        
          {!loading && !searchQuery && saleListings?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {saleListings.map((saleListing) => {
                    return (
                      <CarListingItem
                        key={saleListing.id}
                        id={saleListing.id}
                        carListing={saleListing.data}
                        theme={theme}
                      />
                    )
                })}
            </div>
          )}
      </div>
      <div>
        {!loading & !searchQuery ? (
            <div className="mb-4">
              <h1 className={`text-xl ${theme ? "text-black" : "text-white"} font-bold`}>
                You can Select the car which you want to Rent
              </h1>
              <Link className="font-semibold text-blue-600 hover:text-blue-900 transition duration-200" to="/rent">
                Show More Cars to Rent
              </Link>
            </div>
        ) : (
          <h1>

          </h1>
        )}
        
          {!loading && !searchQuery && rentListings?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {rentListings.map((rentListing) => {
                    return (
                      <CarListingItem
                        key={rentListing.id}
                        id={rentListing.id}
                        carListing={rentListing.data}
                        theme={theme}
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