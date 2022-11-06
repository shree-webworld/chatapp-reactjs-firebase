import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useChatContext } from "../context/ChatProvider";
import { db } from "../utils/config/firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useChatContext();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) =>
                                {
                                    doc.exists() && setMessages(doc.data().messages);
                                }
                            );

     return () =>
     {
       unSub();
     };
  }, [data.chatId]);

  console.log(messages);

  return (<>

      {
        messages.map((m) => (
                              <Message message={m} key={m.id} />
                            )
                    )
      }
    
    </>);
};

export default Messages;
