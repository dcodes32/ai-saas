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
      title: "Una Estrategia de Magia para Conquistar a Tu Audiencia",
      content: "¡Hola ChatGPT, qué día tan brillante y alegre! 🌟 ¡Hoy serás un Mago de Campañas en Redes Sociales! Necesitamos tu creatividad brillante y asesoramiento experto para lanzar una campaña fascinante en redes sociales para [Tu Producto/Servicio].\n\nNuestro objetivo es simple pero ambicioso: [Tu Meta de Campaña]. Apuntamos a encantar a [Público Objetivo] y construir una comunidad vibrante que adore [Tu Producto/Servicio]. ¿Puedes ayudarnos a crear la poción perfecta de contenido que hipnotice y comprometa?\n\nPor favor, crea una estrategia deliciosa que cubra:\n\n- **Magia de Contenido**: ¿Qué tipos de contenido deslumbrante deberíamos esparcir por nuestras páginas de redes sociales?\n- **Maravilla de Plataforma**: ¿Dónde pasa más tiempo nuestro [Público Objetivo]? ¿En los castillos de Instagram o los cielos de Twitter?\n- **Hechizos de Compromiso**: Comparte tus hechizos secretos para aumentar el compromiso y conseguir que nuestra audiencia haga clic, comparta y comente.\n- **Bola de Cristal de Medición**: ¿En qué métricas deberíamos fijarnos para entender el rendimiento de la campaña?\n\nDeseamos una estrategia detallada y brillante de aproximadamente [Longitud Deseada], salpicada de alegría e ideas accionables.\n\n🚀 **Ejemplo 1**: “Crea infografías caprichosas y coloridas que simplifiquen las increíbles características de [Tu Producto]. ¡Estas delicias visuales no solo son compartibles, sino también muy informativas!”\n\n🌈 **Ejemplo 2**: “Realiza sesiones semanales de Facebook Live donde reveles la magia detrás de [Tu Producto/Servicio]. Interactúa con la audiencia respondiendo a sus preguntas y mostrando testimonios de clientes felices.”\n\n¡Esparce tu magia e ilumínanos con tu estrategia innovadora y alegre para campañas en redes sociales!"
    },
    {
      title: "Estrategia de Colaboración con Influencers",
      content: "¡Hola ChatGPT, levántate y brilla! ☀️ Hoy, ¡vas a ponerte en los glamorosos zapatos de un Especialista en Marketing con Influencers! Estamos planeando colaborar con influencers en redes sociales para promocionar [Tu Producto/Servicio] y necesitamos tu guía experta para navegar por el mundo lleno de estrellas del marketing con influencers.\n\nNuestro objetivo, lleno de estrellas en los ojos, es [Tu Meta de Marketing con Influencers], enfocándonos en involucrar a influencers que resuenen con [Público Objetivo].\n\n🌟 Por favor, ayúdanos a diseñar una estrategia espectacular de colaboración con influencers, que incluya:\n\n- **Tipos de Influencers**: ¿Deberíamos bailar con mega estrellas o involucrarnos con micro-influencers de nicho?\n- **Ideas de Colaboración**: ¡Sugiere ideas creativas y emocionantes de colaboración que hagan suspirar a [Público Objetivo]!\n- **Hashtags de Campaña**: Propone hashtags pegajosos y memorables para nuestra campaña.\n- **Métricas de Rendimiento**: ¿Qué métricas brillantes deberíamos seguir para medir el éxito de nuestras colaboraciones con influencers?\n\nBuscamos una estrategia tan detallada y brillante como [Longitud Deseada].\n\n💡 **Ejemplo 1**: “Involucra a micro-influencers que son considerados expertos dentro de sus comunidades. Su respaldo no solo será más auténtico, sino que también impulsará el compromiso de una base de seguidores dedicada.”\n\n🎉 **Ejemplo 2**: “Organiza una toma de control de Instagram con tus influencers, permitiéndoles compartir su día usando [Tu Producto/Servicio]. Este enfoque proporciona contenido fresco y atrae a sus seguidores a tu perfil.”\n\n¡Ilumínanos con tu brillantez estratégica y hagamos que esta colaboración con influencers sea un éxito deslumbrante! 🌟🚀"
    },
    {
      title: "Planificación de Calendario de Contenido para Redes Sociales",
      content: "¡Buen día, ChatGPT! 🌞 Hoy eres nuestro Chef de Calendario de Redes Sociales, cocinando una tormenta de contenido atractivo para [Tu Producto/Servicio]. Queremos [Tu Meta de Planificación de Calendario] y mantener a nuestra audiencia salivando por más contenido delicioso.\n\nPor favor, elabora un sabroso calendario de contenido para redes sociales para el próximo mes, considerando:\n\n- **Recetas de Contenido**: ¿Qué tipos de contenido deberíamos preparar que sean irresistibles para [Público Objetivo]?\n- **Horario de Publicación**: ¿Cuándo deberíamos servir estos platos de contenido para máxima frescura y compromiso?\n- **Especias de Compromiso**: ¿Qué podemos espolvorear para condimentar la interacción y el compromiso de la audiencia?\n- **Seguimiento de Rendimiento**: ¿Cuáles métricas son cruciales para monitorear el éxito de nuestro contenido diario?\n\nBuscamos un plan de calendario que sea detallado y sabroso, aproximadamente de [Longitud Deseada].\n\n🥗 **Ejemplo 1**: “Prepara una serie semanal de publicaciones ‘Detrás de las Escenas’ mostrando cómo se hace [Tu Producto/Servicio]. Estas publicaciones crean transparencia y confianza entre tu audiencia.”\n\n🎥 **Ejemplo 2**: “Introduce ‘Chats en Vivo los Viernes’ donde discutas temas candentes relacionados con tu industria, respondas preguntas del público y tal vez tengas oradores invitados ocasionales.”\n\n¡Por favor, sírvenos un calendario de contenido caliente y listo para implementar que mantenga nuestras páginas de redes sociales zumbando y apetitosas! ¡Buen provecho! 🌟"
    },
    {
      title: "Estrategia Maestra de Marketing en Facebook",
      content: "¡Hola ChatGPT! 🌞 ¡Hoy serás un Maestro de Marketing en Facebook! Nos estamos centrando en promocionar [Tu Producto/Servicio] en Facebook y nuestro objetivo es [Tu Meta de Marketing en Facebook]. Queremos cautivar a los usuarios de Facebook y construir una comunidad que respalde [Tu Producto/Servicio].\n\nPor favor, crea una estrategia fascinante que detalle:\n\n- **Tipos de Contenido en Facebook**: ¿Qué tipos de contenido atractivo deberíamos publicar en nuestra página de Facebook?\n- **Frecuencia de Publicaciones**: ¿Con qué frecuencia deberíamos publicar para mantener a nuestra audiencia interesada sin abrumarla?\n- **Técnicas de Compromiso**: ¿Puedes sugerir métodos para fomentar likes, compartidos y comentarios de nuestra audiencia en Facebook?\n- **Ideas de Anuncios**: ¿Algún concepto creativo para anuncios en Facebook que atraiga más seguidores y promueva [Tu Producto/Servicio]?\n\nEstamos buscando una estrategia que sea detallada y aplicable, aproximadamente de [Longitud Deseada].\n\n📘 **Ejemplo 1**: “Realiza sesiones semanales de Facebook Live mostrando las características y beneficios únicos de [Tu Producto/Servicio], incentivando a los espectadores a hacer preguntas e interactuar durante la transmisión.”\n\n🚀 **Ejemplo 2**: “Crea días temáticos como ‘Lunes de Motivación’ o ‘Viernes de Datos Divertidos’ para establecer consistencia y darle a tu audiencia algo que esperar cada semana.”\n\n¡Ilumina nuestro camino en Facebook con tu estrategia experta!"
    },
    {
      title: "Plan de Marketing en Instagram",
      content: "¡Hola ChatGPT! 📸 Ponte en el papel de un Gurú de Marketing en Instagram. Nos proponemos mostrar visualmente [Tu Producto/Servicio] a [Público Objetivo] en Instagram con el objetivo de [Tu Meta de Marketing en Instagram].\n\nElabora un vibrante plan de marketing en Instagram que incluya:\n\n- **Tipos de Contenido**: ¿Deberíamos enfocarnos en imágenes, historias, reels, IGTV o una mezcla de todos?\n- **Estrategia de Hashtags**: ¿Qué hashtags deberíamos usar para aumentar la visibilidad de nuestras publicaciones?\n- **Potenciadores de Compromiso**: ¿Técnicas para mejorar el compromiso y los seguidores?\n- **Ideas para Anuncios en Instagram**: ¿Conceptos creativos para anuncios en Instagram?\n\nBuscamos una estrategia detallada y llamativa de aproximadamente [Longitud Deseada].\n\n🌟 **Ejemplo 1**: “Utiliza las Historias de Instagram para publicar contenido detrás de cámaras, encuestas y actualizaciones rápidas sobre [Tu Producto/Servicio].”\n\n📲 **Ejemplo 2**: “Desarrolla una serie de Reels de Instagram que demuestren [Tu Producto/Servicio] en acción, destacando sus beneficios y características de una manera entretenida.”\n\n¡Desvela tu sabiduría en Instagram y guíanos hacia una campaña visualmente atractiva y exitosa!"
    },
    {
      title: "Plan de Marketing en Twitter",
      content: "¡Hola ChatGPT! 🐦 ¡Hoy, eres nuestro Experto en Marketing de Twitter! Queremos tuitear nuestro camino hacia los corazones de [Público Objetivo] con [Tu Producto/Servicio], con el objetivo de [Tu Meta de Marketing en Twitter].\n\nPor favor, redacta un plan de marketing espectacular para Twitter:\n\n- **Tipos de Tweets**: ¿Qué mezcla de contenido deberíamos tuitear?\n- **Horario de Tweets**: ¿Cuáles son los horarios y frecuencia ideales para tuitear?\n- **Estrategias de Compromiso**: ¿Cómo aumentamos retweets, likes y seguidores?\n- **Sugerencias para Anuncios en Twitter**: ¿Ideas para campañas de anuncios en Twitter atractivas?\n\nEsperamos un plan detallado y digno de ser tuiteado de aproximadamente [Longitud Deseada].\n\n🚀 **Ejemplo 1**: “Utiliza Encuestas de Twitter para involucrar a tu audiencia y recopilar opiniones sobre [Tu Producto/Servicio]. No solo aumenta el compromiso, sino que también proporciona insights valiosos.”\n\n💬 **Ejemplo 2**: “Organiza sesiones regulares de preguntas y respuestas o Chats en Twitter para fomentar la comunicación y construir una comunidad alrededor de tu marca.”\n\n¡Guíanos en Twitter con tu plan de marketing experto para Twitter!"
    },
    {
      title: "Estrategia de Marketing en LinkedIn",
      content: "¡Hola ChatGPT! 👔 Asume el papel de un Experto en Marketing de LinkedIn hoy. Nos enfocamos en [Tu Producto/Servicio], dirigido a profesionales y empresas con el objetivo de [Tu Meta de Marketing en LinkedIn].\n\nPor favor, formula una estrategia de marketing en LinkedIn profesional y atractiva:\n\n- **Tipos de Contenido para LinkedIn**: ¿Qué deberíamos publicar en LinkedIn para atraer y comprometer a una audiencia profesional?\n- **Horario de Publicaciones**: ¿Con qué frecuencia deberíamos compartir actualizaciones?\n- **Técnicas de Compromiso**: ¿Métodos para aumentar los likes, comentarios y compartidos de las publicaciones?\n- **Ideas para Anuncios en LinkedIn**: ¿Algún consejo para campañas de publicidad efectivas en LinkedIn?\n\nEsperamos una estrategia que sea tan pulida y profesional como [Longitud Deseada].\n\n💼 **Ejemplo 1**: “Comparte noticias e insights relacionados con la industria, posicionando tu marca como líder de pensamiento en tu campo.”\n\n🔗 **Ejemplo 2**: “Publica testimonios de clientes y estudios de caso para mostrar cómo las empresas se benefician de [Tu Producto/Servicio].”\n\n¡Comparte tu experiencia en LinkedIn y conectémonos con éxito!"
    },
    {
      title: "Propuesta de Marketing en TikTok",
      content: "¡Hola ChatGPT! 🕺 Hoy serás nuestro Virtuoso del Marketing en TikTok. Nuestro objetivo es crear videos atractivos para [Tu Producto/Servicio] que hagan que [Público Objetivo] se detenga y mire, con el objetivo de [Tu Meta de Marketing en TikTok].\n\nPor favor, crea una propuesta de marketing para TikTok:\n\n- **Ideas de Contenido para TikTok**: ¿Qué tipos de videos deberíamos crear? ¿Algún tema creativo o desafío que deberíamos iniciar?\n- **Frecuencia de Publicaciones**: ¿Con qué frecuencia deberíamos publicar para mantener al público de TikTok comprometido?\n- **Consejos de Compromiso**: ¿Cómo podemos maximizar los likes, compartidos y comentarios en los videos?\n- **Sugerencias para Anuncios en TikTok**: ¿Ideas creativas para anuncios en TikTok?\n\nEsperamos una estrategia que sea tan divertida y atractiva como [Longitud Deseada].\n\n🎥 **Ejemplo 1**: “Lanza un desafío con un hashtag de marca que anime a los usuarios a crear videos usando [Tu Producto/Servicio], extendiendo la conciencia de forma viral.”\n\n🚀 **Ejemplo 2**: “Crea videos divertidos e informativos ‘Cómo usar [Tu Producto/Servicio]’, demostrando su valor de una manera desenfadada.”\n\n¡Listos, preparados, TikTok! ¡Creemos una estrategia que nos haga famosos en TikTok!"
    }
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