import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import './GeminiChat.css'

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "";

const GeminiChat = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const runChat = async () => {
        const chat = await getChatInstance();
        try {
            const result = await chat.sendMessage(userInput);
            setResponse(result.response.text());
        } catch (error) {
            console.error('Error:', error);
            setResponse('An error occurred. Please try again later.');
        }
    };
    // Format the userInput text box to be bigger 
    // Format the response better, it looks ugly 
    return (
        <div>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="bigger-input" />
            <button onClick={runChat}>Send Message</button>
            <p>{formatResponse(response)}</p>
        </div>
    );
};

const getChatInstance = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        // Include any initial chat history if needed
    });

    return chat;
};

function formatResponse(recipe) {
    // Split the recipe text into lines
  const lines = recipe.split('\n');

  // Define variables to track state
  let isBold = false;
  let isList = false;
  let currentListType = null; // 'bullet' or 'numbered'

  // Create an array to store formatted elements
  const formattedElements = [];

  for (const line of lines) {
    console.log(line + "\n");
    // Reset isList at the beginning of each line
    isList = false;

    // Check for bold text
    if (line.startsWith('**')) {
      isBold = true;
      // Remove the opening **
      //formattedElements.push(<h2 key={line}>{line.slice(2, -2)}</h2>);
      formattedElements.push(<h2 key={line}>{line.slice(2)}</h2>);
    } else if (line.endsWith('**')) {
      isBold = false;
      // Remove the closing **
      formattedElements.push(<p key={line}>{line.slice(0, -2)}</p>);
    } else if (isBold) {
      // Continue bold text
      formattedElements.push(<p key={line}>{line}</p>);
    } else {
      // Check for list items
      if (line.startsWith('*')) {
        isList = true;
        // Check for numbered list
        if (/\d+\./.test(line)) {
          currentListType = 'numbered';
          formattedElements.push(<li key={line}>{line.slice(3)}</li>);
        } else {
          currentListType = 'bullet';
          formattedElements.push(<li key={line}>{line.slice(2)}</li>);
        }
      } else if (isList) {
        // Continue list item
        if (currentListType === 'numbered') {
          formattedElements.push(<li key={line}>{line}</li>);
        } else {
          formattedElements.push(<li key={line}>{line.slice(1)}</li>);
        }
      } else {
        // Regular text paragraph
        formattedElements.push(<p key={line}>{line}</p>);
      }
    }
  }

  return formattedElements;
  }

export default GeminiChat;