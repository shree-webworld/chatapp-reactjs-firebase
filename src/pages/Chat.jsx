
import { useTitle } from 'react-haiku';
import {useNavigate } from "react-router-dom";
import {useEffect} from "react";
import ChatNavbar from "../components/ChatNavbar";
import SearchContacts from "../components/SearchContacts";
import ChatContainer from "../components/ChatContainer";
import ChatContactsList from "../components/ChatContactsList";
import {useAuthContext} from "../context/AuthProvider";


export default function Chat()
{
  useTitle("WhatsChat - Start Chat");
  let {currentUser} = useAuthContext();
  console.log("currentUser ",currentUser);

  const navigate = useNavigate();


  /*useEffect(() => {
                    if(currentUser)
                    {
                      navigate("/chat", {replace:true});
                    }
                  }, [currentUser, navigate]);*/


  return(<>

            <ChatNavbar />

              <section className="p-6 bg-gray-100 text-gray-800">
                <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">

                  <SearchContacts />

              		{/*<img src="https://source.unsplash.com/random/480x360" alt="" className="object-cover w-full rounded-md xl:col-span-3 bg-gray-500" />*/}
                  <ChatContainer />

              	</div>
              </section>
        </>);
}
