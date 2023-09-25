"use client";


import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
        title: "Creación de Copias de Anuncios",
        content: `Estoy emocionado/a de colaborar contigo en la creación de copias de anuncios que capturen la esencia de lujo para nuestro exquisito [producto]. Nuestro objetivo es crear copias que no solo hablen al gusto sofisticado de nuestra audiencia, sino que también exudan elegancia y opulencia. Como un experto [persona de ayuda - comunicador de lujo, creador de opulencia, evocador de elegancia], tus conocimientos serán fundamentales para crear copias de anuncios que resuenen con consumidores exigentes.
  
        Para proporcionar contexto, nuestro [producto] encarna el epítome de la opulencia y el refinamiento. Queremos transmitir este sentido de lujo a través de copias de anuncios que pinten un vívido cuadro de elegancia e indulgencia. El objetivo es crear copias de anuncios que no solo informen, sino que también transporten a los lectores a un mundo de experiencias lujosas.
        
        Por favor, crea copias de anuncios para nuestro lujoso [producto] dirigido a una audiencia sofisticada. Mantén en mente estas pautas:
        
            Elegancia y opulencia: Utiliza un lenguaje que exude sofisticación, lujo y vivir en la alta sociedad.
            Imaginería descriptiva: Pinta una imagen visual de las experiencias lujosas que ofrece el [producto].
            Valor exclusivo: Resalta cómo el [producto] satisface los deseos exclusivos de la audiencia sofisticada.
            Tono aspiracional: Crea copias que inspiren a la audiencia a visualizar el estilo de vida opulento.
            Llamada a la acción: Incluye una llamada a la acción sólida y accionable que invite a los usuarios a abrazar el lujo.
        
        Aquí tienes una estructura de ejemplo para las copias de los anuncios:
        
        Copia de Anuncio 1:
        [Comienza con un titular que encarne lujo y sofisticación.]
        "Desvela la Opulencia: Eleva tu Estilo de Vida con [Producto]."
        [Describe el beneficio opulento y su impacto en la vida de la audiencia.]
        "Disfruta del esplendor de [beneficio 1], envuelto en un aura de prestigio y lujo."
        
        Copia de Anuncio 2:
        [Empieza con un titular que evoca elegancia y atracción.]
        "Descubre la Extravagancia: Experimenta el Atractivo de [Producto]."
        [Describe el beneficio opulento y cómo transforma las experiencias de la audiencia.]
        "Mejora tus momentos con [beneficio 2], donde la sofisticación y el lujo se entrelazan."
        
        Copia de Anuncio 3:
        [Comienza con un titular que capta la exclusividad y el refinamiento.]
        "Acoje el Refinamiento: Eleva Cada Ocasión con [Producto]."
        [Describe el beneficio opulento y su papel en la creación de momentos lujosos.]
        "Crea una atmósfera de opulencia con [beneficio 3], haciendo que cada experiencia sea inolvidable."
        
        Por favor, crea las copias de los anuncios siguiendo las pautas proporcionadas. Las copias deben crear un sentido de lujo, atracción y opulencia, transportando a la audiencia a un mundo de experiencias refinadas.
        
        Nuestro objetivo es crear copias de anuncios que no solo informen, sino que también resuenen profundamente con los deseos de la audiencia sofisticada por la opulencia y la elegancia.
        
        ¡Esperamos con ansias tu aporte elocuente!`
      },
      {
        title: "Prompt 2",
        content: `Estoy emocionado/a de colaborar contigo en crear una declaración de cierre que capture la atención para nuestro lujoso anuncio, presentando la impactante llamada a la acción: '[CTA].' Nuestro objetivo es crear una declaración de cierre que no solo encapsule el tono opulento y exclusivo del anuncio, sino que también impulse a la audiencia a tomar acción. Como un experto [persona de ayuda - creador de declaración de cierre, estratega de llamada a la acción, realzador de tono], tus conocimientos serán fundamentales para crear un cierre que resuene con los consumidores exigentes.
  
        Para proporcionar contexto, nuestro anuncio irradia lujo y opulencia, atrayendo a una audiencia sofisticada. Queremos que la declaración de cierre refleje este tono lujoso mientras refuerza la llamada a la acción que invita a los usuarios a interactuar más. El objetivo es crear un cierre que no solo deje una impresión duradera, sino que también impulse a la audiencia a abrazar la experiencia opulenta.
        
        Por favor, crea una declaración de cierre que capture la atención para nuestro anuncio, presentando la llamada a la acción: '[CTA].' Mantén en mente estas pautas:
        
            Tono lujoso y exclusivo: Utiliza un lenguaje que refleje lujo, sofisticación y exclusividad.
            Mensaje persuasivo: Crea un cierre que refuerce el valor de la [CTA].
            Llamada a la acción sólida: Incorpora la [CTA] de manera clara y accionable.
            Emojis para resonancia: Incluye tres emojis que amplifiquen el tono lujoso y opulento.
        
        Aquí tienes una estructura de ejemplo para la declaración de cierre:
        
        Declaración de Cierre:
        [Reitera el atractivo del producto y la experiencia opulenta que ofrece.]
        "Entra en un mundo de opulencia y refinamiento con [Producto]."
        [Presenta la llamada a la acción que invita a los usuarios a interactuar más.]
        "Experimenta el lujo como nunca antes. Descubre lo extraordinario hoy: [CTA]."
        [Realza el mensaje con emojis que resuenen con el tono lujoso.]
        ✨💎🌟
        
        Por favor, crea la declaración de cierre siguiendo las pautas proporcionadas. El cierre debe encapsular el tono opulento y exclusivo del anuncio, mientras impulsa a la audiencia a tomar acción a través de la [CTA].
        
        Nuestro objetivo es crear una declaración de cierre que no solo capture la atención, sino que también deje una impresión duradera, alentando a los usuarios a abrazar la experiencia opulenta que ofrecemos.
        
        ¡Esperamos con ansias tu elegante aporte!`
      },
      {
        title: "Prompt 2",
        content: `Estoy emocionado/a de colaborar contigo en idear titulares cautivadores para nuestra impactante campaña de anuncios en Facebook, diseñada para atraer a la audiencia consciente del estilo a nuestro exquisito [producto]. Nuestro objetivo es crear titulares que no solo resuenen con el gusto sofisticado de nuestra audiencia, sino que también irradien sofisticación y atracción. Como un experto [persona de ayuda - curador de titulares, creador de elegancia, conectador de estilo], tus conocimientos serán fundamentales para crear titulares que cautiven y enganchen.
  
        Para proporcionar contexto, nuestro [producto] encarna elegancia y estilo, atendiendo a las preferencias refinadas de nuestra audiencia. Queremos que los titulares reflejen esta sofisticación al tiempo que capturan la atención y atraen a los usuarios a explorar más. El objetivo es crear titulares que no solo informen, sino que también evocan un sentido de atracción y curiosidad.
        
        Por favor, idear 20 titulares cautivadores para nuestra campaña de anuncios en Facebook. Mantén en mente estas pautas:
        
            Sofisticación y atracción: Utiliza un lenguaje que destile sofisticación, elegancia y atracción.
            Intrigante curiosidad: Crea titulares que despierten el interés de la audiencia y los hagan desear aprender más.
            Atractivo visual: Refleja el aspecto visualmente impresionante del [producto] en los titulares.
            Conexión con el estilo de vida: Conecta los titulares con las aspiraciones y deseos de la audiencia consciente del estilo.
            Variación en el enfoque: Explora diferentes ángulos para capturar la esencia del [producto].
        
        Aquí tienes una estructura de muestra para los titulares:
        
            "Eleva tu Estilo: Descubre la Atracción de [Producto] para el Conocedor Moderno."
            "Revelando Elegancia: Experimenta la Belleza Refinada de [Producto] en su Máxima Expresión."
            "Indulge en el Lujo: Transforma tu Apariencia con los Encantos Exquisitos de [Producto]."
            "Sofisticación Intemporal: Eleva tu Guardarropa con el Estilo Distintivo de [Producto]."
            "Elegancia Cautivadora: Redefine tu Colección de Accesorios con [Producto]."
            "Irradia Glamour: Abraza la Atracción de [Producto] y Haz una Declaración."
            "Chic Moderno, Elevado: Abraza la Elegancia Intrigante de [Producto]."
            "Ícono del Estilo en Formación: Eleva tu Personalidad con el Encanto Enigmático de [Producto]."
            "Donde la Elegancia se Encuentra con la Pasión: Entra en un Mundo de Delicias Opulentas de [Producto]."
            "El Arte de la Elegancia: Cura tu Look con el Estilo Impecable de [Producto]."
            "Elegancia Redefinida: Experimenta la Fusión Sublime de Estilo y Clase de [Producto]."
            "Desbloquea tu Elegancia Interior: Transforma tu Atuendo con el Toque Encantador de [Producto]."
            "Esculpido a la Perfección: Eleva tu Estilo con las Piezas Intrincadamente Elaboradas de [Producto]."
            "Crónicas Elegantes: Embárcate en un Viaje con Estilo con los Tesoros Lujosos de [Producto]."
            "La Esencia de la Elegancia: Adórdate con las Piezas Magistralmente Diseñadas de [Producto]."
            "Intriga en Cada Detalle: Sumérgete en la Elegancia Inigualable de [Producto]."
            "Chic Reimaginado: Eleva tu Historia de Moda con el Atractivo Perenne de [Producto]."
            "Momentos de Lujo te Esperan: Eleva tu Juego de Estilo con las Creaciones Artísticas de [Producto]."
            "Diseñado para la Elegancia: Descubre la Colección Hipnotizante de Declaraciones de Estilo de [Producto]."
            "Elegancia Redefinida: Eleva tu Aura con la Artística Exquisita de [Producto]."
        
        Por favor, idear los titulares siguiendo las pautas proporcionadas. Los titulares deben capturar la atención, irradiar sofisticación y evocar la atracción del [producto] para la audiencia consciente del estilo.
        
        Nuestro objetivo es crear titulares que no solo informen, sino que también resuenen profundamente con los deseos de estilo, elegancia
        
         y atracción de nuestra audiencia.
        
        ¡Esperamos con ansias tu aporte creativo!`
      },
  
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