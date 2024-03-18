import { useState } from "react"

const Sale = () => {
    const [checkOffer , setCheckOffer] = useState(false);
    const setOffer = (event) => {
        event.preventDefault();
        setCheckOffer(!checkOffer);
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
            <form className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                <div className ="bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
                    <h1 className="text-center mb-4 text-xl">
                        Fill Car Information
                    </h1>
                    <input 
                        type="text"
                        placeholder="Model..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="number"
                        placeholder="Year..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="number"
                        placeholder="Mileage(Km)..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="VIN" 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
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
                    >
                        <option value="" disabled>Any mechanical issues?</option> {/* Placeholder */}
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
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
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Interior Color..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Body Style(Sedan , PickUp)..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <select
                    className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    defaultValue=""
                    >
                        <option value="" disabled>Anti-Lock Brakes </option> {/* Placeholder */}
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
                    >
                        <option value="" disabled>Navigation System</option> {/* Placeholder */}
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <select
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        defaultValue=""
                    >
                        <option value="" disabled>Select Transmission Type</option> {/* Placeholder */}
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                    </select>
                    <input 
                        type="number"
                        placeholder="Engine Size(L)..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Fuel Type..." 
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
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold resize-none "
                    >
                    </textarea>
                    <input 
                        type="text"
                        placeholder="Location..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Vehicle History Report..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text"
                        placeholder="Warranty Information..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                     <input 
                        type="text"
                        placeholder="Any Modifications or Upgrades..." 
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                </div>
                <div className ="bg-zinc-900 shadow-2xl py-8 px-4 rounded text-center md:mx-16 lg:mx-0">
                    <h1 className="text-center mb-4 text-xl">
                        Upload photos of the car
                    </h1>
                    <input 
                        type="file" 
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
                        className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                    />
                    <input 
                        type="text" 
                        placeholder="phone number..."
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
                            className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
                        />
                    )}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Sale