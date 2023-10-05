"use client";


import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
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


  
  const prompts: Prompt[] = [
    {
      title: "Medición del Éxito del Marketing en Redes Sociales",
      content: `¡Hola ChatGPT, nuestro Experto Analista de Redes Sociales! 🌟 Estoy ansioso por descifrar el éxito de nuestra estrategia de marketing en redes sociales para [Tu Producto/Servicio], con el objetivo de comprender [Tu Meta de Marketing en Redes Sociales].

      Te pido amablemente que me guíes en:
      
          Indicadores Clave de Desempeño (KPIs): ¿Cuáles son los KPIs cruciales para evaluar el triunfo de nuestros esfuerzos en redes sociales?
          Técnicas de Análisis de Métricas: ¿Podrías elucidar sobre la metodología para analizar estas métricas de manera efectiva?
          Benchmarking: ¿Cómo establecemos y utilizamos referencias para evaluar nuestro rendimiento en comparación con los estándares de la industria o competidores?
          Cálculo de ROI: Por favor, proporciona información sobre cómo calcular el Retorno de Inversión para nuestras campañas en redes sociales.
      
      Espero una estrategia detallada de aproximadamente [Longitud Deseada].
      
      📊 Ejemplo 1: “Monitorea las tasas de compromiso para entender cuán efectivo es tu contenido con tu audiencia, observando los me gusta, compartidos y comentarios por publicación.”
      
      🔗 Ejemplo 2: “Sigue las tasas de conversión de los canales de redes sociales para entender cuántas interacciones resultan en acciones deseadas, como realizar una compra o registrarse para obtener más información.”
      
      ¡Desentraña para mí el misterio de la medición del éxito en redes sociales!`,
    },
    {
      title: " Interpretación de Datos Analíticos para Decisiones Informadas",
      content: `¡Saludos ChatGPT, el Maestro Interpretador de Datos! 🎓 Me estoy sumergiendo en un mar de datos analíticos relacionados con [Tu Área de Negocio] con la misión de tomar decisiones ilustradas dirigidas a [Tu Meta de Negocio].

      Por favor, ilumina el camino proporcionando:
      
          Técnicas de Análisis de Datos: ¿Cuáles son las técnicas óptimas para examinar e interpretar nuestros datos analíticos de manera precisa?
          Extracción de Insights: ¿Podrías guiarme sobre cómo derivar insights accionables de la multitud de puntos de datos disponibles?
          Marco de Toma de Decisiones: ¿Cómo deberíamos incorporar estos insights en nuestros procesos de toma de decisiones de manera efectiva?
          Consejos de Visualización de Datos: ¿Tienes recomendaciones sobre cómo visualizar los datos para una mejor comprensión y comunicación?
      
      Espero una guía completa de aproximadamente [Longitud Deseada].
      
      📈 Ejemplo 1: “Utiliza el análisis de tendencias para identificar patrones dentro de tus datos, lo que ayuda a predecir resultados futuros y a tomar decisiones proactivas para el negocio.”
      
      🧭 Ejemplo 2: “Emplea el análisis comparativo para entender tu rendimiento en relación con benchmarks o competidores, ayudando a identificar áreas de mejora.”
      
      ¡Concédele la sabiduría para navegar a través de datos analíticos para tomar decisiones informadas!`,
    },
    {
      title: "Beneficios y Desafíos del Marketing con Influencers",
      content: `¡Hola ChatGPT, nuestro Aficionado al Marketing con Influencers! 🌠 Estoy explorando el ámbito del marketing con influencers para [Tu Producto/Servicio], con el doble objetivo de comprender sus potenciales beneficios y desafíos.

      Por favor, ilumíname sobre:
      
          Beneficios Clave: ¿Qué ventajas significativas podemos obtener a través de un efectivo marketing con influencers?
          Desafíos Comunes: ¿Cuáles son los obstáculos típicos y cómo podemos superarlos eficientemente?
          Estrategias de Mitigación de Riesgos: ¿Podrías proporcionar información sobre cómo gestionar los riesgos y desafíos asociados con el marketing con influencers?
          Historias de Éxito: ¿Existen ejemplos inspiradores donde las marcas hayan aprovechado exitosamente el marketing con influencers?
      
      Anticipo un análisis exhaustivo de aproximadamente [Longitud Deseada].
      
      🌟 Ejemplo 1: “El marketing con influencers puede expandir significativamente el alcance y la credibilidad de tu marca al conectarse con la audiencia establecida del influencer.”
      
      🚧 Ejemplo 2: “Un desafío es asegurar la alineación marca-influencer; es vital colaborar con influencers que resuenen genuinamente con los valores y estética de tu marca.”
      
      ¡Ilumíname sobre las complejidades del marketing con influencers!`,
    },
    {
      title: "Diferencias entre SEM y Publicidad en Redes Sociales",
      content: `¡Saludos ChatGPT, el Erudito de la Publicidad Digital! 🎓 Estoy navegando por el paisaje de la publicidad digital para [Tu Producto/Servicio], con el objetivo de discernir las diferencias entre Marketing en Motores de Búsqueda (SEM) y Publicidad en Redes Sociales.

      Por favor, aclárame:
      
          Diferencias Fundamentales: ¿Cuáles son las diferencias fundamentales entre SEM y Publicidad en Redes Sociales?
          Fortalezas y Debilidades: ¿Podrías comparar sus fortalezas y debilidades en varios aspectos?
          Consideraciones de Presupuesto: ¿Cómo difieren las asignaciones de presupuesto entre los dos, y cómo podemos optimizar para cada uno?
          Mejores Casos de Uso: ¿En qué circunstancias u objetivos es más efectivo cada tipo de publicidad?
      
      Espero un análisis comparativo de aproximadamente [Longitud Deseada].
      
      🔍 Ejemplo 1: “El SEM es excelente para alcanzar usuarios que buscan activamente tus productos o servicios, mientras que la publicidad en redes sociales es más sobre construir reconocimiento de marca y atraer clientes potenciales.”
      
      💰 Ejemplo 2: “El presupuesto para SEM a menudo involucra pujar por palabras clave, mientras que los presupuestos para publicidad en redes sociales pueden asignarse basados en el alcance y niveles de compromiso deseados.”
      
      ¡Guíame a través de las sutilezas del SEM y la Publicidad en Redes Sociales!`,
    },
    {
      title: "Mejores Prácticas para Marketing por Correo Electrónico",
      content: `¡Hola ChatGPT, el Experto en Marketing por Correo Electrónico! 🌐 Estoy diseñando una estrategia de marketing por correo electrónico para [Tu Producto/Servicio], con el objetivo de incorporar las mejores prácticas de la industria.

      Busco tu sabiduría en:
      
          Estrategias Efectivas: ¿Cuáles son las estrategias comprobadas que impulsan campañas exitosas de marketing por correo electrónico?
          Consejos para Creación de Contenido: ¿Cómo debería crear contenido atractivo y valioso para nuestros suscriptores?
          Frecuencia y Momento de Envío: ¿Cuáles son las pautas para determinar cuándo y con qué frecuencia enviar correos electrónicos?
          Medición del Rendimiento: ¿Podrías aconsejar sobre las métricas clave a seguir y cómo evaluar el éxito de la campaña?
      
      ¡Una guía detallada de aproximadamente [Longitud Deseada] sería extremadamente valiosa!
      
      💌 Ejemplo 1: “Redacta líneas de asunto que sean intrigantes y relevantes para el destinatario, motivándolo a abrir el correo electrónico.”
      
      📈 Ejemplo 2: “Segmenta tu lista de correos para enviar contenido más personalizado y relevante a diferentes grupos de suscriptores, mejorando el compromiso y las tasas de conversión.”
      
      ¡Otórgame las mejores prácticas para una campaña efectiva de marketing por correo electrónico!`,
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
    const boldPattern = /\*(.+?)\*/g; // Adjusted the regex to match asterisks
    const newText = text.replace(boldPattern, '<b>$1</b>'); // Replacing with HTML bold tags
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