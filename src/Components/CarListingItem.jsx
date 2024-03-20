const CarListingItem = ({carListing}) => {
  return (
    <div className="">
        <div>
            <h1 className="text-center text-lg lg:text-2xl font-bold mb-4">
                {carListing.model} <span className="text-amber-700"> {carListing.year}</span>
            </h1>
        </div>
        <div>
            <img 
                src={carListing.imageUrls[0]} 
                alt={`${carListing.model} image`}
                className="h-[200px] w-full"
            />
        </div>
    </div>
  )
}

export default CarListingItem