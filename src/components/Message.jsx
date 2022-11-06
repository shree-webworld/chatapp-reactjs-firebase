import { useChatContext } from "../context/ChatProvider";
import {useAuthContext} from "../context/AuthProvider";
import { Box, Avatar } from '@chakra-ui/react';


export default function Message({message})
{
  const {currentUser} = useAuthContext();
  const {data} = useChatContext();

  console.log(message);
  return(<>
            {
              message.senderId === currentUser.uid ?
                (<Box bg="#469B38" borderRadius='lg' py={3} my={12} mx={5} className="relative" style={{fontFamily: "'Karla', sans-serif"}}>
                  <span className="font-bold text-2xl text-white">{message.text} </span>
                  <span className="absolute inset-y-0 right-0">
                    <Avatar src={currentUser.photoURL}  size='sm' name={currentUser.displayName} mr={2} />
                  </span>
                </Box>) :
                (<Box bg="white" borderRadius='full' py={3} my={12} mx={5} className="relative" style={{fontFamily: "'Karla', sans-serif"}}>
                  <span className="font-bold text-2xl text-[#103427]">{message.text} </span>
                    <span className="absolute inset-y-0 right-0">
                      <Avatar src={data.user.photoURL}  size='sm' name={data.user.displayName} mr={4} />
                    </span>
                </Box>)

          }

        </>);
}
