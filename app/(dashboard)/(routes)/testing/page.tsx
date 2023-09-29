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
          🚀 Unleash the Power of Language Models with <span style={{ fontStyle: 'italic' }}>Superprompts!</span> 🚀
        </h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <strong style={{ fontSize: '24px', color: '#ff4500' }}>Why Superprompts?</strong> <span style={{ color: '#228B22', fontSize: '20px' }}>Superprompts</span> isn't just another tool; it's a <strong style={{ fontSize: '24px' }}>revolution!</strong> In the world of language model interactions, mastering prompt engineering is paramount. Superprompts empowers you with the skills to unlock the full potential of large language models.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          🌐 <strong style={{ fontSize: '24px', color: '#228B22' }}>Global Reach with Local Feel:</strong> Imagine having the ability to engage in conversations that are not just accurate but deeply connected to local linguistic nuances. Superprompts bridges the gap between language models and human expression, ensuring a global reach with a local feel.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          💡 <strong style={{ fontSize: '24px', color: '#ff4500' }}>Infinite Possibilities:</strong> Prompt engineering is akin to wielding a magic wand. Whether you're crafting content, generating ideas, or developing applications, Superprompts opens the door to limitless possibilities. Dive into the art of creating prompts that spark creativity and watch as uncharted potentials unfold.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          ⚡️ <strong style={{ fontSize: '24px', color: '#ff4500' }}>Speed and Efficiency:</strong> Prompt engineering isn't just about creativity; it's about optimization. Superprompts is your partner in achieving unmatched speed and efficiency. Each request is meticulously fine-tuned to ensure you receive the fastest and most accurate responses every time.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          🌟 <strong style={{ fontSize: '24px', color: '#ff4500' }}>Chain of Thought Prompting:</strong> Take your prompt engineering skills to the next level with techniques like chain of thought prompting. This powerful method allows you to guide the language model's responses step by step, resulting in more coherent and context-aware output. It's like having a conversation with the model, steering it towards your desired outcome.
        </p>
        <p style={{ fontSize: '20px', lineHeight: '1.6', textAlign: 'center', marginTop: '40px' }}>
          Ready to embark on a transformative journey where technology meets creativity? With Superprompts, you'll witness how prompt engineering can amplify the capabilities of large language models. 
          <button 
            onClick={handleSubscribeClick} 
            disabled={loading} 
            style={{ color: '#ff4500', textDecoration: 'underline', fontWeight: 'bold', fontSize: '24px', cursor: 'pointer', background: 'none', border: 'none' }}>Subscribe Now!</button> 
          and take the first step into the future of language model interaction with <span style={{ color: '#228B22', fontSize: '24px' }}>Superprompts!</span>
        </p>
      </div>
    );
  }
  
  const prompts: Prompt[] = [
    {
      title: "Prompt Campaña Publicitaria para Facebook",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      "Estoy emocionado/a de colaborar contigo en la creación de una lista de temas de seminarios web convincentes que capturarán la atención de nuestros clientes ideales y generarán interés en nuestra [oferta]. Como un experto [persona de ayuda - estratega de seminarios web, consultor de marketing, creador de contenido], estoy confiando en tu experiencia para elaborar una lista excepcional.
      
      Para asegurarnos de estar alineados, establezcamos un contexto. Nuestros clientes ideales son [describe al cliente ideal - profesionales de la industria, emprendedores, entusiastas de la tecnología, profesionales de la salud, etc.] que están buscando activamente [beneficios o soluciones - conocimientos de vanguardia, estrategias innovadoras, consejos prácticos, orientación de expertos, etc.]. Nuestra [oferta] aborda sus necesidades al proporcionar [detalles de la oferta - capacitación profunda, recursos exclusivos, consejos prácticos, etc.].
      
      Por favor, genera ideas y sugiere 10 temas de seminarios web que conecten con nuestros clientes ideales y resalten el valor de nuestra [oferta]. Mantén en mente estas pautas mientras creas la lista:
      
          Prioriza la relevancia: Asegúrate de que los temas estén directamente relacionados con los intereses y puntos problemáticos de nuestros clientes ideales.
          Equilibra la variedad: Ofrece una mezcla de temas introductorios, intermedios y avanzados para atender a diferentes niveles de conocimiento.
          Resalta los beneficios: Crea títulos de temas que comuniquen los beneficios específicos que los asistentes obtendrán de cada seminario web.
          Abraza las tendencias: Incorpora tendencias emergentes, conocimientos de la industria y enfoques innovadores para captar la atención.
          Orientados a la solución: Formula los temas como soluciones a desafíos que nuestros clientes ideales enfrentan comúnmente.
          Practicidad: Apunta a puntos prácticos que los asistentes puedan implementar inmediatamente después del seminario web.
          Diversidad: Cubre una variedad de enfoques dentro de nuestra área de especialización para atraer a una audiencia más amplia.
          Títulos atractivos: Utiliza títulos intrigantes y convincentes que despierten curiosidad y emoción.
          Incluye estudios de caso: Propón temas que aprovechen ejemplos y estudios de caso de la vida real para una comprensión práctica.
          Elementos interactivos: Considera temas que puedan incorporar sesiones de preguntas y respuestas, encuestas o demostraciones en vivo.
      
      Aquí tienes tres ejemplos de temas de seminarios web bien estructurados para inspirar tu creatividad:
      
          "Desbloqueando Secretos del Marketing Digital: Estrategias que Impulsan el Retorno de Inversión para [Cliente Ideal]"
          "Innovaciones en SaludTech 2023: Revolucionando la Atención al Paciente con [Oferta]"
          "Dominando la Colaboración de Equipos Remotos: Técnicas Comprobadas para Profesionales [Cliente Ideal]"
      
      Por favor, desarrolla las siete ideas restantes de temas de seminarios web en base a las pautas proporcionadas anteriormente. Una vez que hayas completado la lista, preséntala en un formato claro y organizado, y siéntete libre de agregar cualquier idea o explicación adicional que nos ayude a comprender la razón detrás de cada tema.
      
      Recuerda que nuestro objetivo es crear una serie de seminarios web que conecten con nuestros clientes ideales, muestren el valor de nuestra [oferta] y nos posicionen como una autoridad confiable en nuestra área de especialización.
      
      ¡Esperamos con ansias tus sugerencias innovadoras!"`,
    },
    {
      title: "Prompt 2",
      content: `Por favor, desarrolla las siete ideas restantes de temas de seminarios web en base a las pautas proporcionadas anteriormente. Una vez que hayas completado la lista, preséntala en un formato claro y organizado, y siéntete libre de agregar cualquier idea o explicación adicional que nos ayude a comprender la razón detrás de cada tema.
      
      Recuerda que nuestro objetivo es crear una serie de seminarios web que conecten con nuestros clientes ideales, muestren el valor de nuestra [oferta] y nos posicionen como una autoridad confiable en nuestra área de especialización.
      
      ¡Esperamos con ansias tus sugerencias innovadoras!"`,
    },
  ]; // Replace with your array of prompts

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
    const boldPattern = /\\(.?)\\*/g;
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
          return userValue ? `*${userValue}*` : match;
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