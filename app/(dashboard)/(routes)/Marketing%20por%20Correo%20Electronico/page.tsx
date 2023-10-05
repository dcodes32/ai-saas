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
          🚀 Desata el Poder de los Modelos de Lenguaje con <span style={{ fontStyle: 'italic' }}>Superprompts</span> 🚀
        </h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <strong style={{ fontSize: '24px', color: '#ff4500' }}>¿Por qué Superprompts?</strong> <span style={{ color: '#228B22', fontSize: '20px' }}>Superprompts</span> no es solo otra herramienta; ¡es una <strong style={{ fontSize: '24px' }}>revolución!</strong> En el mundo de las interacciones con modelos de lenguaje, dominar la ingeniería de indicaciones es fundamental. Superprompts te capacita con las habilidades para desbloquear todo el potencial de los grandes modelos de lenguaje.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          🌐 <strong style={{ fontSize: '24px', color: '#228B22' }}>Alcance Global con un Toque Local:</strong> Imagina tener la capacidad de participar en conversaciones que no solo son precisas, sino que también están profundamente conectadas con las sutilezas lingüísticas locales. Superprompts elimina la brecha entre los modelos de lenguaje y la expresión humana, garantizando un alcance global con un toque local.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          💡 <strong style={{ fontSize: '24px', color: '#ff4500' }}>Posibilidades Infinitas:</strong> La ingeniería de indicaciones es como manejar una varita mágica. Ya sea que estés creando contenido, generando ideas o desarrollando aplicaciones, Superprompts te abre la puerta a posibilidades ilimitadas. Sumérgete en el arte de crear indicaciones que estimulen la creatividad y observa cómo se despliegan potenciales inexplorados.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          ⚡️ <strong style={{ fontSize: '24px', color: '#ff4500' }}>Velocidad y Eficiencia:</strong> La ingeniería de indicaciones no se trata solo de creatividad; se trata de optimización. Superprompts es tu aliado para lograr una velocidad y eficiencia inigualables. Cada solicitud se ajusta meticulosamente para garantizar que recibas las respuestas más rápidas y precisas en todo momento.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          🌟 <strong style={{ fontSize: '24px', color: '#ff4500' }}>Indicaciones en Cadena de Pensamiento:</strong> Hay varios métodos probados que han demostrado que pueden hacer que ChatGPT aumente su rendimiento. Uno de estos métodos es la indicación en cadena de pensamiento, que permite guiar las respuestas del modelo de lenguaje paso a paso, lo que resulta en una salida más coherente y contextual.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          ⭐️ <strong style={{ fontSize: '24px', color: '#ff4500' }}>Superprompts en Tu Vida Cotidiana:</strong> Imagina contar con un asistente de lenguaje inteligente que te ayude en tu día a día. Superprompts puede responder tus preguntas, brindarte información actualizada y hasta ayudarte a redactar correos o mensajes de manera más efectiva. Simplifica tus tareas cotidianas y ahorra tiempo con Superprompts.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          🏢 <strong style={{ fontSize: '24px', color: '#ff4500' }}>Superprompts en Tu Trabajo:</strong> La eficiencia es esencial en el entorno laboral. Superprompts puede acelerar tus tareas de investigación, asistirte en la creación de informes y proporcionarte insights clave para tomar decisiones informadas. Ya sea que trabajes en marketing, desarrollo, atención al cliente o cualquier otro campo, Superprompts es tu aliado para destacar en tu trabajo.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          🚀 <strong style={{ fontSize: '24px', color: '#ff4500' }}>Superprompts en Tu Negocio:</strong> En el competitivo mundo de los negocios, cada ventaja cuenta. Superprompts puede ayudarte a mejorar la comunicación con tus clientes, optimizar tu presencia en línea e incluso brindarte ideas innovadoras para el crecimiento de tu empresa. Desde estrategias de marketing hasta análisis de datos, Superprompts puede impulsar el éxito de tu negocio.
        </p>
        <p style={{ fontSize: '20px', lineHeight: '1.6', textAlign: 'center', marginTop: '40px' }}>
          ¿Listo para embarcarte en un viaje transformador donde la tecnología se encuentra con la creatividad? Con Superprompts, presenciarás cómo la ingeniería de indicaciones puede amplificar las capacidades de los grandes modelos de lenguaje. 
          <button 
            onClick={handleSubscribeClick} 
            disabled={loading} 
            style={{ color: '#ff4500', textDecoration: 'underline', fontWeight: 'bold', fontSize: '24px', cursor: 'pointer', background: 'none', border: 'none' }}>¡Suscríbete Ahora!</button> 
          y da el primer paso hacia el futuro de la interacción con modelos de lenguaje con <span style={{ color: '#228B22', fontSize: '24px' }}>Superprompts</span>.
        </p>
      </div>
    );
  }
  const prompts: Prompt[] = [
    {
      title: "Desarrollo de Campaña de Email Marketing",
      content: "¡Hola ChatGPT! 🌟 ¡Hoy eres el venerado Mago del Email Marketing! Necesito tu expertise para crear una campaña de email marketing magnética para [Tu Producto/Servicio] con el noble objetivo de [Tu Meta de Email Marketing].\n\nPor favor, querido mago, elabora una estrategia de campaña que describa:\n\n- **Tipos de Emails**: ¿Qué tipos de emails encantadores deberíamos enviar? ¿Boletines, promociones, anuncios o algo más mágico?\n- **Frecuencia de Emails**: ¿Con qué frecuencia estos pájaros electrónicos deben volar hacia las bandejas de entrada de nuestros suscriptores?\n- **Técnicas de Compromiso**: ¿Qué hechizos podemos lanzar dentro de nuestros emails para incentivar aperturas, lecturas y clics?\n- **Métricas de Rendimiento**: ¿En qué bolas de cristal (métricas) debemos mirar para entender el éxito de nuestra campaña?\n\n¡Una estrategia de aproximadamente [Longitud Deseada] sería magnífica!\n\n📧 **Ejemplo 1**: “Elabora boletines mensuales que ofrezcan valor mediante asesoramiento experto, insights de la industria y ofertas exclusivas relacionadas con [Tu Producto/Servicio].”\n\n🚀 **Ejemplo 2**: “Implementa ofertas promocionales por tiempo limitado que creen un sentido de urgencia, incentivando a los suscriptores a tomar acción inmediata.”\n\n¡Teje tu magia y comparte tu estrategia de campaña!"
    },
    {
      title: "Estrategia de Crecimiento de Lista de Email",
      content: "¡Hola ChatGPT! 🚀 ¡Hoy eres un Gurú del Crecimiento de Listas de Email! Nuestra misión es expandir nuestra base de suscriptores para los boletines de [Tu Producto/Servicio]. Nuestro destino es [Tu Meta de Crecimiento de Lista].\n\n¿Podrías elaborar una estrategia meticulosa para crecer nuestra lista de emails, que incluya:\n\n- **Incentivos de Registro**: ¿Qué ofertas irresistibles deberíamos proveer para la suscripción?\n- **Estrategias de Ubicación**: ¿Dónde deberían aparecer estratégicamente nuestros formularios de registro?\n- **Técnicas Promocionales**: ¿Cómo promovemos nuestro boletín para atraer más suscriptores?\n- **Estrategias de Retención**: ¿Cómo evitamos que los suscriptores presionen el temido botón de desuscripción?\n\n¡Una estrategia detallada de aproximadamente [Longitud Deseada] sería espléndida!\n\n🌐 **Ejemplo 1**: “Ofrece un ebook gratuito o un código de descuento como incentivo de registro. Esto proporciona valor inmediato a los nuevos suscriptores, animándolos a unirse a tu lista.”\n\n🔥 **Ejemplo 2**: “Organiza webinars o eventos exclusivos solo para suscriptores, promoviéndolos a través de redes sociales y otros canales para atraer registros.”\n\n¡Comparte amablemente tu estrategia experta para crecer y mantener una lista de emails próspera!"
    },
    {
      title: "Guía de Creación de Contenido de Email",
      content: "¡Hola ChatGPT! 🎨 Hoy, asume el rol de Artista de Contenido de Email. Nuestro objetivo es crear emails para [Tu Producto/Servicio] que sean imposibles de ignorar, con el objetivo de alcanzar [Tu Meta de Contenido de Email].\n\nPor favor, pinta un lienzo estratégico para crear contenido de email cautivador, que incluya:\n\n- **Tipos de Contenido**: ¿Qué tipo de contenido deben tener nuestros emails para deleitar e informar a nuestros suscriptores?\n- **Estilo de Escritura**: ¿Cómo deberíamos comunicarnos? ¿Formal, casual, profesional o juguetón?\n- **Elementos Visuales**: ¿Qué componentes visuales deben incluirse para que los emails sean visualmente atractivos?\n- **Llamado a la Acción**: ¿Cómo creamos CTAs persuasivos que animen a los suscriptores a tomar la acción deseada?\n\nEsperamos una estrategia maestra de aproximadamente [Longitud Deseada].\n\n✨ **Ejemplo 1**: “Incorpora testimonios de clientes y historias de éxito en tus emails para construir confianza y credibilidad entre tus suscriptores.”\n\n📈 **Ejemplo 2**: “Utiliza un lenguaje persuasivo e impulsado a la acción para tus CTAs, instruyendo claramente a los suscriptores sobre qué acción quieres que tomen.”\n\n¡Desata tu creatividad y guíanos en la creación de emails que sean tanto hermosos como efectivos!"
    },
    {
      title: "Analítica y Mejora de Email Marketing",
      content: "¡Hola ChatGPT! 🔬 Hoy, eres un Científico de Email Marketing. Nuestro experimento involucra optimizar nuestras campañas de email para [Tu Producto/Servicio] con la hipótesis de alcanzar [Tu Meta de Optimización de Email].\n\nPor favor, desarrolla un plan detallado de análisis y mejora que incluya:\n\n- **Métricas Clave a Seguir**: ¿Qué métricas son vitales para entender y medir el éxito de nuestras campañas de email?\n- **Técnicas de Análisis**: ¿Cómo deberíamos analizar estas métricas para obtener insights significativos?\n- **Sugerencias de Mejora**: Basándonos en los datos, ¿qué cambios deberíamos hacer a nuestras campañas de email?\n- **Ideas de Pruebas A/B**: ¿Qué elementos deberíamos probar para mejorar continuamente el rendimiento de nuestros emails?\n\n¡Un plan detallado e insightful de aproximadamente [Longitud Deseada] sería maravilloso!\n\n📊 **Ejemplo 1**: “Analiza regularmente las tasas de apertura y clics para entender los niveles de compromiso de los suscriptores. Tasas bajas pueden indicar que tus líneas de asunto o contenido necesitan mejora.”\n\n🔍 **Ejemplo 2**: “Realiza pruebas A/B en diferentes elementos como líneas de asunto, horarios de envío y botones CTA para entender qué resuena mejor con tu audiencia.”\n\n¡Préstamos tu mente analítica y ayúdanos a optimizar nuestras campañas de email para el éxito!"
    },
    {
      title: "Plan de Flujo de Trabajo de Automatización de Email",
      content: "¡Hola ChatGPT! ⚙️ Como el Arquitecto de Automatización de Email del día, necesitamos construir flujos de trabajo de automatización robustos para [Tu Producto/Servicio] con el objetivo de alcanzar [Tu Meta de Automatización].\n\n¿Podrías redactar un plan de flujo de trabajo de email automatizado que incluya:\n\n- **Eventos Disparadores**: ¿Qué acciones o eventos deberían desencadenar emails automáticos?\n- **Secuencias de Email**: ¿Qué secuencia de emails se debe enviar basado en diferentes disparadores?\n- **Sugerencias de Contenido**: ¿Qué contenido debe contener cada email en la secuencia?\n- **Estrategia de Seguimiento**: ¿Cómo nos involucramos efectivamente con los suscriptores después de que reciban emails automáticos?\n\nApreciaríamos un plan detallado y sistemático de aproximadamente [Longitud Deseada].\n\n🚀 **Ejemplo 1**: “Diseña una serie de emails de bienvenida para nuevos suscriptores, presentándoles [Tu Producto/Servicio] y ofreciendo un descuento especial en su primera compra.”\n\n💡 **Ejemplo 2**: “Implementa emails de abandono de carrito que recuerden suavemente a los clientes los productos que dejaron en su carrito y los alienten a completar su compra.”\n\n¡Crea un plano para flujos de trabajo de automatización de emails fluidos y efectivos!"
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

