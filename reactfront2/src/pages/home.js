import * as React from 'react';
import {
  Button,
  Flex,
  Center,
  Text,
} from '@chakra-ui/react';
// import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
// import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { useOutletContext } from 'react-router-dom';


export default function Home() {
  const { bgColour, textColour } = useOutletContext();

  // 2. Wrap ChakraProvider at the root of your app
  return (
    
    <Center p={4} bg={bgColour} color={textColour} borderRadius="2xl">
      <Box>
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
          <Text fontSize="5xl" my={4}>Introducing Linguistify,</Text>
          <Box width={['100', '100', '550px']} mx="auto">
            <Text className="font-jost" fontSize="lg" mt={10}>
            An AI-powered translation tool for converting video audio into multiple languages. This tool leverages Deepgram's speech-to-text AI to transcribe video content, uses DeepL for accurate text translation, and employs Elevenlabs' text-to-speech API to deliver the translated audio back to the user.
            </Text>
            <Text fontSize="lg" mt={5} mb={10}>
              Our team developed a custom algorithm that utilizes timestamps and speech duration to control the AI's speaking rate, ensuring perfect synchronization of the translated audio with the original video.
            </Text>
          </Box>
          <Flex>
            <Button as={Link} width="150px" height="60px" to="/translate" colorScheme="blue" >
              <Flex>
                <Center>
                  <Text pb = {0.5} pr={0.5}>Get Started</Text>
                  <NavigateNext/>
                </Center>
              </Flex>
            </Button>
          </Flex>
        </Box>
        {/* end of left column */}


        {/* Right column */}
        <Box flex="1" p={4} display="flex" justifyContent="center">
          <iframe
          title="1"
            className="w-full h-full"
            src="https://lottie.host/embed/a0761393-f689-4e1f-b036-ab457676d9cb/NDuBKtjSCf.json"
            width="500"
            height="500"
            style={{ maxWidth: '600px', maxHeight: '600px' }}
          ></iframe>
        </Box>
        {/* end of right column */}

        

      </Flex>
      </Box>
    </Center>
  );
}
