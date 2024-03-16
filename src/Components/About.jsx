import about from "../Assets/about.png";

const About = () => {
  return (
    <div className="mt-80 max-w-7xl mx-auto h-[700px] text-white ">
         <h1 className="text-6xl font-bold mb-16 text-center">
            About <span className="text-amber-700">CarConnect</span>
          </h1>
      <div id="about" className="flex items-center flex-col xl:flex-row gap-8 justify-between mx-[10px]">
        <div className="">
          <img 
            src={about} 
            alt="about section image" 
            className="h-72"
          />
        </div>
        <div className="flex-1 text-center">
            <p className="tracking-wider font-medium text-lg text-center">
            At <span className="text-amber-700 font-semibold">CarConnect</span> , we're passionate about providing you with the ultimate automotive experience. Whether you're in the market to buy your dream car, looking to sell your current vehicle hassle-free, or seeking a convenient rental option for your next adventure, we've got you covered. With our intuitive platform and dedicated team, we strive to make the car-buying, selling, and renting process seamless and enjoyable. Join us on our journey to revolutionize the way you interact with automobiles
            </p>
        </div>
      </div>
    </div>
  )
}

export default About