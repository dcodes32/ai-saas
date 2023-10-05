"use client";
import React, { useState, useEffect }  from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PromptType = 'regular' | 'super';

interface Prompt {
  type: PromptType;
  text: string;
}

const regularPrompts: string[] = [
  "Explica la importancia de las redes sociales en una estrategia de marketing.",
  "Cómo crear contenido atractivo para tu audiencia.",
  "Estrategias para optimizar campañas de anuncios en línea.",
  // ... add more regular prompts as needed
];

const superPrompts: string[] = [
  "\"¡Hola PromoAdvisor! Estoy emocionado/a de trabajar contigo para entender profundamente la importancia de las redes sociales en el marketing moderno. Actuarás como un Analista de Marketing en Redes Sociales experto para guiarme en cómo y por qué las redes sociales son cruciales en nuestra estrategia de marketing. Tienes un amplio conocimiento sobre marketing digital y gestión de redes sociales, esenciales para esta conversación. Mi empresa está en el sector de la tecnología y estamos intentando mejorar nuestra presencia en LinkedIn. Por favor, proporciona un análisis detallado explicando por qué las redes sociales son indispensables, cómo influyen en la percepción de la marca y cómo podemos utilizarlas para mejorar nuestro engagement con la audiencia. La respuesta ideal sería aproximadamente de 500 palabras, explicando de manera clara y precisa. \"Ejemplo de lo que espero: \"Las redes sociales son esenciales porque ofrecen un espacio donde las marcas pueden interactuar directamente con los clientes, creando relaciones fuertes y promoviendo la lealtad. Permiten segmentación precisa para entregar mensajes a audiencias específicas, maximizando así el retorno de inversión en marketing. ¡Espero tu análisis detallado y gracias por tu ayuda!\"",
  "\"¡Hola ContentCreatorExpert! Hoy quiero que actúes como mi Especialista en Creación de Contenido, necesito tu guía experta en idear y producir contenido que resuene y enganche a mi público objetivo en YouTube. Con tu vasto conocimiento en creación de contenido, psicología del consumidor y tendencias actuales, quiero que me ayudes a generar un plan estratégico. Mi objetivo principal es aumentar el engagement y las suscripciones al canal. Proporcióname un plan de contenido que incluya ideas creativas, formatos recomendados y mejores prácticas para la creación de contenido en YouTube. Un ejemplo sería: \"Considera desarrollar series de videos tutoriales o webinars, ya que el contenido educativo visual tiene alto engagement. Emplea storytelling y crea publicaciones interactivas y encuestas para fomentar la participación activa de la audiencia.\" ¡Estoy ansioso por recibir tus recomendaciones creativas e innovadoras!\"",
  "\"¡Saludos AdOptimizer! Hoy te necesito como mi Estratega de Campañas Publicitarias en Línea. Estoy ejecutando campañas en Google Ads con un presupuesto mensual de $2000 y quiero optimizar estas para obtener mejores resultados. Dada tu experiencia en publicidad digital, análisis de datos y optimización de conversiones, espero que me proporciones estrategias detalladas para mejorar la tasa de clics (CTR), reducir el costo por clic (CPC) y aumentar las conversiones en mis campañas. Ejemplo de estrategias esperadas: \"Realiza pruebas A/B constantemente para identificar qué anuncios rinden mejor. Utiliza la segmentación avanzada para dirigir tus anuncios a los grupos demográficos más relevantes y ajusta las pujas según el rendimiento de cada segmento de audiencia. Revisa y optimiza las palabras clave y las páginas de destino regularmente.\" ¡Espero con interés tus estrategias avanzadas y detalladas para mejorar la eficiencia de mis campañas publicitarias en línea!\"",
  // ... add more super prompts as needed
];

export const LandingContent = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [typedText, setTypedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (selectedPrompt && selectedPrompt.type === 'super') {
      const textArray = selectedPrompt.text.split('');
      const typingTimer = setInterval(() => {
        if (currentIndex < textArray.length) {
          setTypedText((prevText) => prevText + textArray[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(typingTimer);
        }
      }, 30);

      return () => clearInterval(typingTimer);
    }
  }, [selectedPrompt, currentIndex]);

  const handlePromptClick = (type: PromptType, text: string) => {
    setSelectedPrompt({ type, text });
    setTypedText('');
    setCurrentIndex(0);
  };

  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Prompts para Marketing
      </h2>
      <table className="w-full mb-10">
        <tbody>
          {regularPrompts.map((prompt, index) => (
            <tr key={index}>
              <td className="w-1/2 p-4 border border-gray-400">
                <div
                  className="bg-[#192339] text-white p-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handlePromptClick("regular", prompt)}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Prompt Basico
                  </h3>
                  <p className="text-lg">{prompt}</p>
                </div>
              </td>
              <td className="w-1/2 p-4 border border-gray-400">
                <div
                  className={`cursor-pointer ${
                    selectedPrompt && selectedPrompt.type === "super" && selectedPrompt.text === superPrompts[index]
                      ? "bg-[#192339] text-white"
                      : "bg-[#0E1A2A] text-gray-400 hover:bg-[#192339] hover:text-white"
                  } p-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105`}
                  onClick={() => handlePromptClick("super", superPrompts[index])}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    SuperPrompt
                  </h3>
                  <p className="text-lg">
                    {selectedPrompt && selectedPrompt.type === "super" && selectedPrompt.text === superPrompts[index] 
                      ? typedText 
                      : "Haz click aqui para ver un SuperPrompt"}
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl font-bold text-white">Tutorial:</h3>
      <p className="text-lg text-white">
        ¡Descubre cómo usar esta aplicación!
      </p>
      <div className="mt-10">
        <a 
          href="https://www.youtube.com/watch?v=1o0iW_lVYjY" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ver Tutorial
        </a>
      </div>
    </div>
  );
};