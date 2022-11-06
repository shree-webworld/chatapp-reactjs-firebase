import {useNavigate } from "react-router-dom";
import WhatsChatPic from "../assets/Whatsapp_37229.png";

export default function Navbar()
{
  const navigate = useNavigate();

  return(
          <nav className="navbar bg-[#138D7E] text-primary-content">
            <div className="text-3xl ml-20 font-semibold cursor-pointer" onClick ={ () => navigate('/')}>
              <i className="bi bi-whatsapp bg-[#48C958] text-white p-2 mask mask-circle"></i>&nbsp; WhatsChat
              {/*<img className="mask mask-circle h-10 w-10 mr-2" src={WhatsChatPic} />  WhatsChat*/}
            </div>
          </nav>
        )
}
