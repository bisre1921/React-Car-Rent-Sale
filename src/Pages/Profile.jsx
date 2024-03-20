import {getAuth} from "firebase/auth";
import { useEffect } from "react";
import {db} from "../firebase";
import { collection , getDocs, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import CarListingItem from "../Components/CarListingItem";

const Profile = () => {
    const [carListings , setCarListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPosts , setShowPosts] = useState(false);
    const [allowEdit , setAllowEdit] = useState(false);
    
    const auth = getAuth();
    const [profileData , setProfileData] = useState({
        name : auth.currentUser.displayName , 
        email : auth.currentUser.email
    });
    const {name , email} = profileData;



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

    const handleShowPost = (event) => {
        event.preventDefault();
        setShowPosts((prevState) => {
            setShowPosts(!prevState);
        })
    };

    const handleAllowEdit = (event) => {
        event.preventDefault();
        setAllowEdit((prevState) => {
            setAllowEdit(!prevState);
        })
    };

  return (
        <div className="text-white max-w-7xl mx-auto my-10">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-lg mb-4 capitalize">
                        You can edit, delete, or update your name and posts here.
                    </p>
                    <input 
                        type="text" 
                        value={name}
                        disabled = {!allowEdit}
                        className={`mb-6 w-[40%] rounded border transition ease-in-out px-4 py-2 ${allowEdit ? "text-black" : "bg-transparent"} `}
                    />
                    <input 
                        type="email"
                        value={email} 
                        disabled
                        className="w-[40%] rounded border transition ease-in-out px-4 py-2 bg-transparent"
                    />
                    <div className={`flex justify-between ${allowEdit ? "2xl:gap-20" : "2xl:gap-36"}  mb-6`}>
                        <p>
                            want to change your name and email? 
                            <span 
                                className="pl-2 text-amber-700 cursor-pointer"
                                onClick={handleAllowEdit}
                            >
                                {allowEdit ? "Apply change" : "Edit"}
                            </span>
                        </p>
                        <p className="text-amber-700 cursor-pointer">
                            Sign Out
                        </p>
                    </div>
                    <button 
                        onClick={handleShowPost}
                        className="w-[300px] text-2xl font-bold border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150 mb-4"
                    >
                        {showPosts ? "Hide My Posts" : "Show My Posts"}
                    </button>
                </div>
                {!loading && carListings.length > 0 && showPosts && (
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