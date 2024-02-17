import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyAluPQEGMxGNfrkW92bg8zGu1bjeGdJ7Us";

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

    // Additional helper functions to manage chat initialization and cleanup (optional)
    // ...

    return (
        <div>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
            <button onClick={runChat}>Send Message</button>
            <p>{response}</p>
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
        // ... other safety settings
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        // Include any initial chat history if needed
    });

    return chat;
};

export default GeminiChat;