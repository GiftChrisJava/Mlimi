import Link from "next/link";

export default function Home() {

  return (
    <div className="p-6 flex flex-col justify-center min-h-screen bg-gray-100">
      <section className="flex flex-col m-auto">
        <div className="">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to the <span className="text-green-700">Mlimi</span> App</h1>
          <h3 className=" text-gray-800">Your Reliable friend on the <span className="text-green-700">farm</span></h3>
        </div>
        
        {/* navigate to the options page  */}
        <div 
          className="mt-14 max-w-[130px] px-4 py-2 items-start bg-green-700 text-white rounded transform transition-transform duration-300 hover:scale-110"
        >
          <Link href="/options" >
            <h4 className="font-semibold">Get Started</h4>
          </Link>
        </div>
      </section>

    </div>
  );
}
