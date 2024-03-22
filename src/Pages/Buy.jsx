import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../firebase"
import { useState } from "react"
import {toast} from "react-toastify"
import CarListingItem from "../Components/CarListingItem"
import ClipLoader from "react-spinners/ClipLoader";

const Buy = () => {
    const [carListings  , setCarListings] = useState(null);
    const [loading , setLoading] = useState(true);
    const [lastFetchedDoc , setLastFetchedDoc] = useState(null);

    useEffect(() => {
        const fetchListings = async() => {
            try {
                const carListingsRef = collection(db , "sales");
                const q = query(carListingsRef , where("type" , "==" , "sale") , orderBy("timestamp" , "desc") , limit(6));
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
            const q = query(carListingsRef , where("type" , "==" , "sale") , orderBy("timestamp" , "desc") , startAfter(lastFetchedDoc) , limit(3));
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
                <ClipLoader color="white" size={50} />
            </div>
        )
    }

  return (
    <div className="text-white max-w-7xl mx-auto my-10">
        <h1 className="text-center mb-4 text-xl">
            Buy Cars here
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
                        />
                    )
                })}
            </div>
            <div>
                {lastFetchedDoc && (
                    <div>
                        <button
                                onClick={handleFetchMoreCars}
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

export default Buy