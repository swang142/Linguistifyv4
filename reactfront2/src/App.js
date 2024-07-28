import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import Translate from './pages/translate';
import AboutUs from './pages/aboutus';
import { Box } from "@chakra-ui/react";

export default function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  // function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const bgColour = toggleDarkMode ? '#212121' : '#FFFFFF';
  const textColour = toggleDarkMode ? '#F1F1F1' : '#2a2a35';

  return (
    <Box bg={bgColour} color={textColour} minWidth="100vw - 10" minHeight="100vh" mt={-5}>
    <Routes>
      <Route path="/" element={<Layout bgColour={bgColour} textColour={textColour} toggleDarkTheme={toggleDarkTheme} />}>
        <Route index element={<Home bgColour={bgColour} textColour={textColour} />} />
        <Route path="translate" element={<Translate bgColour={bgColour} textColour={textColour} />} />
        <Route path="aboutus" element={<AboutUs bgColour={bgColour} textColour={textColour} />} />
      </Route>
    </Routes>
    </Box>
  );
}
