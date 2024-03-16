const Contact = () => {
  return (
    <div className="mx-auto max-w-6xl text-white h-[500px] mt-[800px] lg:mt-0" id="contact">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-24 bg-zinc-900 shadow-2xl py-16 px-8 rounded">      
        <div>
          <h1 className="text-6xl font-bold mb-16 text-center">
            Contact <span  className="text-amber-700">Us</span> 
          </h1>
        </div>
        <div className="flex flex-col flex-1">
          <input 
            type="text"
            placeholder="Email..." 
            className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
          />
          <input 
            type="text" 
            placeholder="Subject..."
            className="border-white rounded w-[300px] md:w-[500px] lg:w-full mb-4 text-black pl-4 py-2 font-semibold"
          />
          <textarea placeholder="Message..." className="border-white rounded w-full mb-4 resize-none text-black h-24 pl-4 font-semibold">
          </textarea>
          <button className="w-1/3 mx-auto border rounded px-4 py-1 bg-amber-700 hover:bg-transparent transition duration-150">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact