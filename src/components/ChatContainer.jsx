
import { Box, Tag, Avatar, Heading, VStack } from '@chakra-ui/react';
import {useState, useContext, useEffect} from "react";
import { useChatContext } from "../context/ChatProvider";
import Messages from "./Messages";
import InputMessage from "./InputMessage";
import ScrollToBottom from 'react-scroll-to-bottom';


export default function ChatContainer()
{
  const {data} = useChatContext(); //sent data in ChatProvider.

  return(<>

            <Box mb={2} bg='green.100' w="800px" h="550px" color='white' borderRadius='lg'>
              <VStack>
              <Box bg="green.600" w="800px" h="80px" borderRadius='lg' className="relative" style={{fontFamily: "'Montserrat', sans-serif"}}>
                <Tag colorScheme='green.600' my={2} className="absolute left-0 top-0">
                  <Avatar src={data.user?.photoURL} size='lg' name={data.user?.displayName} mr={2}/>
                  <Heading as='h3' size='md' className="capitalize">{data.user?.displayName}</Heading>
                </Tag>
              </Box>

                  <ScrollToBottom className="h-[26rem] w-[49.9rem]">
                    <Messages/>
                  </ScrollToBottom>

                <InputMessage/>
              </VStack>
            </Box>

        </>);
}
