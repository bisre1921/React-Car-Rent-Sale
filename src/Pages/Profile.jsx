import {getAuth, updateProfile} from "firebase/auth";
import { useEffect } from "react";
import {db} from "../firebase";
import { collection , deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import CarListingItem from "../Components/CarListingItem";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [carListings , setCarListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPosts , setShowPosts] = useState(false);
    const [allowEdit , setAllowEdit] = useState(false);
    
    const auth = getAuth();
    const navigate = useNavigate();
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
        fetchUserProfile();
    } , [auth.currentUser.uid]);

    const handleShowPost = (event) => {
        event.preventDefault();
        setShowPosts((prevState) => {
            setShowPosts(!prevState);
        });
    };

    const handleAllowEdit = (event) => {
        setAllowEdit((prevState) => {
            setAllowEdit(!prevState);
        })
    };

    const handleEditInputChange = (event) => {
        setProfileData((prevState) => ({
            ...prevState , 
            [event.target.id] : event.target.value
        }))
    };

    const handleEditSubmit = async (event) => {
        try {
            if(auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser , {
                    displayName : name
                });
                
                const docRef = doc(db , "users" , auth.currentUser.uid);
                await updateDoc(docRef , {
                    name : name
                });
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error("Error updating profile. Please try again.")
        }
    };

    const handleSignOut = () => {
        auth.signOut();
        navigate("/");
    };

    const deletePost = async(listingId) => {
        if(window.confirm("Do you Want to delete your post?")) {
            const docRef = doc(db , "sales" , listingId);
            await deleteDoc(docRef);
            const updatedCarListing = carListings.filter((carListing) => {
                carListing.id !== listingId
            });
            setCarListings(updatedCarListing);
            toast.success("Successfully deleted the Car listing");
        }
    };

    const editPost = (listingId) => {
        navigate(`/edit-carListing/${listingId}`)
    };
    

  return (
        <div className="text-white max-w-7xl mx-auto my-10">
                <div className="flex flex-col justify-center items-center mx-4 lg:mx-0">
                    <p className="text-lg mb-4 capitalize text-center">
                        You can edit, delete, or update your name and posts here.
                    </p>
                    <input 
                        type="text" 
                        value={name}
                        disabled = {!allowEdit}
                        id="name"
                        onChange={handleEditInputChange}
                        className={`mb-6 w-full md:w-[50%] lg:w-[40%] rounded border transition ease-in-out px-4 py-2 ${allowEdit ? "text-black" : "bg-transparent"} `}
                    />
                    <input 
                        type="email"
                        value={email} 
                        disabled
                        id="email"
                        className="w-full md:w-[50%]  lg:w-[40%] rounded border transition ease-in-out px-4 py-2 bg-transparent"
                    />
                    <div className={`flex justify-between gap-8 lg:gap-12 2xl:gap-36  mb-6`}>
                        <p>
                            want to change your name? 
                            <span 
                                className="pl-2 text-amber-700 cursor-pointer"
                                onClick={() => {
                                    handleAllowEdit();
                                    handleEditSubmit()
                                }}
                            >
                                {allowEdit ? "Save" : "Edit"}
                            </span>
                        </p>
                        <p 
                            className="text-amber-700 cursor-pointer"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </p>
                    </div>
                    <button 
                        onClick={handleShowPost}
                        className="w-[300px] text-2xl font-bold border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150 mb-4"
                    >
                        {(showPosts && carListings.length > 0) ? "Hide My Posts" : "Show My Posts"}
                    </button>
                    {!loading && showPosts && carListings.length === 0 && (
                        <h1 className="text-white">You don't have any posts yet</h1>
                    )}
                </div>
                {!loading && carListings.length > 0 && showPosts && (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                        {carListings.map((carListing) => (
                            <CarListingItem 
                                carListing = {carListing.data}
                                key={carListing.id}
                                id={carListing.id}
                                deletePost = {() => deletePost(carListing.id)}
                                editPost = {() => editPost(carListing.id)}
                                type = {carListing.data.type}
                             />
                        ))}
                    </div>
                )}
        </div>
  )
}

export default Profile