"use client";
import React, { useState, useEffect }  from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



const RegularPrompt =
  "Sugiere 10 temas para un seminario web para atraer a [cliente ideal] a [oferta].";

const SuperPromptText = `
Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

Hola SuperMarketingChatGPT,

"Estoy emocionado de colaborar contigo en la creación de una lista de temas de seminarios web convincentes que capturarán la atención de nuestros clientes ideales y generarán interés en nuestra [oferta]. Como un experto [persona de ayuda - estratega de seminarios web, consultor de marketing, creador de contenido], estoy confiando en tu experiencia para elaborar una lista excepcional.

... (rest of the super prompt) ...
`;

export const LandingContent = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedPrompt === 'super') {
      const textArray = SuperPromptText.split('');
      const typingTimer = setInterval(() => {
        if (currentIndex < textArray.length) {
          setTypedText((prevText) => prevText + textArray[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(typingTimer);
        }
      }, 30);

      return () => {
        clearInterval(typingTimer);
      };
    }
  }, [selectedPrompt, currentIndex]);

  const handlePromptClick = (type) => {
    setSelectedPrompt(type);
    setTypedText('');
    setCurrentIndex(0);
  };

  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Webinar Topics
      </h2>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="w-1/2 p-4 border border-gray-400">
              <div
                className={`bg-[#192339] text-white p-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105`}
                onClick={() => handlePromptClick("regular")}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Regular Prompt
                </h3>
                <p className="text-lg">{RegularPrompt}</p>
              </div>
            </td>
            <td className="w-1/2 p-4 border border-gray-400">
              <div
                className={`cursor-pointer ${
                  selectedPrompt === "super"
                    ? "bg-[#192339] text-white"
                    : "bg-[#0E1A2A] text-gray-400 hover:bg-[#192339] hover:text-white"
                } p-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105`}
                onClick={() => handlePromptClick("super")}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Super Prompt
                </h3>
                <p className="text-lg">
                  {selectedPrompt === "super" ? typedText : "Haga clic aquí para ver el Super Prompt."}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};