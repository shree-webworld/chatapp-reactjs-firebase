import { Box, Center, Avatar, Heading, Tag, Container, useToast } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import {useAuthContext} from "../context/AuthProvider";
import {useState} from "react";
import {db} from "../utils/config/firebase";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc} from "firebase/firestore";
import ChatContactsList from "../components/ChatContactsList";


export default function SearchContacts()
{
  let {currentUser} = useAuthContext();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () =>
  {
         const q = query(
                          collection(db, "users"),
                          where("displayName", "==", username)
                        );

           try
           {
             const querySnapshot = await getDocs(q);
             querySnapshot.forEach((doc) => {
                                              setUser(doc.data());
                                            }
                                  );
           }catch (err)
              {
                setErr(true);
              }
  };

  const handleKey = (e) => {
                              e.code === "Enter" && handleSearch();
                           };

  const handleSelect = async () => {
                                //check whether the group(chats in firestore) exists, if not create
                                    const combinedId =
                                        currentUser.uid > user.uid
                                        ? currentUser.uid + user.uid
                                        : user.uid + currentUser.uid;
                                try
                                {
                                  const res = await getDoc(doc(db, "chats", combinedId));

                                        if (!res.exists()) {
                                          //create a chat in chats collection
                                          await setDoc(doc(db, "chats", combinedId), { messages: [] });

                                          //create user chats
                                          await updateDoc(doc(db, "userChats", currentUser.uid), {
                                            [combinedId + ".userInfo"]: {
                                              uid: user.uid,
                                              displayName: user.displayName,
                                              photoURL: user.photoURL,
                                            },
                                            [combinedId + ".date"]: serverTimestamp(),
                                          });

                                          await updateDoc(doc(db, "userChats", user.uid), {
                                            [combinedId + ".userInfo"]: {
                                              uid: currentUser.uid,
                                              displayName: currentUser.displayName,
                                              photoURL: currentUser.photoURL,
                                            },
                                            [combinedId + ".date"]: serverTimestamp(),
                                          });
                                        }
                                }catch (err)
                                  {
                                      console.log(err);
                                  }

                                      setUser(null);
                                      setUsername("");
                              }

  return(<>
        <div className="w-full px-6 py-3 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-green-100" style={{fontFamily: "'Montserrat', sans-serif"}}>
          <div className="bg-green-800 rounded-full">
            {/*<h1 className="text-2xl font-bold text-white py-2 mb-4">Contacts</h1>*/}

          </div>

            <InputGroup >
              <InputLeftElement pointerEvents='none' children={<i className="bi bi-search"></i>} />
                <Input type='text' autoFocus placeholder='Search contact' focusBorderColor="green.500" size="md"
                        onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)}  value={username}
                        bgColor="white" className="capitalize font-semibold"/>
            </InputGroup>
            {
                err &&  <span>User not found!</span>
            }

          {
            user && (
                      <Link onClick={handleSelect}>
                      <Box bg="green.600" h="60px"  mt={4} mb={2} borderRadius='lg' >
                          <Tag colorScheme='green.600' my={1} >
                            <Avatar  src={user?.photoURL} size='md' name={user?.displayName} mr={2} />
                            <Heading as='h1' size='md' color="white" noOfLines={1} className="capitalize">
                              {user?.displayName}
                            </Heading>
                          </Tag>
                      </Box>
                     </Link>
                   )
          }

          <ChatContactsList />

        </div>
        </>);
}
