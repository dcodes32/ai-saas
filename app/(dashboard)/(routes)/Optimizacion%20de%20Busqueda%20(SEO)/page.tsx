"use client";


import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useState, useEffect } from 'react';

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
      title: "Estrategia para Auditoría SEO",
      content: "¡Hola ChatGPT, el Hechicero SEO! 🧙 Hoy nos sumergimos en el místico mundo del SEO para [Tu Sitio Web], con el objetivo de descubrir y entender [Tu Meta de Auditoría SEO].\n\nDiseña una estrategia de auditoría SEO que desmitifique:\n\n- **Problemas Técnicos**: ¿Qué fallas técnicas ocultas podrían estar escondidas en las profundidades de nuestro sitio web?\n- **Huecos de Contenido**: ¿Dónde están los vacíos de contenido que necesitamos llenar para mejorar la autoridad y relevancia de nuestro sitio?\n- **Análisis de Backlinks**: ¿Cuán fuerte e influyente es nuestro perfil de backlinks?\n- **Factores de Experiencia de Usuario**: ¿La experiencia de usuario en nuestro sitio web es lo suficientemente encantadora como para mantener a los visitantes fascinados?\n\n¡Una estrategia hechizante de aproximadamente [Longitud Deseada] sería mágica!\n\n🕵️ **Ejemplo 1**: “Inicia un análisis de errores de rastreo para identificar y corregir enlaces rotos y páginas inaccesibles, asegurando una navegación fluida y una experiencia de usuario mejorada.”\n\n📚 **Ejemplo 2**: “Realiza una auditoría de contenido exhaustiva para identificar y mejorar el contenido con bajo rendimiento, incorporando palabras clave relevantes y mejorando la legibilidad.”\n\n¡Ilumínanos con tu sabiduría en auditorías SEO!"
    },
    {
      title: "Plan de Investigación de Palabras Clave",
      content: "¡Hola ChatGPT, nuestro Conocedor de Palabras Clave! 🎩 La misión de hoy involucra descubrir palabras clave doradas para [Tu Sitio Web] con el gran objetivo de [Tu Meta de Investigación de Palabras Clave].\n\nConjura un plan de investigación de palabras clave detallando:\n\n- **Identificación de Palabras Clave**: ¿Cómo descubrimos palabras clave que son tesoros esperando ser encontrados?\n- **Evaluación de Palabras Clave**: ¿Qué métricas deben guiarnos al evaluar la potencia de las palabras clave?\n- **Análisis Competitivo**: ¿Cómo espiar la estrategia de palabras clave de los competidores sin ser descubierto?\n- **Palabras Clave Long-Tail**: ¿Algún consejo sobre cómo descubrir palabras clave long-tail que puedan generar tráfico valioso?\n\nBuscamos un plan detallado, de aproximadamente [Longitud Deseada].\n\n🔎 **Ejemplo 1**: “Utiliza herramientas como Google Keyword Planner o Ahrefs para encontrar palabras clave con alto volumen de búsqueda y baja competencia.”\n\n🚀 **Ejemplo 2**: “Analiza los sitios web de tus competidores para entender para qué palabras clave están posicionándose y identificar oportunidades para tu propio sitio.”\n\n¡Comparte tu plan experto para el descubrimiento y evaluación de palabras clave!"
    },
    {
      title: "Guía de Mejora de SEO On-Page",
      content: "¡Hola ChatGPT, el Sabio del SEO On-Page! 📚 Necesitamos optimizar las páginas de [Tu Sitio Web] para alcanzar [Tu Meta de SEO On-Page].\n\nPor favor, redacta una guía de SEO On-Page que incluya:\n\n- **Títulos y Meta Descripciones**: ¿Cómo creamos títulos y meta descripciones que sean irresistibles tanto para los motores de búsqueda como para los usuarios?\n- **Optimización de Etiquetas de Encabezado**: ¿Algún consejo para optimizar las etiquetas H1, H2 y otras de encabezado para un mejor SEO?\n- **Optimización de Imágenes**: ¿Cómo debemos manejar las imágenes para asegurar que contribuyan positivamente al SEO?\n- **Estrategia de Enlazado Interno**: ¿Qué estrategias de enlazado interno deberíamos emplear?\n\nUna guía de [Longitud Deseada] sería perfecta.\n\n🌐 **Ejemplo 1**: “Redacta títulos y meta descripciones únicos y atractivos para cada página, incorporando palabras clave objetivo de manera natural.”\n\n🖼️ **Ejemplo 2**: “Asegura que todas las imágenes tengan texto alternativo descriptivo y estén comprimidas para cargar más rápido sin perder calidad.”\n\n¡Impártenos tu conocimiento sobre optimización On-Page!"
    },
    {
      title: "Estrategia de SEO Off-Page",
      content: "¡Hola ChatGPT, el Estratega de SEO Off-Page! 🌍 Nuestro objetivo es aumentar la autoridad y confiabilidad de [Tu Sitio Web] con la meta de alcanzar [Tu Meta de SEO Off-Page].\n\n¿Podrías idear una estrategia de SEO Off-Page que incluya:\n\n- **Construcción de Backlinks**: ¿Cómo adquirimos backlinks valiosos que fortalezcan la autoridad de nuestro sitio web?\n- **Integración con Redes Sociales**: ¿Cómo debe interactuar nuestro sitio web con las redes sociales para obtener beneficios en SEO?\n- **Colaboraciones con Influencers**: ¿Algún estrategia para colaborar con influencers y mejorar el SEO Off-Page?\n- **Menciones de Marca**: ¿Cómo aumentar y aprovechar menciones de la marca no vinculadas?\n\nEsperamos una estrategia detallada de aproximadamente [Longitud Deseada].\n\n🔗 **Ejemplo 1**: “Participa en publicaciones como invitado en sitios respetables de tu nicho, asegurando recibir backlinks de calidad a cambio.”\n\n🌟 **Ejemplo 2**: “Monitorea menciones de la marca en la web y redes sociales, interactuando con usuarios y fomentando relaciones positivas para mejorar la reputación y autoridad de la marca.”\n\n¡Desvela tus secretos de SEO Off-Page para nosotros!"
    },
    {
      title: "Plan de Optimización de SEO Local",
      content: "¡Hola ChatGPT, el Navegante de SEO Local! 📍 Nuestra misión es dominar los resultados de búsqueda locales para [Tu Negocio] con el objetivo de [Tu Meta de SEO Local].\n\nCrea un plan de SEO Local detallando:\n\n- **Optimización de Google My Business**: ¿Cómo optimizamos nuestro perfil de GMB para máxima visibilidad?\n- **Palabras Clave Locales**: ¿Qué estrategias debemos usar para identificar y apuntar a palabras clave locales?\n- **Construcción de Backlinks Locales**: ¿Algún consejo para adquirir backlinks de negocios y directorios locales?\n- **Estrategia de Reseñas de Clientes**: ¿Cómo gestionamos y aprovechamos las reseñas de clientes para el SEO Local?\n\nUn plan detallado de aproximadamente [Longitud Deseada] sería excelente.\n\n🗺️ **Ejemplo 1**: “Asegúrate de que tu perfil de Google My Business esté completo y preciso, actualizándolo regularmente con fotos y publicaciones nuevas para atraer a clientes potenciales.”\n\n⭐ **Ejemplo 2**: “Anima a clientes satisfechos a dejar reseñas positivas en tu perfil de GMB y responde de manera rápida y profesional a todas las reseñas, positivas o negativas.”\n\n¡Guíanos a través del intrincado paisaje del SEO Local!"
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