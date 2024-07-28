import * as React from 'react'
import { Outlet, Link } from 'react-router-dom';
import { Box, Button, Image, HStack, Center } from '@chakra-ui/react';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Layout({bgColour, textColour, toggleDarkTheme}) {

  return (
    <Box p={4} mx = {140} my={5} display="flex" flexDirection="column" alignItems="left" bg={bgColour} color={textColour} borderRadius="2xl">
      <HStack spacing = {4} align = "left">
        <Center axis="vertical">
      <Image src="/assets/LinguistifyFull.png"
              alt="Linguistify" 
              width="200px" 
              objectFit="cover" />
        <Button as={Link} to="/" colorScheme="blue" m={2} bg={bgColour} color={textColour}>Home</Button>
        <Button as={Link} to="/translate" colorScheme="blue" m={2} bg={bgColour} color={textColour}>Translate</Button>
        <Button as={Link} to="/aboutus" colorScheme="blue" m={2} bg={bgColour} color={textColour}>About Us</Button>
        <Box m={2}>
          <Button width={16} height={10} onClick={toggleDarkTheme} colorScheme="blue">
            <LightModeIcon/>
          </Button>
        </Box>
        </Center>
      </HStack>
      <Outlet context={{ bgColour, textColour }} /> {/* Pass context to nested routes */}     
    </Box>
  );
}
