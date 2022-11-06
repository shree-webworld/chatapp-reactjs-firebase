import {useAuthContext} from "../context/AuthProvider";
import {useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Avatar } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalOverlay} from '@chakra-ui/react';
import {Box, Center, VStack, Text, Heading, Image} from '@chakra-ui/react';


export default function ChatNavbar()
{
  const navigate = useNavigate();
  let {currentUser, logOut} = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(`Chat - ${user}`);

   /*const logOut = async () =>{
                                  await signOut(auth);
                                  navigate("/signin");
                              }*/


  return(<>

    <div className="navbar bg-[#138D7E] px-20">
      <div className="flex-1 text-3xl font-semibold text-white">
        <i className="bi bi-whatsapp bg-[#48C958] text-white p-2 mask mask-circle"></i>&nbsp; WhatsChat
      </div>
      <div className="flex-none" style={{fontFamily: "'Montserrat', sans-serif"}}>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar" >
            {/*<div className="w-20 rounded-full">*/}
              {/*<img src="https://placeimg.com/80/80/people" />*/}
              <Avatar name={currentUser.displayName} src={currentUser.photoURL} size="md"/>
            {/*</div>*/}
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#48C958] mask rounded-box w-52">
            <li>
              <Link className="text-xl text-white" onClick={onOpen}>
                <i className="bi bi-person"></i>Profile
              </Link>
            </li>
            <li>
              <Link className="text-xl text-white" onClick={ () => logOut() }>
                <i className="ri-logout-circle-line"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>


    <Modal isOpen={isOpen} onClose={onClose} isCentered >
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'/>
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box bg="green.600" p="6" color="white" borderRadius='md' style={{fontFamily: "'Karla', sans-serif"}}>
          <Center>
            <VStack>
                {/*<Image borderRadius="full" boxSize='250px' objectFit='cover' src="https://placeimg.com/80/80/people" />*/}
                <Avatar size="2xl" name={currentUser.displayName} />
                <Heading as='h3' size='lg' className="capitalize">{currentUser.displayName}</Heading>
                <Text fontSize='lg'>{currentUser.email}</Text>
            </VStack>
          </Center>
        </Box>
        </ModalBody>
      </ModalContent>
    </Modal>

  </>)
}
