"use client";


import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";

import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

import { checkSubscription } from "@/lib/subscription";

import React, { useState, useRef, useEffect } from 'react';

interface Prompt {
  title: string;
  content: string;
}

const CodePage: React.FC = () => {
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);
  const [loading, setLoading] = useState(false); 
  const [expandedPromptIndex, setExpandedPromptIndex] = useState<number | null>(null);
  const [userInputs, setUserInputs] = useState<{ [key: string]: string }[]>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [showInputs, setShowInputs] = useState<boolean>(false);

  useEffect(() => {
    async function checkUserSubscription() {
      try {
        const response = await fetch('/api/check-subscription');
        const data = await response.json();
        setHasSubscription(data.isSubscribed);
      } catch (error) {
        console.error(error);
        // Handle error as appropriate
      }
    }

    checkUserSubscription();
  }, []);

  const handleSubscribeClick = async () => { // New function for handling subscribe click
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!hasSubscription) {
    return (
      <div style={{ color: '#333', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#ff4500', textAlign: 'center', fontSize: '36px', marginBottom: '20px' }}>
          🚀 Elevate Your ChatGPT Experience with <span style={{ fontStyle: 'italic' }}>Superprompts!</span> 🚀
        </h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <strong style={{ fontSize: '24px', color: '#ff4500' }}>Unlock Boundless Potential:</strong> Superprompts stand not merely as prompts but as finely-forged keys, meticulously crafted to unlock the boundless potentials hidden within the algorithms of ChatGPT. It's a transformative experience, akin to transitioning from a flickering candlelight to the unbridled brilliance of a raging bonfire in the digital realm of language and interaction.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          🌐 <strong style={{ fontSize: '24px', color: '#228B22' }}>A Symphony of Interaction:</strong> Superprompts seamlessly turn mere interactions into vibrant conversations, imbuing the AI with a deepened comprehension of your unique needs and intricate intents. With Superprompts, each engagement evolves into a symphony of intellectual exchange and precision, reminiscent of a dance between understanding and response.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          💡 <strong style={{ fontSize: '24px', color: '#ff4500' }}>Precision Crafted Engagements:</strong> Like a seasoned cartographer crafting a map, Superprompts are designed with insightful precision, loaded with context, guiding ChatGPT through the labyrinth of human inquiry with finesse. It is through these meticulously designed prompts that ChatGPT can unfurl its capabilities, offering not just responses but solutions, insights, and a depth of engagement hitherto unexplored.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          ⚡️ <strong style={{ fontSize: '24px', color: '#ff4500' }}>Empower Your Creative Genius:</strong> With Superprompts, you command ChatGPT to perform a myriad of tasks with unparalleled accuracy and creativity, from drafting code and composing symphonies to brainstorming avant-garde marketing strategies and simulating fictional dialogues that resonate with vibrancy and imagination.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          🌟 <strong style={{ fontSize: '24px', color: '#ff4500' }}>Master the Art:</strong> Superprompts epitomize the pinnacle of prompt engineering. They represent a harmonious marriage of precision and creativity, serving as the conduit through which the symphonic potential of ChatGPT is not just realized but maximized, leading to content generation that is nothing short of extraordinary.
        </p>
        <p style={{ fontSize: '20px', lineHeight: '1.6', textAlign: 'center', marginTop: '40px' }}>
          Ready to transition from the mundane to the extraordinary? To not just interact but engage with the depth and breadth of ChatGPT’s capabilities? 
          <button 
            onClick={handleSubscribeClick} 
            disabled={loading} 
            style={{ color: '#ff4500', textDecoration: 'underline', fontWeight: 'bold', fontSize: '24px', cursor: 'pointer', background: 'none', border: 'none' }}>Embark on the Journey with Superprompts!</button> 
          and witness the dawn of a new era in AI-driven language model interaction.
        </p>
      </div>
    );
  }
  const prompts: Prompt[] = [
    {
      title: "Shortened Prompt Title", // Shortened for convenience
      content: "Shortened prompt content...", // Shortened for convenience
    },
    // Add more prompts as needed
  ];

  const extractUniqueVariables = (promptIndex: number): string[] => {
    const uniqueVariables: string[] = [];
    const promptContent = prompts[promptIndex].content;

    const matches = promptContent.match(/\[([^\]]+)\]/g);

    if (matches) {
      matches.forEach((match) => {
        const variable = match.slice(1, -1);
        if (!uniqueVariables.includes(variable)) {
          uniqueVariables.push(variable);
        }
      });
    }

    return uniqueVariables;
  };

  const handleTitleClick = (index: number) => {
    if (expandedPromptIndex === index) {
      setExpandedPromptIndex(null);
      setShowInputs(false);
    } else {
      setExpandedPromptIndex(index);
      setUserInputs([]);
      setGeneratedPrompt(null);
      setCopySuccess(false);
      setShowInputs(true);
    }
  };

  const handleInputChange = (promptIndex: number, placeholder: string, value: string) => {
    if (value.length <= 100) {
      const updatedUserInputs = [...userInputs];
      if (updatedUserInputs[promptIndex]) {
        updatedUserInputs[promptIndex][placeholder] = value;
      } else {
        updatedUserInputs[promptIndex] = {
          [placeholder]: value,
        };
      }
      setUserInputs(updatedUserInputs);
    } else {
      // Optionally, you can show an error message here if the input exceeds 100 characters.
    }
  };

  const makeTextBold = (text: string) => {
    const boldPattern = /\*\*(.*?)\*\*/g;
    const newText = text.replace(boldPattern, '<b>$1</b>');
    return newText;
  };

  const handleReplacePlaceholders = () => {
    if (expandedPromptIndex !== null) {
      const selectedPrompt = prompts[expandedPromptIndex];
      let allPlaceholdersFilled = true;

      const updatedPrompt = selectedPrompt.content.replace(
        /\[([^\]]+)\]/g,
        (match, placeholder) => {
          const userValue = userInputs[expandedPromptIndex]?.[placeholder];
          if (!userValue) {
            allPlaceholdersFilled = false;
          }
          return userValue ? `**${userValue}**` : match;
        }
      );

      const boldUpdatedPrompt = makeTextBold(updatedPrompt);

      if (allPlaceholdersFilled) {
        setGeneratedPrompt(boldUpdatedPrompt);
      } else {
        alert('Por favor, completa todos los campos de entrada antes de enviar.');
      }
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert("Texto copiado");
        })
        .catch((error) => {
          alert("Error copiando texto");
          console.error(error);
        });
    } else {
      alert("Clipboard API not available in this environment");
    }
  };

  const handleReset = () => {
    if (expandedPromptIndex !== null) {
      const updatedUserInputs = [...userInputs];
      updatedUserInputs[expandedPromptIndex] = {};
      setUserInputs(updatedUserInputs);
      setGeneratedPrompt(null);
      setCopySuccess(false);
    }
  };

  const uniqueVariables = expandedPromptIndex !== null ? extractUniqueVariables(expandedPromptIndex) : [];

  return (
    <div className="px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-black mb-2">SuperPrompts</h1>
      <p className="text-sm text-gray-600 mb-4">Elige un Prompt</p>
      {prompts.map((prompt, index) => (
        <div key={index} className="p-4 w-full bg-white border border-black/10 rounded-lg mb-4">
          <h2
            className="text-xl font-bold cursor-pointer"
            onClick={() => handleTitleClick(index)}
          >
            {prompt.title}
          </h2>
          {expandedPromptIndex === index && (
            <div className="mt-4 flex flex-col">
              <div className="text-gray-700 mb-4 prompt-content" style={{ fontSize: '1rem' }}>
                {prompt.content}
              </div>
              {showInputs &&
                uniqueVariables.map((variable, i) => (
                  <div key={i} className="mb-4">
                    <div>{`Escribe ${variable}:`}</div>
                    <input
                      value={userInputs[expandedPromptIndex]?.[variable] || ''}
                      onChange={(e) => handleInputChange(expandedPromptIndex, variable, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-400 transition duration-300"
                    />
                  </div>
                ))}
              <div className="flex mt-4">
                <button
                  className="w-1/3 px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  onClick={handleReplacePlaceholders}
                  disabled={copySuccess}
                >
                  Enviar
                </button>
                <button
                  className="w-1/3 ml-2 px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  onClick={() => copyToClipboard(generatedPrompt || '')}
                >
                  {copySuccess ? <span className="text-blue-500">Texto copiado</span> : 'Copiar Texto'}
                </button>
                <button
                  className="w-1/3 ml-2 px-2 py-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                  onClick={handleReset}
                >
                  Resetear
                </button>
              </div>
              {copySuccess && (
                <span className="text-green-500 ml-2">Text copied to clipboard</span>
              )}
              {generatedPrompt && (
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: generatedPrompt }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CodePage;