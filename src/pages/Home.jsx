import { useTitle } from 'react-haiku';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import HomePic from "../assets/home_pic_new.jpg";
import {useNavigate } from "react-router-dom";
import {useAuthContext} from "../context/AuthProvider";
import {useEffect} from 'react';




export default function Home()
{
  useTitle("WhatsChat");
  let navigate = useNavigate();
  let {currentUser} = useAuthContext();


  /*useEffect(() => {
                    if(currentUser)
                    {
                      navigate("/chat", {replace: true});
                    }
                  }, [currentUser, navigate]);*/


  return(<>
             <Navbar />

               <section>
                 <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24" style={{fontFamily: "'Montserrat', sans-serif"}}>
                   <div className="flex flex-wrap items-center mx-auto max-w-7xl">
                     <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                       <div>
                         <div className="relative w-full max-w-lg">
                           <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                           <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                           <div className="relative">
                             <img className="object-cover object-center mx-auto rounded-lg shadow-2xl" alt="hero" src={HomePic}/>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                       <span className="mb-8 text-xs font-bold tracking-widest text-gray-600 uppercase"> Simple. Secure. Reliable </span>
                       <h1 className="tracking-wide mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">
                         With <span className="text-green-400">WhatsChat</span> , you'll get free messaging service all over the world.
                       </h1>
                       <div className="mt-0 lg:mt-6 max-w-7xl sm:flex">
                         <div className="mt-3 rounded-lg sm:mt-0">
                           <button className="btn px-10 btn-lg bg-[#138D7E] hover:bg-[#48C958] border-[#138D7E]" onClick ={ () => navigate('/signin')}>Signin</button>
                         </div>
                         <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                           <button className="btn btn-outline text-[#138D7E] hover:bg-[#48C958] border-[#138D7E] px-10 btn-lg" onClick ={ () => navigate('/signup')}>Signup</button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </section>

             <FooterSection />
        </>);
}
