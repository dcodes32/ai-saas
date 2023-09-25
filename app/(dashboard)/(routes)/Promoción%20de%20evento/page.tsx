"use client";


import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";


import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

import React from "react";
interface Prompt {
  title: string;
  content: string;
}

const CodePage: React.FC = () => {
  const [expandedPromptIndex, setExpandedPromptIndex] = useState<number | null>(null);
  const [userInputs, setUserInputs] = useState<{ [key: string]: string }[]>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [showInputs, setShowInputs] = useState<boolean>(false);

  const prompts: Prompt[] = [
    {
      title: "Prompt Campaña Publicitaria para Facebook",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de colaborar contigo en crear una dinámica campaña publicitaria en Facebook para el próximo [venta/evento] revolucionario. Nuestro objetivo es diseñar una campaña que no solo informe, sino que también genere emoción y urgencia, haciendo que la audiencia se sienta privilegiada por ser parte de este evento innovador. Como un experto [persona de ayuda - generador de anticipación, comunicador de urgencia, conector de audiencia], tus conocimientos serán cruciales en crear una campaña publicitaria que despierte anticipación y fomente la participación.

      Para proporcionar contexto, el [venta/evento] es una ocasión revolucionaria que ofrece ofertas y beneficios innovadores. Queremos crear una campaña publicitaria que construya anticipación y urgencia, transmitiendo el valor de las ofertas mientras hace que la audiencia se sienta privilegiada por acceder a ellas. El objetivo es diseñar una campaña que no solo informe, sino que también desencadene una sensación de emoción y exclusividad.
      
      Por favor, crea una campaña publicitaria dinámica en Facebook para el próximo [venta/evento] revolucionario. Mantén en mente estas pautas:
      
          Lenguaje impactante: Utiliza un lenguaje que genere anticipación, emoción y una sensación de privilegio.
          Generación de anticipación: Da pistas sobre las ofertas y beneficios innovadores que estarán disponibles.
          Creación de urgencia: Emplea elementos que induzcan urgencia, como ofertas por tiempo limitado o tratos exclusivos.
          Destacar la exclusividad: Enfatiza cómo la audiencia será parte de algo exclusivo y revolucionario.
          Llamado a la acción claro: Incluye un llamado a la acción convincente que fomente la participación y la inscripción.
      
      Aquí tienes una estructura de muestra para la campaña publicitaria:
      
      Campaña Publicitaria:
      [Comienza con un titular cautivador que transmita la naturaleza revolucionaria del evento.]
      "Desvelando una Nueva Era de Ahorros: ¡El [Venta/Evento] que Estabas Esperando!"
      
      [Anuncio 1:]
      [Genera anticipación dando pistas sobre las ofertas innovadoras.]
      "¡Prepárate para vivir una revolución en [producto]! El [venta/evento] te trae ofertas vanguardistas que redefinen el ahorro."
      
      [Anuncio 2:]
      [Crea urgencia destacando ofertas por tiempo limitado y tratos exclusivos.]
      "¡Actúa ahora! Ofertas por tiempo limitado y tratos exclusivos te esperan en el [venta/evento]. No te pierdas esta oportunidad revolucionaria."
      
      [Anuncio 3:]
      [Transmite una sensación de privilegio enfatizando la exclusividad del evento.]
      "Únete a los pocos privilegiados que accederán a ofertas sin precedentes en el [venta/evento]. Eleva tus ahorros y vive el futuro de los descuentos."
      
      [Cierre:]
      [Concluye con un llamado a la acción sólido que invite a la audiencia a explorar el evento.]
      "¡Sé parte de la revolución! Descubre ofertas revolucionarias en el [venta/evento] y redefine tu camino hacia el ahorro."
      
      Por favor, crea la campaña publicitaria siguiendo las pautas proporcionadas. La campaña debe generar eficazmente anticipación, urgencia y una sensación de privilegio, fomentando que la audiencia participe y explore las ofertas innovadoras.
      
      Nuestro objetivo es diseñar una campaña que no solo informe, sino que también emocione y capacite a la audiencia para ser parte de un evento revolucionario que promete ofertas sin precedentes.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Prompt 2",
      content: ``
    },
    // Add more prompts here
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

