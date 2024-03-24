import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../firebase"
import { useState } from "react"
import {toast} from "react-toastify"
import CarListingItem from "../Components/CarListingItem"
import ClipLoader from "react-spinners/ClipLoader";

const Rent = ({theme}) => {
    const [carListings  , setCarListings] = useState(null);
    const [loading , setLoading] = useState(true);
    const [lastFetchedDoc , setLastFetchedDoc] = useState(null);

    useEffect(() => {
        const fetchListings = async() => {
            try {
                const carListingsRef = collection(db , "sales");
                const q = query(carListingsRef , where("type" , "==" , "rent") , orderBy("timestamp" , "desc") , limit(6));
                const querySnap = await getDocs(q);
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedDoc(lastVisible);
                const carListings = [];
                querySnap.forEach((doc) => {
                    return carListings.push({
                        id : doc.id , 
                        data : doc.data()
                    });
                });
                setCarListings(carListings);
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching listing");
            }
           
        }
        fetchListings();
    } , []);

    const handleFetchMoreCars = async() => {
        try {
            setLoading(true);
            const carListingsRef = collection(db , "sales");
            const q = query(carListingsRef , where("type" , "==" , "rent") , orderBy("timestamp" , "desc") , startAfter(lastFetchedDoc) , limit(3));
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedDoc(lastVisible);
            const carListings = [];
                querySnap.forEach((doc) => {
                    return carListings.push({
                        id : doc.id , 
                        data : doc.data()
                    });
                });
            setCarListings((prevListings) => [...prevListings, ...carListings]);
            setLoading(false);
        } catch (error) {
            toast.error("Error fetching listing");
            console.log(error);
        }
    };

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
        <h1 className="text-center text-xl lg:text-3xl font-semibold mb-8">
            Rent Cars here
        </h1>
        {!loading && carListings.length > 0 && (
            <div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {carListings.map((carListing) => {
                    return (
                        <CarListingItem
                            key={carListing.id}
                            id={carListing.id}
                            carListing={carListing.data}
                            theme={theme}
                        />
                    )
                })}
            </div>
            <div>
                {lastFetchedDoc && (
                    <div className="flex justify-center items-center mt-8">
                        <button
                                onClick={handleFetchMoreCars}
                                className={`w-[200px] font-bold border rounded px-0 py-1 ${theme ? "text-black hover:bg-zinc-200" : "text-white hover:bg-transparent"}  bg-amber-700  transition duration-150 mb-4`}
                        >
                            Load more
                        </button>
                    </div>
                )}
            </div>
            </div>
        )}
    </div>
    
  )
}

export default Rent