import { Input, InputGroup, InputRightElement, Button, TagLabel, HStack, Tag } from '@chakra-ui/react';
import {useState} from "react";
import { v4 as uuid } from "uuid";
import { db, storage } from "../utils/config/firebase";
import {updateDoc, doc, arrayUnion, Timestamp, serverTimestamp} from "firebase/firestore";
import { useChatContext } from "../context/ChatProvider";
import {useAuthContext} from "../context/AuthProvider";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputMessage = () =>
{
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser} = useAuthContext();
  const {data} = useChatContext();


  const handleSend = async () =>{
                                if (img)
                                {
                                  const storageRef = ref(storage, uuid());
                                  const uploadTask = uploadBytesResumable(storageRef, img);

                                  uploadTask.on(
                                          (error) => {

                                                     },
                                          () =>{
                                            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>
                                            {
                                              await updateDoc(doc(db, "chats", data.chatId), {
                                                messages: arrayUnion({
                                                  id: uuid(),
                                                  text,
                                                  senderId: currentUser.uid,
                                                  date: Timestamp.now(),
                                                  img: downloadURL,
                                                }),
                                              });
                                            });
                                          }
                                        );

                                }else
                                  {
                                    await updateDoc(doc(db, "chats", data.chatId), {
                                                             messages: arrayUnion({
                                                             id: uuid(),
                                                             text,
                                                             senderId: currentUser.uid,
                                                             date: Timestamp.now(),
                                                              }),
                                          });
                                  }

                                  //latest message
                                  await updateDoc(doc(db, "userChats", currentUser.uid), {
                                        [data.chatId + ".lastMessage"]: {
                                          text,
                                        },
                                        [data.chatId + ".date"]: serverTimestamp(),
                                      });

                                      await updateDoc(doc(db, "userChats", data.user.uid), {
                                            [data.chatId + ".lastMessage"]: {
                                              text,
                                            },
                                            [data.chatId + ".date"]: serverTimestamp(),
                                          });

                                  setText("");
                                  setImg(null);
                            }
  return(<>
            <InputGroup size='md'>
              <Input type="text" placeholder='Type message...' variant='outline' focusBorderColor='green.400'
                     fontSize="lg"  bgColor="white" color="gray.900" size='md' borderColor="green.600"
                     value={text} className="font-semibold" onChange={(e) => setText(e.target.value)}
                     onKeyDown={(e) => e.code === "Enter" && handleSend()}
                />

              <InputRightElement width="3.5rem">
                  <HStack>
                  {/*<input type="file" style={{ display: "none" }} name="file" onChange={(e) => setImg(e.target.files[0])}/>
                  <label htmlFor="file" className="text-green-500 font-bold">
                        <img src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/img.png" alt="" />
                  </label>*/}

                  <Button size='md' h="2rem" colorScheme='whatsapp' onClick={handleSend}>
                      <i className="bi bi-send-fill text-white font-bold"></i>
                  </Button>
                </HStack>
              </InputRightElement>
            </InputGroup>
        </>);
}


export default InputMessage;
