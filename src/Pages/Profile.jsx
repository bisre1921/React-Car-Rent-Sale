import {getAuth} from "firebase/auth";
import { useEffect } from "react";
import {db} from "../firebase";
import { collection , getDocs, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import CarListingItem from "../Components/CarListingItem";

const Profile = () => {
    const [carListings , setCarListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const carListingRef = collection(db , "sales");
            const q = query(carListingRef , where("useRef" , "==" , auth.currentUser.uid) , orderBy("timestamp" , "desc"));
            const querySnap = await getDocs(q);
            const carListings = [];
            querySnap.forEach((doc) => {
                return (
                    carListings.push({
                        id : doc.id , 
                        data : doc.data()
                    })
                );  
        });
            setCarListings(carListings);
            setLoading(false);
        };
        console.log(loading);
        fetchUserProfile();
    } , [auth.currentUser.uid]);
    console.log(carListings)
  return (
        <div className="text-white max-w-7xl mx-auto">
                {!loading && carListings.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                        {carListings.map((carListing) => (
                            <CarListingItem 
                                carListing = {carListing.data}
                                key={carListing.id}
                             />
                        ))}
                    </div>
                )}
        </div>
  )
}

export default Profile