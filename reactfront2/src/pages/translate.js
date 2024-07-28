import * as React from 'react';
import { useState } from 'react';
import { Button, HStack, Menu, MenuButton, MenuList, MenuItem, Center, Text, Box, Spinner, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import UploadFile from '@mui/icons-material/UploadFile';
import { useOutletContext } from 'react-router-dom';
import { sendFile } from '../api/apicommunicator';
// import AudioPlayer from "../components/audioPlayer";

export default function Translate() {
  // State to store the selected item
  const [selectedOption, setSelectedOption] = useState('Select a Language');
  const { bgColour, textColour } = useOutletContext();
  const [mp3File, setMp3File] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handler to update the selected option
  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const handleFileChange = (event) => {
    setMp3File(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    // use loading icon (idk if it works in async method)
    setLoading(true);

    event.preventDefault();
    if (!mp3File) {
      console.log('No file selected');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', mp3File);

    try {
      const response = await sendFile(formData);
      const url = window.URL.createObjectURL(new Blob([response]));
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'output.mp3';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('There was an error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Wrap ChakraProvider at the root of your app
  return (
    <Box className="bg-white- p-4" bg={bgColour} color={textColour} borderRadius="2xl">
      {/* Text and GIF */}
      <Center>
        <Text fontSize="2xl" my={8}>Upload a MP3 file to get started!</Text>
      </Center>
      <Center>
        <Box>
          <Box my={0}>
            <iframe title="2" className="w-full h-full" src="https://lottie.host/embed/90367e73-30ee-420e-b70f-6ce74d6e5e73/CIx5Cr4gfF.json" width="500" height="250"></iframe>
          </Box>
        </Box>
      </Center>

      {/* Upload MP3 + Choose language button */}
      <Center>
        <HStack spacing={2} pb={250} px={300} py={35}>
          {/* form starts */}
          <form onSubmit={handleSubmit}>
            <FormControl id="mp3-upload">
              <FormLabel>Upload MP3 File</FormLabel>
              <Input type="file" accept=".mp3" onChange={handleFileChange} />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="400px" height="60px">
              {loading ? (
                <Spinner speed='1s' />
              ) : (
                <UploadFile />
              )}
            </Button>
          </form>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mt={8} height="100" color="#2a2a35">
              <Text fontSize="l"> {selectedOption} </Text>
            </MenuButton>
            <MenuList>
              <MenuItem color="#2a2a35" onClick={() => handleSelection('French')}>French</MenuItem>
              <MenuItem color="#2a2a35" onClick={() => handleSelection('Spanish')}>Spanish</MenuItem>
              <MenuItem color="#2a2a35" onClick={() => handleSelection('Italian')}>Italian</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        {/* <AudioPlayer src={mp3File}/> */}
      </Center>
    </Box>
  );
}
