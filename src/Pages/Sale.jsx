import { useState } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {getAuth} from "firebase/auth";
import {v4 as uuidv4} from "uuid";
import {toast} from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {db} from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";
import {useNavigate} from "react-router-dom";

const Sale = ({theme}) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [saleFormData , setSaleFormData] = useState({
        model : "" , 
        year : "" , 
        mileage : "" , 
        vin : "" , 
        condition : "" , 
        mechanicalIssues : "" , 
        accidentHistory : "" , 
        exteriorColor : "" , 
        interiorColor : "" , 
        bodyStyle : "" , 
        brakes : "" , 
        navigation : "" , 
        transmission : "" ,
        engineSize : "" , 
        fuelType : "" , 
        description : "" , 
        location : "" , 
        history : "" , 
        warranty : "" , 
        modification : "" ,
        sellerName : "" , 
        sellerPhoneNo : "" , 
        images : {} , 
        type: "sale" ,
        rentalPeriod : "" , 
        regularPrice : "" , 
        discountedPrice : "" ,
    })
    const {model , year , mileage , vin , exteriorColor , interiorColor , bodyStyle , engineSize , fuelType , description , location , history , warranty , modification , sellerName , sellerPhoneNo , images , type , rentalPeriod , regularPrice , discountedPrice , condition , mechanicalIssues , accidentHistory , brakes , navigation , transmission} = saleFormData;

    const [loading , setLoading] = useState(false);
    const [checkOffer , setCheckOffer] = useState(false);
    const setOffer = (event) => {
        event.preventDefault();
        setCheckOffer(!checkOffer);
    };

    const handleSaleFormInputChange = (event) => {
        if(event.target.files) {
            setSaleFormData((prevState) => ({
                ...prevState , 
                images : event.target.files
            }))
        } 
        if(!event.target.files) {
            setSaleFormData((prevState) => ({
                ...prevState , 
                [event.target.id] : event.target.value
            }))
        }
    };

    const handleSaleFormSubmit = async(event) => {
        event.preventDefault();
        setLoading(true);
        const storeCarImage = async(image) => {
            return new Promise((resolve , reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}}`;
                const storageRef = ref(storage , fileName);
                const uploadTask = uploadBytesResumable(storageRef , image);

                uploadTask.on("state_changed" ,
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    } , 
                    (error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadORL) => {
                            resolve(downloadORL);
                        })
                    }
                )
            })
        };

        const imageUrls = await Promise.all(
            [...images].map((image) => storeCarImage(image))
        ).catch((error) => {
            toast.error("Car Images not uploaded");
            return;
        });


        const saleFormDataCopy = {
            ...saleFormData ,
            imageUrls , 
            timestamp : serverTimestamp() , 
            useRef : auth.currentUser.uid
        };
        delete saleFormDataCopy.images;
        !checkOffer && delete saleFormDataCopy.discountedPrice;
        const docRef = await addDoc(collection(db , "sales") , saleFormDataCopy);
        setLoading(false);
        toast.success("Car submitted Successfully");
        navigate(`/car/${docRef.id}`)
    };

    console.log(type);

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
    <div className={` ${theme ? "text-black" : "text-white"} max-w-6xl mx-auto mt-10 mb-10`}>
        <div className="text-center">
            <h1 className="text-3xl lg:text-6xl font-bold mb-4">
                <span className="text-amber-700">Sell OR Rent</span> Your Car
            </h1>
            <h3 className="text-xl lg:text-3xl font-semibold mb-8">
                List Your Car <span className="text-amber-700">for Sale / Rent</span> 
            </h3>
        </div>
        <div>
            <form onSubmit={handleSaleFormSubmit} >
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                <div className ={` ${theme ? "bg-zinc-200" : "bg-zinc-900"}  shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0`}>
                    <h1 className="text-center mb-4 text-xl">
                        Fill Car Information
                    </h1>
                    <input 
                        type="text"
                        placeholder="Model..." 
                        id="model"
                        required
                        value={model}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="number"
                        placeholder="Year..." 
                        id="year"
                        required
                        value={year}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="number"
                        placeholder="Mileage(Km)..." 
                        id="mileage"
                        required
                        value={mileage}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="VIN" 
                        id="vin"
                        required
                        value={vin}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
                        id="condition"
                        required
                        onChange={handleSaleFormInputChange}
                        value={condition}
                    >
                        <option value="" disabled>Select condition</option> {/* Placeholder */}
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                    </select>
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
                        id="mechanicalIssues"
                        required
                        onChange={handleSaleFormInputChange}
                        value={mechanicalIssues}
                    >
                        <option value="" disabled>Any mechanical issues?</option> {/* Placeholder */}
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
                        id="accidentHistory"
                        required
                        onChange={handleSaleFormInputChange}
                        value={accidentHistory}
                    >
                        <option value="" disabled>Accident History</option> {/* Placeholder */}
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className ={` ${theme ? "bg-zinc-200" : "bg-zinc-900"} shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0`}>
                    <h1 className="text-center mb-4 text-xl">
                        Fill Exterior and Interior Features
                    </h1>
                    <input 
                        type="text"
                        placeholder="Exterior Color..." 
                        id="exteriorColor"
                        required
                        value={exteriorColor}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Interior Color..." 
                        id="interiorColor"
                        required
                        value={interiorColor}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Body Style(Sedan , PickUp)..."
                        id="bodyStyle"
                        required
                        value={bodyStyle}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
                        id="brakes"
                        required
                        onChange={handleSaleFormInputChange}
                        value={brakes}
                    >
                        <option value="" disabled>Anti-Lock Brakes </option> {/* Placeholder */}
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
                        id="navigation"
                        required
                        onChange={handleSaleFormInputChange}
                        value={navigation}
                    >
                        <option value="" disabled>Navigation System</option> {/* Placeholder */}
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
                        id="transmission"
                        required
                        onChange={handleSaleFormInputChange}
                        value={transmission}
                    >
                        <option value="" disabled>Select Transmission Type</option> {/* Placeholder */}
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                    </select>
                    <input 
                        type="number"
                        placeholder="Engine Size(L)..." 
                        id="engineSize"
                        required
                        value={engineSize}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Fuel Type..." 
                        id="fuelType"
                        required
                        value={fuelType}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                </div>
                <div className ={`${theme ? "bg-zinc-200" : "bg-zinc-900"} shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0`}>
                    <h1 className="text-center mb-4 text-xl">
                        Fill Additional Details
                    </h1>
                    <textarea
                        type="text"
                        placeholder="Description of the Car..." 
                        id="description"
                        value={description}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold resize-none "
                    >
                    </textarea>
                    <input 
                        type="text"
                        placeholder="Location..." 
                        id="location"
                        required
                        value={location}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Vehicle History Report..." 
                        id="history"
                        value={history}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Warranty Information..." 
                        id="warranty"
                        value={warranty}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                     <input 
                        type="text"
                        placeholder="Any Modifications or Upgrades..." 
                        id="modification"
                        value={modification}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                </div>
                <div className ={`${theme ? "bg-zinc-200" : "bg-zinc-900 "} shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0`}>
                    <h1 className="text-center mb-4 text-xl">
                        Upload photos of the car
                    </h1>
                    <input 
                        type="file" 
                        required
                        multiple
                        onChange={handleSaleFormInputChange}
                        className={` rounded w-[300px] md:w-[500px] lg:w-full mb-4 ${theme ? "text-black border-black" : "text-white border-white"}pl-4 py-2 font-semibold`}
                    />
                </div>
                <div className ={`${theme ? " bg-zinc-200" : " bg-zinc-900"} shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0`}>
                    <h1 className="text-center mb-4 text-xl">
                        Seller Contact
                    </h1>
                    <input 
                        type="text" 
                        placeholder="name..."
                        id="sellerName"
                        required
                        value={sellerName}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text" 
                        placeholder="phone number..."
                        id="sellerPhoneNo"
                        required
                        value={sellerPhoneNo}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                </div>
                <div className ={`${theme ? "bg-zinc-200" : "bg-zinc-900"}  shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0`}>
                    <h1 className="text-center mb-4 text-xl">
                        Price
                    </h1>
                    <h1 className="text-start">
                        SALE / RENT
                    </h1>
                    <div className="flex gap-4 justify-around mb-2 mt-2 mx-8">
                        <button 
                            value="sale"
                            id="type"
                            onClick={handleSaleFormInputChange}
                            type="button"
                            className={`w-[300px]  font-bold border rounded px-2 py-1  bg-amber-700 ${theme ? "hover:bg-zinc-100" : "hover:bg-transparent"}  transition duration-150 mb-4 ${type == "sale" ? "bg-transparent" : ""} ${type == "sale" && theme ? "bg-white" : ""} `}
                        >
                            SALE
                        </button>
                        <button 
                            value="rent"
                            id="type"
                            onClick={handleSaleFormInputChange}
                            type="button"
                            className={`w-[300px] font-bold border rounded px-2 py-1  bg-amber-700 ${theme ? "hover:bg-zinc-100" : "hover:bg-transparent"} transition duration-150 mb-4 ${type == "rent" ? "bg-transparent" : ""} ${type == "rent" && theme ? "bg-white" : ""} `}
                            
                        >
                            RENT
                        </button>
                    </div>
                    {type == "rent" && (
                        <select
                            className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                            defaultValue=""
                            id="rentalPeriod"
                            required
                            onChange={handleSaleFormInputChange}
                            value={rentalPeriod}
                        >
                            <option value="" disabled>Select Rental Period</option> {/* Placeholder */}
                            <option value="/Month">/Month</option>
                            <option value="/Week">/Week</option>
                            <option value="/15 Days">/15 Days</option>
                            <option value="/3 Days">/3 Days</option>
                            <option value="/Day">/Day</option>
                        </select>
                    )}
                    <div>
                            <input 
                                type="number" 
                                placeholder="Regular Price..."
                                id="regularPrice"
                                required
                                value={regularPrice}
                                onChange={handleSaleFormInputChange}
                                className={`border-white rounded w-[300px] md:w-[500px] lg:w-full ${type == "rent" ? "mb-0" : "mb-4"} text-black pl-4 py-2 font-semibold`}
                            />
                            {type == "rent" && (
                                <p className="text-xl font-bold mb-2">
                                    {rentalPeriod}
                                </p>
                            )}
                            <button 
                                className={`border rounded px-4 py-1  bg-amber-700 ${theme ? "hover:bg-zinc-100" : "hover:bg-transparent"} transition duration-150 mb-4`}
                                onClick={setOffer}
                            >
                                {checkOffer ? "No offer" : "With Offer"}
                            </button>
                            {checkOffer && (
                                <div>
                                    <input 
                                        type="number" 
                                        placeholder="Discounted Price..."
                                        id="discountedPrice"
                                        required
                                        value={discountedPrice}
                                        onChange={handleSaleFormInputChange}
                                        className={`border-white rounded w-[300px] md:w-[500px] lg:w-full ${type == "rent" ? "mb-0" : "mb-4"} text-black pl-4 py-2 font-semibold`}
                                    />
                                    {type == "rent" && (
                                        <p className="text-xl font-bold mb-2">
                                            {rentalPeriod}
                                        </p>
                                    )}
                               </div>
                            )}
                    </div>
                </div>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <button className={`w-[300px] text-2xl font-bold border rounded px-4 py-1 ${theme ? "text-black hover:bg-zinc-200" : "text-white hover:bg-transparent"} bg-amber-700 transition duration-150 mb-4" type="submit`}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Sale