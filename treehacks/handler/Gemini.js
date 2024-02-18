import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyA6sN0PxKyoAfo58e4Kgt6WYMZL6f7CDQc";


const Gemini = ({image}) => {

 const [response, setResponse] = useState('');
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Describe this image.";    
  

  const handleImageUpdate = async (base64Data) => {
    image.inlineData.data = base64Data;
    result = await model.generateContent([prompt, image]);
    setResponse(result.response.text());
  };

  useEffect(() => {
     handleImageUpdate();
     // then call 
  })

   return (
      <>
      </>

   )

      
  }


  export default Gemini;


