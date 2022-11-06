import { Box, Center, Avatar, Heading, Tag, Container, Text } from '@chakra-ui/react';
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {useAuthContext} from "../context/AuthProvider";
import { useChatContext } from "../context/ChatProvider";
import { db } from "../utils/config/firebase";
import { Link } from "react-router-dom";


export default function ChatContactsList()
{
    let [chats, setChats] = useState([]);
    const {currentUser} = useAuthContext();
    const {dispatch} = useChatContext();


    useEffect(() => {
        const getChats = () => {  //realtime chat updates
                                  const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) =>
                                                                {
                                                                    setChats(doc.data());
                                                                }
                                                          );
                                  return () =>
                                  {
                                      unsub();
                                  };
                              };
                        currentUser.uid && getChats();

                  }, [currentUser.uid]);

                  // console.log(Object.entries(chats));
                  // console.log(currentUser);

     const handleSelect = (u) => {
                                    dispatch({ type: "CHANGE_USER", payload: u });
                                 };

      return(<>
                {
                  Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=> (

                                                        <Link key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                                                        <Box bg="green.600" h="80px"  mt={4} mb={2} borderRadius='lg' className="relative overscroll-y-scroll">
                                                          <Tag colorScheme='green.600' my={1} className="absolute left-0 top-0">
                                                            <Avatar src={chat[1].userInfo.photoURL}  size='md' name={chat[1].userInfo.displayName} mr={2} />
                                                            <Heading as='h4' size='md' color="white" noOfLines={1} className="capitalize">
                                                              {chat[1].userInfo.displayName}
                                                            </Heading>
                                                          </Tag>
                                                            <Text fontSize='md' color="white" noOfLines={1} className="capitalize pt-12">
                                                              <i className="bi bi-envelope"></i> <span>:</span> {chat[1].lastMessage?.text}
                                                            </Text>
                                                        </Box>
                                                      </Link>
                                                     )
                                            )

                }
            </>);
}
