import { useState } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {getAuth} from "firebase/auth";
import {v4 as uuidv4} from "uuid";
import {toast} from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {db} from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";

const Sale = () => {
    const auth = getAuth();
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
        regularPrice : 0 , 
        discountedPrice : 0 ,
    })
    const {model , year , mileage , vin , exteriorColor , interiorColor , bodyStyle , engineSize , fuelType , description , location , history , warranty , modification , sellerName , sellerPhoneNo , images , regularPrice , discountedPrice , condition , mechanicalIssues , accidentHistory , brakes , navigation , transmission} = saleFormData;

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
    <div className="text-white max-w-6xl mx-auto mt-10 mb-10">
        <div className="text-center">
            <h1 className="text-3xl lg:text-6xl font-bold mb-4">
                <span className="text-amber-700">Sell</span> Your Car
            </h1>
            <h3 className="text-xl lg:text-3xl font-semibold mb-8">
                List Your Car <span className="text-amber-700">for Sale</span> 
            </h3>
        </div>
        <div>
            <form onSubmit={handleSaleFormSubmit} >
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                <div className ="bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
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
                <div className ="bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
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
                <div className ="bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
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
                <div className ="bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
                    <h1 className="text-center mb-4 text-xl">
                        Upload photos of the car
                    </h1>
                    <input 
                        type="file" 
                        required
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-white pl-4 py-2 font-semibold"
                    />
                </div>
                <div className ="bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
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
                <div className ="bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
                    <h1 className="text-center mb-4 text-xl">
                        Price
                    </h1>
                    <input 
                        type="number" 
                        placeholder="Regular Price..."
                        id="regularPrice"
                        required
                        value={regularPrice}
                        onChange={handleSaleFormInputChange}
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <button 
                        className="border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150 mb-4"
                        onClick={setOffer}
                    >
                        {checkOffer ? "No offer" : "With Offer"}
                    </button>
                    {checkOffer && (
                        <input 
                            type="number" 
                            placeholder="Discounted Price..."
                            id="discountedPrice"
                            value={discountedPrice}
                            onChange={handleSaleFormInputChange}
                            className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        />
                    )}
                </div>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <button className="w-[300px] text-2xl font-bold border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150 mb-4" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Sale