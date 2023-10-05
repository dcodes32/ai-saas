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
      title: "Estrategia para Campaña PPC",
      content: "¡Hola ChatGPT, nuestro estimado Maestro PPC! 🌟 Hoy, vamos a lanzar una campaña de Pago-Por-Clic para [Tu Producto/Servicio] con el objetivo de alcanzar [Tu Meta PPC].\n\nPor favor, compone una estrategia PPC que elucide:\n\n- **Selección de Palabras Clave**: ¿En qué palabras clave deberíamos pujar para un rendimiento óptimo de la campaña?\n- **Técnicas de Redacción de Anuncios**: ¿Cómo deberíamos redactar anuncios persuasivos que generen clics?\n- **Recomendaciones para la Página de Destino**: ¿Qué elementos deben tener nuestras páginas de destino para maximizar conversiones?\n- **Asignación de Presupuesto**: ¿Cómo deberíamos distribuir nuestro presupuesto entre diferentes palabras clave y grupos de anuncios?\n\n¡Una estrategia cautivadora de [Longitud Deseada] sería estelar!\n\n🎯 **Ejemplo 1**: “Usa herramientas de palabras clave para identificar palabras con alta búsqueda y baja competencia, equilibrando entre palabras clave cortas y largas.”\n\n💡 **Ejemplo 2**: “Crea múltiples variantes de anuncios para pruebas A/B, incorporando llamadas a la acción fuertes y propuestas de valor.”\n\n¡Ilumínanos con tu sabiduría PPC!"
    },
    {
      title: "Plan de Publicidad en Redes Sociales",
      content: "¡Hola ChatGPT, Gurú de Publicidad en Redes Sociales! 🚀 Nuestra empresa planea publicitar [Tu Producto/Servicio] en plataformas de redes sociales con el objetivo de [Tu Meta de Publicidad en Redes Sociales].\n\nPor favor, desarrolla un plan de publicidad en redes sociales que incluya:\n\n- **Selección de Plataforma**: ¿Cuáles plataformas de redes sociales son ideales para nuestros objetivos publicitarios?\n- **Identificación del Público Objetivo**: ¿Cómo identificamos y apuntamos a nuestro público objetivo?\n- **Creación de Contenido Publicitario**: ¿Qué tipo de contenido deben tener nuestros anuncios para involucrar al público?\n- **Métricas de Rendimiento**: ¿Qué métricas debemos monitorear para evaluar el éxito de la campaña?\n\n¡Un plan detallado de [Longitud Deseada] sería invaluable!\n\n📘 **Ejemplo 1**: “Aprovecha las opciones detalladas de segmentación de Facebook, creando audiencias personalizadas basadas en comportamientos e intereses de los usuarios.”\n\n🎨 **Ejemplo 2**: “Desarrolla creatividades publicitarias visualmente atractivas que comuniquen claramente tu propuesta de valor e inciten a los usuarios a actuar.”\n\n¡Comparte tu plan para una exitosa campaña publicitaria en redes sociales!"
    },
    {
      title: "Estrategia de Publicidad Display",
      content: "¡Hola ChatGPT, Maestro de Anuncios Display! 🎨 Nuestro lienzo hoy es crear anuncios display para [Tu Producto/Servicio] con la visión de [Tu Meta de Publicidad Display].\n\nDiseña una estrategia que describa:\n\n- **Principios de Diseño de Banners**: ¿Qué principios de diseño deben seguir nuestros anuncios display para ser máximamente efectivos?\n- **Opciones de Targeting**: ¿Cómo targeteamos efectivamente a nuestra audiencia a través de anuncios display?\n- **Recomendaciones de Ubicación**: ¿En qué sitios o redes deben aparecer nuestros anuncios display?\n- **Seguimiento del Rendimiento**: ¿Cuáles son las métricas clave para seguir y analizar en la publicidad display?\n\nEsperamos una estrategia maestra de aproximadamente [Longitud Deseada].\n\n🖼️ **Ejemplo 1**: “Diseña banners limpios y simples con una clara llamada a la acción, evitando texto excesivo y utilizando visuales llamativos.”\n\n📊 **Ejemplo 2**: “Utiliza retargeting para mostrar anuncios display a usuarios que han visitado previamente tu sitio web, aumentando las posibilidades de conversión.”\n\n¡Revela tus estrategias para crear y ubicar anuncios display efectivos!"
    },
    {
      title: "Plan de Campaña de Publicidad en Video",
      content: "¡Hola ChatGPT, el Virtuoso de la Publicidad en Video! 🎬 Hoy preparamos el escenario para una campaña de publicidad en video para [Tu Producto/Servicio], apuntando a [Tu Meta de Publicidad en Video].\n\nPor favor, dirige un plan que incluya:\n\n- **Ideas de Contenido en Video**: ¿Qué deben transmitir nuestros videos para cautivar y convertir a la audiencia?\n- **Recomendaciones de Plataforma**: ¿Dónde deberíamos publicar nuestros anuncios en video para optimizar visibilidad y compromiso?\n- **Estrategia de Audiencia Objetivo**: ¿Cómo identificamos y targeteamos eficazmente a la audiencia a través de video?\n- **Análisis del Rendimiento**: ¿Cuáles métricas son cruciales para evaluar el éxito de la publicidad en video?\n\n¡Un plan blockbuster de [Longitud Deseada] sería excelente!\n\n🎥 **Ejemplo 1**: “Crea tramas o narrativas atractivas en tus anuncios en video que resuene con tu audiencia objetivo, generando conexiones emocionales.”\n\n🚀 **Ejemplo 2**: “Aprovecha características específicas de la plataforma, como los anuncios TrueView de YouTube, para mejorar la interacción y compromiso del usuario con tu contenido en video.”\n\n¡Ilumina nuestras pantallas con tus estrategias de publicidad en video!"
    },
    {
      title: "Estrategia de Publicidad Móvil",
      content: "¡Hola ChatGPT, Experto en Publicidad Móvil! 📱 La misión de hoy es crear anuncios móviles para [Tu Producto/Servicio] que logren [Tu Meta de Publicidad Móvil].\n\nPor favor, formula una estrategia de publicidad móvil detallando:\n\n- **Recomendaciones de Formato de Anuncio**: ¿Qué formatos de anuncios móviles son más efectivos para nuestros objetivos?\n- **Técnicas de Targeting**: ¿Cómo enfocamos a los usuarios móviles más propensos a convertir?\n- **Sugerencias de Contenido del Anuncio**: ¿Qué contenido hará irresistibles a nuestros anuncios móviles?\n- **Métricas de Rendimiento**: ¿Qué KPIs debemos monitorizar para evaluar y optimizar el rendimiento de la campaña?\n\nEsperamos una estrategia de aproximadamente [Longitud Deseada].\n\n📈 **Ejemplo 1**: “Experimenta con formatos de anuncios interactivos que involucren a los usuarios y los animen a interactuar con el anuncio, mejorando el recuerdo de marca.”\n\n📍 **Ejemplo 2**: “Incorpora geotargeting para entregar anuncios a los usuarios basados en su ubicación, ofreciendo promociones o información relevante y oportuna.”\n\n¡Guíanos a través del dinámico paisaje de la publicidad móvil con tu estrategia!"
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