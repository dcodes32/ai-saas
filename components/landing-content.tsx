"use client";
import React, { useState, useEffect }  from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PromptType = 'regular' | 'super';

interface Prompt {
  type: PromptType;
  text: string;
}

const regularPrompts: string[] = [
  "Prompt 1 for regular",
  "Prompt 2 for regular",
  // ... add more regular prompts as needed
];

const superPrompts: string[] = [
  "Super prompt 1 with a lot of text...",
  "Super prompt 2 with a lot of text...",
  // ... add more super prompts as needed
];

export const LandingContent = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [typedText, setTypedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (selectedPrompt && selectedPrompt.type === 'super') {
      const textArray = selectedPrompt.text.split('');
      const typingTimer = setInterval(() => {
        if (currentIndex < textArray.length) {
          setTypedText((prevText) => prevText + textArray[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(typingTimer);
        }
      }, 30);

      return () => clearInterval(typingTimer);
    }
  }, [selectedPrompt, currentIndex]);

  const handlePromptClick = (type: PromptType, text: string) => {
    setSelectedPrompt({ type, text });
    setTypedText('');
    setCurrentIndex(0);
  };

  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Webinar Topics
      </h2>
      <table className="w-full mb-10">
        <tbody>
          {regularPrompts.map((prompt, index) => (
            <tr key={index}>
              <td className="w-1/2 p-4 border border-gray-400">
                <div
                  className="bg-[#192339] text-white p-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handlePromptClick("regular", prompt)}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Regular Prompt
                  </h3>
                  <p className="text-lg">{prompt}</p>
                </div>
              </td>
              <td className="w-1/2 p-4 border border-gray-400">
                <div
                  className={`cursor-pointer ${
                    selectedPrompt && selectedPrompt.type === "super" && selectedPrompt.text === superPrompts[index]
                      ? "bg-[#192339] text-white"
                      : "bg-[#0E1A2A] text-gray-400 hover:bg-[#192339] hover:text-white"
                  } p-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105`}
                  onClick={() => handlePromptClick("super", superPrompts[index])}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Super Prompt
                  </h3>
                  <p className="text-lg">
                    {selectedPrompt && selectedPrompt.type === "super" && selectedPrompt.text === superPrompts[index] 
                      ? typedText 
                      : "Click to view Super Prompt"}
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="youtube-section mt-10">
        <iframe
          width="100%"
          height="500" // Adjust height as needed
          src="https://www.youtube.com/embed/1o0iW_lVYjY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-section mt-10">
        <h3 className="text-xl font-bold text-white">Your Section Title</h3>
        <p className="text-lg text-white">
          This is where you can add your text content. Feel free to replace this with whatever text you need.
        </p>
      </div>
    </div>
  );
};