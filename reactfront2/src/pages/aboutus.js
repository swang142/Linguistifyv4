import * as React from 'react';
// import { Button } from '@chakra-ui/react';
import {
  Flex,
  Center,
  Text
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
// import Lottie from 'react-lottie';
import { useOutletContext } from 'react-router-dom';


export default function AboutUs() {
  const { bgColour, textColour } = useOutletContext();

  // 2. Wrap ChakraProvider at the root of your app
  return (
      <Center p={2} bg={bgColour} color={textColour} borderRadius="2xl">
      
      <Flex
        direction={['column', 'column', 'row']} // Stack columns on small screens
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth="1200px"
        mx="auto"
        p={4}

      >
        {/* Left column */}
        <Box flex="1" textAlign={['center', 'center', 'left']} p={4} mr={40}>
          <Text fontSize="5xl" my={4}>Our Mission</Text>
          <Box width={['100', '100', '550px']} mx="auto">
            <Text fontSize="lg" my={6}>
            Have you ever, even just once in your life, wanted to become like Mr. Beast? 
            Not only popular in North America with his over-the-top and expensive videos,
            Mr. Beast has also risen to fame in other parts of the world, largely thanks 
            to him creating multiple channels with dubbed versions of his videos. Mr. Beast 
            is able to accomplish this because he's rich enough to hire professional voice 
            actors who let people watch his videos in their native tongue, a feat unfeasible 
            for most other content creators. Linguistify will allow content creators to 
            easily dub their videos without needing to spend a fortune on hiring voice actors, 
            allowing their channels to grow much easier.
            </Text>
          </Box>
          {/*<Button as={Link} width="150px" height="60px" to="/translate" colorScheme="blue" >Get Started</Button>*/}
        </Box>
        {/* end of left column */}


        {/* Right column */}
        <Box flex="1" p={4} display="flex" justifyContent="center">
          <iframe
            title="3"
            className="w-full h-full"
            src="https://lottie.host/embed/26f3a790-b013-47ea-8c2a-00c6ab4add01/Xq6Z7odBYt.json"
            width="500"
            height="500"
            style={{ maxWidth: '600px', maxHeight: '600px' }}
          ></iframe>
        </Box>
        {/* end of right column */}
      </Flex>
      
    </Center>        
  )
}