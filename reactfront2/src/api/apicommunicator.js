// import React from 'react'
import axios from 'axios';

export const sendFile = async (formData) => {

    try {
        const response = await axios.post('http://localhost:5000/api/generate-tts', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Important for handling binary data
        });
        return response.data
      } catch (error) {
        return error
      }

}

