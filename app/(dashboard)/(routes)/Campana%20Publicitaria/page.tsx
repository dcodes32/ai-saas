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
      title: "Prompt 1",
      content: `Estoy emocionado/a de colaborar contigo en el desarrollo de una campaña publicitaria cautivadora para presentar el último [producto] a nuestra audiencia objetivo. Como un experto [persona de ayuda - estratega de marketing, redactor creativo, especialista en publicidad], tus conocimientos serán fundamentales para crear una campaña atractiva que comunique eficazmente el valor del producto a nuestra audiencia.

      Para proporcionar contexto, nuestra audiencia objetivo está compuesta por [describe la audiencia - millennials aficionados a la tecnología, profesionales trabajadores, entusiastas del fitness, padres, etc.]. Están buscando una solución que se alinee con sus necesidades y aspiraciones, por lo que es esencial que nuestra campaña publicitaria resalte los principales beneficios del producto de manera convincente.
      
      Por favor, crea una campaña publicitaria que conste de tres anuncios diferentes. Cada anuncio debe utilizar una técnica diferente - [humor/urgencia/emoción] - para enfatizar los siguientes beneficios clave:
      
          [Beneficio 1]
          [Beneficio 2]
          [Beneficio 3]
      
      Mantén en mente estas pautas mientras desarrollas la campaña publicitaria:
      
          Resonancia con la audiencia: Crea anuncios que hablen directamente a los deseos y puntos problemáticos de nuestra audiencia objetivo.
          Propuesta de valor clara: Asegura que los beneficios se comuniquen de manera clara y concisa en cada anuncio.
          Incorporación de la técnica: Utiliza la técnica especificada ([humor/urgencia/emoción]) para mejorar el impacto del anuncio.
          Llamado a la acción: Incluye un llamado a la acción sólido y concreto que fomente la participación o la compra.
      
      Aquí tienes tres ejemplos de anuncios, cada uno utilizando una técnica diferente:
      
      Anuncio 1 - Humor:
      
      "Presentamos [Producto] - ¡Tu Solución Definitiva para [Beneficio 1]!
      
      ¿Cansado/a de [Problema 1]? Di adiós a esos molestos [Problema 2] con nuestro último [producto] ¡Nuestra solución innovadora te hará preguntarte por qué no lo descubriste antes! Prepárate para [Beneficio 1] como nunca antes, y sí, es tan fácil que hasta tu abuela puede hacerlo. ¡No esperes más, consigue el tuyo ahora y que empiece la diversión!"
      
      Anuncio 2 - Urgencia:
      
      "Última Oportunidad: ¡Experimenta [Beneficio 2] con [Producto] Hoy!
      
      El tiempo se agota para transformar tu [punto dolor] en algo del pasado. Con [Producto], desbloquearás [Beneficio 2] al instante que elevará el nivel de tu [audiencia]. ¡Pero date prisa, esta oferta exclusiva no esperará! Asegura tu [producto] ahora y aprovecha el [beneficio 2] que te mereces. ¡No te lo pierdas!"
      
      Anuncio 3 - Emoción:
      
      "Descubre [Beneficio 3] con [Producto]: Un Viaje hacia la Alegría y la Plenitud
      
      Imagina la alegría de [beneficio 3] inundando tu vida, trayendo nuevos horizontes e infinitas posibilidades. Con [Producto], este sueño se convierte en tu realidad. Abraza el poder transformador de [Beneficio 3] y eleva las experiencias de tu [audiencia] a un nivel completamente nuevo. Experimenta la emoción de la verdadera plenitud, comienza tu viaje hoy."
      
      Por favor, desarrolla los dos anuncios restantes, cada uno utilizando una técnica diferente ([humor/urgencia/emoción]) para resaltar los beneficios clave. Presenta los anuncios en un formato claro y organizado, y siéntete libre de agregar cualquier contexto o explicación adicional para cada anuncio.
      
      Nuestro objetivo es crear una campaña publicitaria que conecte profundamente con nuestra audiencia objetivo, comunique eficazmente el valor del producto y fomente la participación y las conversiones.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en diseñar una declaración de cierre poderosa para un anuncio centrado en [tema]. Como un experto [persona de ayuda - redactor de anuncios, estratega de mensajes, diseñador creativo], tus conocimientos desempeñarán un papel crucial en crear un cierre que deje un impacto duradero y promueva la acción.

      Para proporcionar contexto, el anuncio se centra en [tema], y queremos que la declaración de cierre motive a nuestra audiencia a tomar acción. El llamado a la acción ([CTA]) es un elemento clave que les insta a participar o tomar una decisión que se alinee con el objetivo del anuncio.
      
      Por favor, crea una declaración de cierre impactante que incorpore de manera fluida el llamado a la acción "[CTA]". Además, mejora el impacto del mensaje incluyendo tres emojis que conecten con el tono del anuncio y las emociones que buscamos evocar en nuestra audiencia.
      
      Aquí tienes una estructura de ejemplo para la declaración de cierre:
      
      "[Declaración de cierre que resalta los beneficios clave y genera emoción] [CTA]."
      
      Recuerda estas pautas al crear la declaración de cierre:
      
          Propuesta de valor: Resume los principales beneficios o el valor del anuncio en la declaración de cierre.
          Sentido de urgencia o emoción: Fomenta la acción utilizando un lenguaje que impulse a la audiencia a responder.
          Conexión emocional: Evoca emociones positivas que se alineen con el tono y el mensaje del anuncio.
          Relevancia: Asegúrate de que el cierre resuene con el tema y las emociones que el anuncio transmite.
          Llamado a la acción: Incluye el [CTA] especificado de manera clara y concisa.
      
      Para los emojis, elige tres que realcen el tono del anuncio y amplifiquen las emociones previstas. Siéntete libre de usar emojis que transmitan emoción, curiosidad, satisfacción o cualquier otro sentimiento relevante.
      
      Aquí tienes un ejemplo de la declaración de cierre con emojis:
      
      "[Declaración de cierre que resalta los beneficios clave y genera emoción] [CTA] ✨👏🌟"
      
      Por favor, desarrolla la declaración de cierre, incluyendo el [CTA] y tres emojis, en un formato que se alinee con las pautas proporcionadas anteriormente. Siéntete libre de brindar una breve explicación de tus elecciones de emojis para asegurarte de que conecten bien con el tono general del anuncio.
      
      Nuestro objetivo es crear una declaración de cierre que no solo refuerce el mensaje del anuncio, sino que también impulse a nuestra audiencia a tomar la acción deseada.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la generación de 20 titulares llamativos para nuestra próxima campaña publicitaria en Facebook que resalte el valor de nuestro [producto] ante nuestra audiencia objetivo. Como un experto [persona de ayuda - redactor de anuncios, estratega de marketing, pensador creativo], tus conocimientos son fundamentales para crear titulares que conecten con los intereses y necesidades de nuestra audiencia.

      Para proporcionar contexto, nuestra audiencia objetivo es [describe la audiencia - profesionales ocupados, entusiastas del fitness, amantes de la tecnología, padres, etc.], quienes buscan una solución que el [producto] puede proporcionar. Es esencial que cada titular capture la esencia del valor del producto y se dirija directamente a los deseos y puntos problemáticos de nuestra audiencia.
      
      Por favor, genera 20 titulares que cautiven la atención de nuestra audiencia y muestren el valor de nuestro [producto]. Mantén en mente estas pautas al crear los titulares:
      
          Propuesta de valor clara: Cada titular debe comunicar un beneficio o valor específico del [producto].
          Conexión emocional: Utiliza un lenguaje que conecte con las emociones, deseos y necesidades de nuestra audiencia.
          Curiosidad atractiva: Crea titulares que despierten curiosidad y animen a los lectores a aprender más.
          Claridad y concisión: Mantén los titulares concisos mientras transmites el valor del producto.
          Relevancia: Asegúrate de que los titulares se alineen con los intereses y preferencias de nuestra audiencia objetivo.
      
      Aquí tienes tres ejemplos de titulares de muestra para inspirar tu creatividad:
      
          "Transforma tus Mañanas con [Producto]: ¡Energiza tu Día!"
          "Di Adiós a [Punto Problemático] con [Producto]: ¡Experimenta Libertad de Nuevo!"
          "Desbloquea [Beneficio] al Instante: Presentamos [Producto] a [Audiencia]"
      
      Por favor, desarrolla los 17 titulares restantes que llamen la atención, basados en las pautas proporcionadas anteriormente. Una vez que estén completos, presenta los titulares en un formato organizado y siéntete libre de añadir cualquier contexto o explicación adicional para cada titular.
      
      Nuestro objetivo es crear una colección de titulares que no solo capten el interés de nuestra audiencia, sino que también comuniquen eficazmente el valor que nuestro [producto] aporta a sus vidas.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de trabajar juntos en crear una campaña convincente que muestre nuestro [producto/servicio] a posibles clientes y los guíe hacia una compra segura. Como un experto [persona de ayuda - redactor, estratega de marketing, experto en ventas], tus conocimientos son fundamentales para crear contenido que conecte con nuestra audiencia y comunique el valor que nuestro [producto/servicio] ofrece.

      Para proporcionar contexto, nuestra campaña se centra en resaltar los beneficios y características únicas de nuestro [producto/servicio]. Nuestro objetivo es conectarnos con posibles clientes, abordar sus necesidades y aspiraciones, y finalmente llevarlos a tomar acción y realizar una compra.
      
      Por favor, desarrolla una serie de titulares atractivos y textos que acompañen de manera efectiva el valor de nuestro [producto/servicio] y guíen a los posibles clientes a través del proceso de compra. Mantén en mente estas pautas:
      
          Titulares llamativos: Crea titulares que capturen la atención y despierten curiosidad.
          Propuesta de valor clara: Comunica de manera clara los beneficios y el valor que nuestro [producto/servicio] proporciona.
          Conexión emocional: Utiliza un lenguaje que conecte con las emociones y deseos de los posibles clientes.
          Abordar puntos problemáticos: Trata los posibles puntos problemáticos o desafíos que nuestra audiencia pueda tener.
          Viaje de compra guiado: Lleva a los posibles clientes gradualmente a través del contenido hasta el llamado a la acción.
          Llamado a la acción: Incluye un llamado a la acción sólido y concreto que anime al siguiente paso.
      
      Aquí tienes una estructura de ejemplo para el contenido de la campaña:
      
      Titular: [Titular llamativo que destaque un beneficio clave]
      Texto del Cuerpo: [Descripción convincente que amplíe sobre el beneficio, aborde los puntos problemáticos y guíe al lector hacia el siguiente paso]
      
      Por favor, desarrolla una serie de titulares y textos para la campaña. Apunta a crear un flujo cohesivo que lleve a los posibles clientes desde el primer contacto hasta considerar una compra. Siéntete libre de incluir secciones adicionales según sea necesario, como testimonios, características del producto/servicio u ofertas especiales.
      
      Nuestro objetivo es crear contenido que conecte profundamente con los posibles clientes, aborde sus necesidades y los guíe hacia la acción. Este contenido de la campaña desempeñará un papel fundamental en mostrar el valor de nuestro [producto/servicio].
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la generación de una lista integral de 20 posibles audiencias en Facebook que estarían altamente interesadas en nuestro [producto]. Como un experto [persona de ayuda - estratega de audiencia, especialista en marketing, experto en segmentación], tus conocimientos son fundamentales para identificar una variedad de audiencias que se alineen con el atractivo del producto.

      Para proporcionar contexto, nuestro [producto] satisface un conjunto específico de necesidades y deseos. Nuestro objetivo es identificar una variedad de audiencias que abarquen diferentes demografías, intereses y comportamientos, asegurando que nuestros esfuerzos de segmentación sean amplios y altamente relevantes.
      
      Por favor, genera una lista de 20 posibles audiencias en Facebook que se alineen con el atractivo del producto. Considera los siguientes factores:
      
          Demografía: Incluye audiencias de diferentes edades, géneros, ubicaciones, estados civiles, etc.
          Intereses: Identifica audiencias interesadas en temas relevantes, pasatiempos, actividades o industrias.
          Comportamientos: Dirige las audiencias según comportamientos en línea, historial de compras, uso de dispositivos, etc.
          Intereses de nicho: Piensa en audiencias con intereses específicos y de nicho que se relacionen con el producto.
          Audiencias personalizadas: Considera a clientes existentes, visitantes del sitio web o suscriptores de correo electrónico.
      
      Aquí tienes tres audiencias de muestra para inspirar tu creatividad:
      
          Jóvenes Profesionales en Áreas Urbanas interesados en Fitness y Bienestar
          Padres de Niños en Edad Preescolar interesados en Juguetes y Actividades Educativas
          Enthusiastas de la Tecnología interesados en Gadgets de Vanguardia e Innovaciones
      
      Por favor, desarrolla las 17 audiencias potenciales restantes en base a las pautas proporcionadas anteriormente. Presenta las audiencias en un formato claro y organizado, junto con una breve explicación de por qué cada audiencia es adecuada para nuestro [producto].
      
      Nuestro objetivo es crear una lista completa de audiencias que cubra una amplia gama de posibles clientes, optimizando nuestros esfuerzos de segmentación y asegurando un alcance y compromiso máximos.
      
      ¡Esperamos con ansias tu perspicaz aporte!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en crear tres copias únicas para anuncios en Facebook que complementen perfectamente el mensaje y el tema de nuestra página de destino proporcionada: [Contenido de la página de destino]. Como un experto [persona de ayuda - redactor de anuncios, estratega de marketing, pensador creativo], tus conocimientos son fundamentales para crear copias de anuncios que conecten con nuestra audiencia y se integren de manera fluida con la esencia de la página de destino.

      Para proporcionar contexto, la página de destino proporcionada [Contenido de la página de destino] presenta [describe el mensaje clave, propuesta de valor u oferta]. Queremos que las copias de los anuncios reflejen este mensaje y tema, asegurando una experiencia cohesiva para nuestra audiencia desde el anuncio hasta la página de destino.
      
      Por favor, desarrolla tres copias distintas para anuncios en Facebook que se alineen efectivamente con el mensaje y el tema de la página de destino proporcionada. Mantén estas pautas en mente al crear las copias de los anuncios:
      
          Mensaje consistente: Asegúrate de que las copias de los anuncios reflejen directamente el mensaje clave y la propuesta de valor de la página de destino.
          Lenguaje atractivo: Utiliza un lenguaje que capte la atención y anime a los usuarios a tomar acción.
          Propuesta de valor clara: Comunica los beneficios y el valor de interactuar con la oferta o el contenido.
          Llamado a la acción: Incluye un llamado a la acción sólido y concreto que invite a los usuarios a hacer clic.
          Tono cohesivo: Alinea el tono y el estilo de las copias de los anuncios con el tema y el ambiente de la página de destino.
      
      Aquí tienes una estructura de ejemplo para cada copia de anuncio:
      
      Copia de Anuncio:
      [Texto de la copia del anuncio que transmita el mensaje, el valor y el llamado a la acción de la página de destino]
      
      Por favor, desarrolla tres copias de anuncios distintas basadas en el contenido proporcionado de la página de destino. Cada copia de anuncio debe ofrecer un ángulo o perspectiva única mientras se mantiene en armonía con el mensaje de la página de destino.
      
      Nuestro objetivo es crear copias de anuncios que conecten de manera fluida el anuncio con la página de destino, incentivando a los usuarios a interactuar y explorar más en función del contenido que encontrarán en la página de destino.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en crear una cautivadora historia para nuestro anuncio del [producto] que se dirige de manera efectiva a [demográfico específico]. Como un experto [persona de ayuda - narrador de anuncios, estratega de marketing, pensador creativo], tus conocimientos son clave para crear una historia que resuene profundamente con las emociones y experiencias de la audiencia.

      Para proporcionar contexto, nuestro [producto] satisface a [demográfico específico] que buscan soluciones para sus [puntos problemáticos o deseos]. Nuestro objetivo es desarrollar una historia que no solo destaque los beneficios del producto, sino que también conecte con la audiencia a nivel personal.
      
      Por favor, crea una historia atractiva para el anuncio, incorporando escenarios y emociones relevantes que resuenen con [demográfico específico]. Mantén en mente estas pautas:
      
          Empatía: Comprende los puntos problemáticos, deseos y emociones de la audiencia.
          Escenarios de la vida real: Crea situaciones que la audiencia podría enfrentar y con las que puedan relacionarse.
          Enfoque en beneficios: Muestra cómo el [producto] aborda las necesidades de la audiencia o resuelve problemas.
          Conexión emocional: Despierta emociones que se alineen con las experiencias de la audiencia.
          Resultado positivo: Destaca la transformación positiva que ofrece el [producto] a la vida de la audiencia.
      
      Aquí tienes una estructura de ejemplo para la historia del anuncio:
      
      Historia del Anuncio:
      [Comienza con un escenario relevante que capte la atención y emociones de la audiencia. Introduce el problema o deseo que están enfrentando.]
      [Transiciona a cómo el [producto] entra en escena como una solución. Resalta sus beneficios clave y cómo aborda el problema o satisface el deseo.]
      [Concluye con el resultado positivo que el [producto] brinda a la vida de la audiencia. Crea una conexión emocional y fomenta la acción.]
      
      Por favor, desarrolla una historia de anuncio atractiva basada en las pautas proporcionadas. Queremos que la historia sea una narrativa convincente que resuene profundamente con [demográfico específico] y los anime a interactuar con el [producto].
      
      Nuestro objetivo es crear un anuncio que no solo promueva el producto, sino que también hable directamente a las experiencias y aspiraciones de la audiencia.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en diseñar un cautivador anuncio de carrusel que muestre la evolución de nuestro [producto]. Como un experto [persona de ayuda - diseñador de anuncios, narrador visual, marketer creativo], tus conocimientos serán invaluables para crear una secuencia atractiva que resuene con los espectadores y los lleve en un viaje a través de la transformación del producto.

      Para proporcionar contexto, nuestro [producto] ha experimentado cambios y mejoras significativas con el tiempo. Nuestro objetivo es crear un anuncio de carrusel que comunique de manera efectiva esta evolución a través de una combinación de imágenes y texto conciso.
      
      Por favor, diseña el anuncio de carrusel con una secuencia que cuente una historia convincente sobre la evolución del producto. Mantén en mente estas pautas:
      
          Selección de imágenes: Escoge imágenes que representen claramente cada etapa de la evolución del producto.
          Texto conciso: Utiliza leyendas cortas e impactantes para complementar cada imagen.
          Progresión de la historia: Asegura que el carrusel fluya sin problemas de una etapa a la siguiente.
          Resaltar mejoras: Enfatiza cómo el producto ha evolucionado para satisfacer mejor a los clientes.
          Llamado a la acción: Incluye un llamado a la acción sólido y concreto en el último slide.
      
      Aquí tienes una estructura de ejemplo para el anuncio de carrusel:
      
      Anuncio de Carrusel:
      
          [Imagen de la versión inicial del producto]
          [Texto conciso que resalte el punto de partida y la necesidad de mejora]
      
          [Imagen que muestra el primer conjunto de mejoras del producto]
          [Texto conciso que describa las mejoras y los beneficios para los clientes]
      
          [Imagen que refleje la siguiente fase de desarrollo]
          [Texto conciso que destaque características o avances adicionales]
      
          [Imagen que ilustre la versión actual del producto]
          [Texto conciso que resalte las características de vanguardia y los principales beneficios]
      
          [Imagen que muestre el producto en uso por clientes satisfechos]
          [Texto conciso que anime a los espectadores a explorar más el producto]
      
      Por favor, diseña el anuncio de carrusel siguiendo las pautas proporcionadas, asegurándote de que cada slide cuente una parte de la historia de evolución del producto. La secuencia debe ser atractiva y visualmente llamativa, capturando la atención de los espectadores y despertando su curiosidad.
      
      Nuestro objetivo es crear un anuncio de carrusel que no solo muestre la evolución del producto, sino que también genere interés y anime a los espectadores a tomar acción.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en crear un anuncio impactante que presente nuestro [producto] como la solución definitiva a un problema común experimentado por [audiencia]. Como un experto [persona de ayuda - creador de anuncios, estratega de marketing, solucionador de problemas], tus conocimientos son esenciales para crear un anuncio que resuene con las necesidades de la audiencia y muestre el poder transformador de nuestro [producto].

      Para proporcionar contexto, nuestro [producto] aborda un desafío bien conocido enfrentado por [audiencia]. Nuestro objetivo es desarrollar un anuncio que demuestre vívidamente cómo nuestro [producto] puede generar un cambio y mejora positivos.
      
      Por favor, crea el anuncio con un escenario de antes y después que ilustre de manera efectiva la transformación que ofrece nuestro [producto]. Mantén en mente estas pautas:
      
          Introducción del problema: Comienza introduciendo el problema común enfrentado por [audiencia].
          Escenario relacionable: Crea un escenario que resuene con las experiencias de la audiencia.
          Introducción de la solución: Presenta nuestro [producto] como la solución al problema.
          Antes y después: Muestra un contraste claro entre la situación antes y después de usar el [producto].
          Destacar beneficios: Resalta los beneficios clave y mejoras que trae nuestro [producto].
          Conexión emocional: Despierta emociones que se alineen con el viaje y aspiraciones de la audiencia.
      
      Aquí tienes una estructura de ejemplo para el anuncio:
      
      Escenario del Anuncio:
      [Comienza con un escenario de problema relacionable que la audiencia suele enfrentar.]
      [Transiciona a introducir nuestro [producto] como la solución a este problema.]
      [Presenta el escenario de antes y después: describe la situación antes de usar el [producto], seguido de la transformación después de su uso.]
      [Destaca los beneficios, mejoras o cambios positivos que trae el [producto].]
      [Despierta emociones al enfatizar cómo el [producto] puede cambiar la experiencia de la audiencia.]
      
      Por favor, crea el anuncio siguiendo las pautas y estructura proporcionadas. El escenario debe ser relatable, atractivo y visualmente llamativo, mostrando el impacto tangible de nuestro [producto] en la vida de la audiencia.
      
      Nuestro objetivo es crear un anuncio que no solo aborde los puntos problemáticos de la audiencia, sino que también despierte su interés y los motive a explorar más nuestro [producto].
      
      ¡Esperamos con ansias tu aporte creativo`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en crear un texto publicitario persuasivo que utilice de manera efectiva la prueba social para promocionar nuestro [producto]. Como un experto [persona de ayuda - redactor de anuncios, estratega de marketing, generador de confianza], tus conocimientos son vitales para crear un texto que resuene con la audiencia y construya credibilidad a través de experiencias reales de los clientes.

      Para proporcionar contexto, queremos mostrar el impacto positivo que nuestro [producto] ha tenido en la vida de los clientes al destacar sus testimonios, calificaciones o historias de éxito. Nuestro objetivo es crear un texto publicitario que no solo capte la atención, sino que también establezca confianza y credibilidad.
      
      Por favor, compón un texto publicitario que incorpore de manera fluida la prueba social para promocionar nuestro [producto]. Mantén en mente estas pautas:
      
          Testimonios de clientes: Destaca citas de clientes satisfechos compartiendo sus experiencias con el [producto].
          Calificaciones o reseñas: Resalta las calificaciones de estrellas o fragmentos de reseñas positivas que enfaticen el valor del [producto].
          Historias de éxito: Comparte ejemplos reales de clientes que han logrado sus objetivos o resuelto sus problemas con el [producto].
          Beneficios relacionables: Conecta la prueba social con los beneficios clave y el valor del [producto].
          Impacto emocional: Despierta emociones al enfatizar los resultados y transformaciones positivas.
      
      Aquí tienes una estructura de ejemplo para el texto publicitario:
      
      Texto Publicitario:
      [Comienza con un titular convincente que capte la atención e incluya un beneficio.]
      [Incorpora un testimonio de cliente, calificación o historia de éxito que refuerce el impacto del [producto].]
      [Conecta la prueba social con las características y beneficios del [producto], enfatizando la relevancia.]
      [Incluye una llamada a la acción que anime a la audiencia a dar el siguiente paso.]
      
      Por favor, desarrolla el texto publicitario siguiendo las pautas proporcionadas. El texto debe ser conciso, atractivo y resaltar de manera efectiva la credibilidad y confiabilidad de nuestro [producto] a través de la lente de experiencias reales de los clientes.
      
      Nuestro objetivo es crear un texto publicitario que no solo resuene con la audiencia, sino que también los convenza a través de la validación de la prueba social.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en diseñar una cautivadora campaña de anuncios en Facebook para nuestra [venta/evento próximo]. Nuestro objetivo es generar anticipación y urgencia entre nuestra audiencia al mostrar ofertas irresistibles de tiempo limitado y promociones exclusivas. Como un experto [persona de ayuda - diseñador de campañas publicitarias, estratega de marketing, generador de urgencia], tus conocimientos serán clave para crear una campaña que impulse la acción y fomente la participación.

      Para proporcionar contexto, nuestra [venta/evento próximo] presenta una oportunidad única para que nuestra audiencia disfrute de ofertas exclusivas y promociones de tiempo limitado en nuestros productos/servicios. Queremos diseñar una campaña de anuncios que no solo genere emoción, sino que también motive a los usuarios a tomar acción antes de que la oferta expire.
      
      Por favor, diseña la campaña de anuncios en Facebook con un texto publicitario que construya de manera efectiva anticipación y urgencia a través de ofertas de tiempo limitado y promociones exclusivas. Mantén en mente estas pautas:
      
          Visuales llamativos: Utiliza imágenes atractivas que representen los productos/servicios en oferta.
          Destacar las ofertas: Muestra las ofertas de tiempo limitado y promociones exclusivas en el texto publicitario.
          Enfatizar la urgencia: Comunica que las ofertas tienen un plazo limitado, creando una sensación de urgencia.
          Llamada a la acción: Incluye una llamada a la acción fuerte y accionable que dirija a los usuarios a tomar medidas.
          Basado en beneficios: Resalta el valor de los productos/servicios que los usuarios recibirán.
      
      Aquí tienes una estructura de ejemplo para la campaña de anuncios:
      
      Campaña de Anuncios en Facebook:
      Anuncio 1:
      [Utiliza un titular llamativo para presentar la venta/evento próximo y sus ofertas exclusivas.]
      [Destaca la naturaleza de tiempo limitado de las ofertas y enfatiza los beneficios.]
      [Incluye una llamada a la acción que anime a los usuarios a obtener más información o explorar las ofertas.]
      
      Anuncio 2:
      [Presenta una oferta específica de tiempo limitado o promoción exclusiva con una imagen llamativa.]
      [Resalta los beneficios clave que los usuarios disfrutarán y crea urgencia en torno a la expiración de la oferta.]
      [Incluye una llamada a la acción convincente que motive a los usuarios a aprovechar la oferta.]
      
      Anuncio 3:
      [Muestra una variedad de promociones exclusivas o ofertas de tiempo limitado en formato de carrusel.]
      [Incorpora un texto publicitario conciso para cada oferta, resaltando el valor y la urgencia.]
      [Anima a los usuarios a deslizar el carrusel para descubrir las ofertas y tomar medidas.]
      
      Por favor, diseña la campaña de anuncios en Facebook siguiendo las pautas proporcionadas. La campaña debe captar visualmente la atención, comunicar el valor de las ofertas y crear una sensación de urgencia que impulse a los usuarios a tomar medidas de inmediato.
      
      Nuestro objetivo es crear una campaña de anuncios que genere anticipación, emoción y un fuerte deseo de participar en las ofertas de tiempo limitado y promociones exclusivas.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la creación de variaciones de anuncios que utilicen el poder de la narración para mostrar el viaje transformador de un cliente que se benefició de nuestro [producto]. Nuestro objetivo es crear narrativas que resuenen profundamente con nuestra audiencia objetivo, permitiéndoles conectarse con las experiencias de clientes reales. Como un experto [persona de ayuda - narrador, creador de anuncios, conector emocional], tus conocimientos serán fundamentales para dar vida a estas narrativas.

      Para proporcionar contexto, queremos destacar la historia real de un cliente cuya vida fue impactada positivamente por nuestro [producto]. El objetivo es crear variaciones de anuncios que no solo involucren a la audiencia, sino que también construyan una conexión emocional a través de experiencias relacionables.
      
      Por favor, desarrolla variaciones de anuncios que utilicen la narración para resaltar el viaje de un cliente que se benefició de nuestro [producto]. Mantén en mente estas pautas:
      
          Autenticidad: Crea una historia genuina y relacionable que represente con precisión la experiencia del cliente.
          Resonancia emocional: Evoke emociones que se alineen con los desafíos, éxitos y transformaciones.
          Beneficios claros: Destaca cómo el [producto] desempeñó un papel en resolver los problemas del cliente o alcanzar objetivos.
          Escenario relacionable: Elige una situación a la que la audiencia objetivo pueda relacionarse.
          Llamada a la acción: Incluye una llamada a la acción fuerte y accionable que anime a la participación.
      
      Aquí tienes una estructura de ejemplo para las variaciones de anuncios:
      
      Variación de Anuncio 1:
      [Comienza con un titular cautivador que atraiga a la audiencia hacia la historia.]
      [Relata los desafíos y luchas iniciales del cliente.]
      [Destaca el papel fundamental que el [producto] desempeñó en abordar estos desafíos.]
      [Describe los resultados positivos y la transformación que experimentó el cliente.]
      [Concluye con una llamada a la acción que invite a la audiencia a obtener más información.]
      
      Variación de Anuncio 2:
      [Inicia con un titular impactante que presente el viaje del cliente.]
      [Comparte las experiencias y desafíos relacionables del cliente antes de descubrir el [producto].]
      [Enfatiza las formas en que el [producto] tuvo un impacto significativo en la vida del cliente.]
      [Transmite los sentimientos de satisfacción, éxito y empoderamiento del cliente.]
      [Termina con una sólida llamada a la acción que invite a la audiencia a explorar beneficios similares.]
      
      Variación de Anuncio 3:
      [Empieza con un titular que genere intriga y capture la esencia del viaje del cliente.]
      [Relata una historia concisa y emocional que muestre las luchas y aspiraciones del cliente.]
      [Detalla cómo el [producto] se convirtió en un cambio de juego, conduciendo a un cambio y resultados positivos.]
      [Destaca la alegría y satisfacción del cliente con la transformación lograda por el [producto].]
      [Finaliza con una llamada a la acción convincente que anime a la participación.]
      
      Por favor, desarrolla estas variaciones de anuncios siguiendo las pautas proporcionadas. Las historias deben ser convincentes, relacionables y emocionalmente resonantes, creando una fuerte conexión con nuestra audiencia objetivo a través de las experiencias de un cliente real.
      
      Nuestro objetivo es crear variaciones de anuncios que no solo inspiren y atraigan, sino que también motiven a la audiencia a tomar medidas y explorar los beneficios de nuestro [producto].
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la creación de un anuncio impactante que muestre las características únicas de nuestro [producto] y su alineación directa con las necesidades específicas de nuestra [audiencia]. Nuestro objetivo es crear un texto publicitario que no solo capte la atención, sino que también comunique el valor y la relevancia del [producto] para nuestra audiencia objetivo. Como un experto [persona de ayuda - redactor de anuncios, comunicador de productos, conector de audiencia], tus conocimientos serán fundamentales para crear un anuncio convincente e informativo.

      Para proporcionar contexto, nuestro [producto] cuenta con características distintivas que lo diferencian de la competencia. Queremos resaltar estas características de una manera que resuene con las necesidades únicas de nuestra [audiencia]. El objetivo es crear un anuncio que no solo eduque a la audiencia, sino que también despierte su interés en explorar más a fondo el [producto].
      
      Por favor, crea un anuncio que se centre en las características únicas de nuestro [producto] y demuestre cómo se adaptan a las necesidades específicas de nuestra [audiencia]. Mantén en mente estas pautas:
      
          Destacar las características: Elige al menos tres características únicas del [producto] que aporten valor a la [audiencia].
          Necesidades de la audiencia: Identifica claramente las necesidades o desafíos específicos que enfrenta nuestra [audiencia].
          Comunicación de beneficios: Explica cómo cada característica aborda directamente una necesidad particular de la [audiencia].
          Conciso y atractivo: Crea un texto publicitario claro, conciso y que capte la atención de la audiencia.
          Llamada a la acción: Incluye una llamada a la acción sólida y accionable que anime a los usuarios a obtener más información.
      
      Aquí tienes una estructura de ejemplo para el anuncio:
      
      Texto del Anuncio:
      [Comienza con un titular que capte la atención y resalte la relevancia del [producto] para la audiencia.]
      [Característica 1: Describe la primera característica única y explica cómo aborda una necesidad específica de la audiencia.]
      [Característica 2: Detalla la segunda característica distintiva y su relevancia directa para los desafíos de la audiencia.]
      [Característica 3: Resalta la tercera característica única y demuestra cómo satisface una necesidad específica de la audiencia.]
      [Concluye con una llamada a la acción que anime a los usuarios a explorar el [producto] por sí mismos.]
      
      Por favor, crea el texto del anuncio siguiendo las pautas proporcionadas. El anuncio debe comunicar eficazmente el valor del [producto] al enfatizar sus características únicas y cómo se adaptan a las necesidades específicas de nuestra [audiencia].
      
      Nuestro objetivo es crear un anuncio que no solo informe, sino que también despierte la curiosidad y anime a la audiencia a tomar medidas para aprender más sobre los beneficios que ofrece nuestro [producto].
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la creación de un texto publicitario que resalte el poderoso concepto de "facilitar la vida" a través del uso de nuestro [producto]. Nuestro objetivo es crear un texto publicitario que no solo resuene con la audiencia, sino que también demuestre vívidamente cómo nuestro [producto] simplifica tareas y mejora la conveniencia en varios escenarios. Como un experto [persona de ayuda - redactor de anuncios, comunicador de conveniencia, solucionador de problemas], tus conocimientos desempeñarán un papel vital en la transmisión efectiva de este mensaje.

      Para proporcionar contexto, nuestro [producto] está diseñado para simplificar tareas y elevar la conveniencia en la vida diaria. Queremos mostrar esta propuesta de valor a través de escenarios relacionables que resuenen con las experiencias de la audiencia. El objetivo es crear un anuncio que no solo capte la atención, sino que también resuene emocionalmente al mostrar el impacto positivo del [producto].
      
      Por favor, crea un texto publicitario que gire en torno al concepto de "facilitar la vida" con el uso de nuestro [producto]. Mantén en mente estas pautas:
      
          Enfoque en la conveniencia: Centra el texto publicitario en cómo el [producto] simplifica tareas y mejora la conveniencia.
          Escenarios relacionables: Presenta escenarios que la audiencia pueda relacionar fácilmente con su vida diaria.
          Comunicación de beneficios: Explica claramente cómo el [producto] mejora cada escenario al simplificar los procesos.
          Resonancia emocional: Evoca emociones que se alineen con el alivio, la facilidad y la satisfacción que ofrece el [producto].
          Llamada a la acción: Incluye una llamada a la acción sólida y accionable que anime a los usuarios a explorar el [producto].
      
      Aquí tienes una estructura de ejemplo para el anuncio:
      
      Texto del Anuncio:
      [Comienza con un titular que capte la atención y resalte el concepto de "facilitar la vida".]
      [Escenario 1: Describe una situación relacionable en la que el [producto] simplifica una tarea o proceso común.]
      [Explica cómo el [producto] agiliza el proceso, ahorrando tiempo y esfuerzo al usuario.]
      [Evoca emociones de alivio y satisfacción que acompañan al uso del [producto].]
      [Escenario 2: Presenta otro escenario en el que el [producto] mejora la conveniencia y simplifica tareas.]
      [Destaca los beneficios y mejoras específicos que aporta el [producto] a este escenario.]
      [Concluye con una llamada a la acción convincente que anime a los usuarios a experimentar la conveniencia de nuestro [producto].]
      
      Por favor, crea el texto del anuncio siguiendo las pautas proporcionadas. El anuncio debe transmitir vívidamente la idea de "facilitar la vida" a través de escenarios relacionables que muestren los beneficios tangibles y la conveniencia que ofrece nuestro [producto].
      
      Nuestro objetivo es crear un anuncio que no solo comunique el valor del [producto], sino que también toque una fibra emocional al demostrar su impacto positivo en la vida de los usuarios.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la creación de un guion convincente para un video corto e impactante que muestre de manera efectiva nuestro [producto]. Nuestro objetivo es transmitir un mensaje claro y atractivo que capte la atención de los espectadores y los motive a tomar acción. Como un experto [persona de ayuda - redactor de guiones para videos, narrador de historias, creador de llamadas a la acción], tus conocimientos serán fundamentales en la creación de un anuncio de video que resuene con la audiencia.

      Para proporcionar contexto, nuestro [producto] cuenta con características únicas que queremos destacar en el anuncio de video. Buscamos transmitir el valor del [producto] de manera que inspire interés y anime a los espectadores a explorar más. El objetivo es crear un guion que no solo informe, sino que también genere conexión emocional y fomente la acción.
      
      Por favor, redacta un guion para la narración del video que muestre de manera efectiva nuestro [producto] y anime a los espectadores a tomar acción. Mantén en mente estas pautas:
      
          Inicio llamativo: Comienza con un gancho convincente que capture la atención de los espectadores desde el principio.
          Propuesta de valor clara: Comunica claramente los beneficios clave y características del [producto].
          Escenarios relacionables: Incluye situaciones que resuenen con las necesidades o desafíos de los espectadores.
          Conexión emocional: Evoca emociones que se alineen con los resultados positivos que ofrece el [producto].
          Llamada a la acción: Concluye con una llamada a la acción sólida y accionable que anime a los espectadores a dar el siguiente paso.
      
      Aquí tienes una estructura de ejemplo para el guion:
      
      Guion del Anuncio de Video:
      [Plano de apertura con imágenes llamativas.]
      Narrador: "En un mundo acelerado, donde cada momento cuenta..."
      [Destaca las características únicas y beneficios del [producto].]
      Narrador: "Te presentamos [producto] - tu solución para [beneficio clave 1], [beneficio clave 2] y [beneficio clave 3]."
      [Muestra escenarios relacionables donde el [producto] aporta valor.]
      Narrador: "Imagina realizar sin esfuerzo [escenario 1], [escenario 2] y [escenario 3] con [producto]."
      [Evoqua emociones y muestra el impacto transformador del [producto].]
      Narrador: "Experimenta la libertad, comodidad y alegría de [producto]."
      [Termina con una llamada a la acción visualmente impactante.]
      Narrador: "¡No te lo pierdas! Da el primer paso hacia [beneficios] hoy."
      [Incluye texto en pantalla con información de contacto o un enlace al sitio web para la acción.]
      
      Por favor, redacta el guion siguiendo las pautas proporcionadas. El guion debe transmitir de manera sucinta la esencia de nuestro [producto] e inspirar a los espectadores a tomar acción.
      
      Nuestro objetivo es crear un anuncio de video que no solo informe, sino que también genere conexión emocional y motive a los espectadores a explorar los beneficios que ofrece nuestro [producto].
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la creación de un texto publicitario que resalte la exclusividad y el prestigio inigualables que conlleva ser propietario de nuestro [producto]. Nuestro objetivo es crear un texto que no solo capture la esencia del lujo, sino que también comunique el privilegio único que nuestro [producto] otorga a sus propietarios. Como un experto [persona de ayuda - redactor de textos publicitarios, comunicador de lujo, creador de exclusividad], tus conocimientos serán fundamentales en la creación de un texto publicitario convincente y aspiracional.

      Para proporcionar contexto, nuestro [producto] es sinónimo de un estilo de vida elegante y refinado. Queremos transmitir esta sensación de prestigio a través de un lenguaje que pinte una imagen de exclusividad y lujo. El objetivo es crear un texto publicitario que no solo despierte el deseo, sino que también posicione el [producto] como un símbolo de distinción.
      
      Por favor, desarrolla el texto publicitario para la campaña que enfatice la exclusividad y el prestigio asociados con ser propietario de nuestro [producto]. Mantén en mente estas pautas:
      
          Lenguaje de exclusividad: Utiliza palabras y frases que evocan un sentido de privilegio y distinción.
          Elegancia y refinamiento: Comunica la sofisticación y el lujo que representa el [producto].
          Propuesta de valor única: Destaca lo que distingue al [producto] y lo convierte en un objeto codiciado.
          Tono aspiracional: Crea un texto que despierte aspiración y deseo de formar parte de un club exclusivo.
          Llamada a la acción: Incluye una llamada a la acción sólida y accionable que invite a los usuarios a experimentar este lujo.
      
      Aquí tienes una estructura de ejemplo para el texto publicitario:
      
      Texto Publicitario:
      [Comienza con un titular que emane exclusividad y capture la esencia del lujo.]
      "Experimenta la Elegancia Redefinida: Presentamos el Exquisito [Producto]."
      [Destaca la singularidad y el prestigio asociados con el [producto].]
      "Sumérgete en el mundo de [producto], donde la exclusividad y el lujo convergen en armonía."
      [Despierta el deseo describiendo la experiencia de ser propietario y usar el [producto].]
      "Sumérgete en un mundo de refinamiento inigualable, donde cada toque y mirada resuenan con distinción."
      [Transmite la exclusividad al enfatizar la disponibilidad limitada o la membresía.]
      "Reservado para unos pocos discernidores, el [producto] encapsula un estilo de vida de prestigio y privilegio."
      [Concluye con una llamada a la acción convincente que invite a los usuarios a formar parte de esta experiencia exclusiva.]
      "Reclama tu lugar entre la élite. Eleva tu vida con el [producto] hoy."
      
      Por favor, desarrolla el texto publicitario siguiendo las pautas proporcionadas. El texto debe transportar a los lectores a un mundo de lujo, exclusividad y aspiración, posicionando nuestro [producto] como la personificación de un estilo de vida privilegiado.
      
      Nuestro objetivo es crear un texto publicitario que no solo comunique la esencia del prestigio, sino que también despierte el deseo de formar parte de una experiencia exclusiva y lujosa.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la creación de un anuncio cautivador en Facebook que aproveche la curiosidad para interactuar con la audiencia. Nuestro objetivo es crear un texto publicitario que no solo despierte la curiosidad, sino que también incite a los usuarios a explorar más al proporcionar una pista intrigante relacionada con nuestro [producto]. Como un experto [persona de ayuda - redactor de textos publicitarios, generador de curiosidad, creador de interacción], tus conocimientos serán esenciales en la creación de un texto publicitario que capte la atención y anime a la interacción.

      Para proporcionar contexto, queremos crear un anuncio que despierte el interés de la audiencia a través de una pregunta reflexiva relacionada con nuestro [producto]. La pregunta debe formularse de manera que incite a los usuarios a buscar la respuesta, que se insinúa en el texto publicitario. El objetivo es crear un texto publicitario que no solo genere curiosidad, sino que también impulse a los usuarios a tomar acción.
      
      Por favor, crea un anuncio en Facebook que utilice la curiosidad para atraer a la audiencia. Mantén en mente estas pautas:
      
          Pregunta reflexiva: Formula una pregunta relacionada con el [producto] que despierte curiosidad.
          Pista intrigante: Proporciona una pista sutil en el texto publicitario que aluda a la respuesta.
          Lenguaje atractivo: Utiliza palabras que inciten a los usuarios a buscar la respuesta interactuando más.
          Valor claro: Comunica el valor o beneficio asociado con saber la respuesta.
          Llamada a la acción: Incluye una llamada a la acción sólida y accionable que anime a los usuarios a descubrir más.
      
      Aquí tienes una estructura de ejemplo para el anuncio:
      
      Texto Publicitario en Facebook:
      [Comienza con un titular que formule la pregunta reflexiva y capte la curiosidad.]
      "¿Alguna vez te has preguntado cómo [acción relacionada con el producto] sin esfuerzo?"
      [Utiliza el texto publicitario para proporcionar una pista sutil que aluda a la respuesta.]
      "Descubre el secreto para realizar [acción relacionada con el producto] sin problemas y experimenta un nuevo nivel de [beneficio]."
      [Crea interacción invitando a los usuarios a explorar más.]
      "La respuesta está en nuestro [producto], diseñado para hacer que [acción relacionada con el producto] sea pan comido."
      [Concluye con una llamada a la acción que anime a los usuarios a descubrir más y encontrar la respuesta.]
      "¿Listo/a para revelar la solución? Descubre el poder de [producto] hoy."
      
      Por favor, crea el anuncio en Facebook siguiendo las pautas proporcionadas. El texto publicitario debe aprovechar con éxito la curiosidad para captar el interés de la audiencia y motivarlos a explorar los beneficios de nuestro [producto].
      
      Nuestro objetivo es crear un anuncio que no solo genere curiosidad, sino que también motive a los usuarios a dar el siguiente paso hacia descubrir la respuesta interactuando con nuestro [producto].
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la creación de variaciones de anuncios que exploren el aspecto emocional de usar nuestro [producto]. Nuestro objetivo es crear copias de anuncios que no solo destaquen los beneficios funcionales del [producto], sino que también conecten emocionalmente con la audiencia al mostrar cómo puede evocar sentimientos de felicidad, nostalgia o emoción. Como un experto [persona de ayuda - narrador emocional, creador de conexiones, comunicador de sentimientos], tus conocimientos jugarán un papel crucial en transmitir estas emociones de manera efectiva.

      Para proporcionar contexto, nuestro [producto] tiene el poder de evocar emociones intensas en la vida de nuestra audiencia. Queremos resaltar estas conexiones emocionales a través de copias de anuncios que pinten una imagen vívida de la alegría, nostalgia o emoción que el [producto] puede traer. El objetivo es crear variaciones de anuncios que no solo informen, sino que también toquen los corazones de nuestra audiencia.
      
      Por favor, crea variaciones de anuncios que resalten el aspecto emocional de usar nuestro [producto]. Mantén en mente estas pautas:
      
          Enfoque centrado en la emoción: Crea copias de anuncios que se centren en emociones como la felicidad, la nostalgia o la emoción.
          Escenarios relacionables: Describe escenarios donde el [producto] desempeña un papel en evocar estas emociones.
          Lenguaje descriptivo: Utiliza un lenguaje expresivo y vívido para transmitir la experiencia emocional.
          Resonancia con la audiencia: Conecta las emociones con las aspiraciones y deseos de la audiencia objetivo.
          Llamada a la acción: Incluye una llamada a la acción sólida y accionable que anime a los usuarios a experimentar estas emociones con nuestro [producto].
      
      Aquí tienes una estructura de ejemplo para las variaciones de anuncios:
      
      Variación de Anuncio 1:
      [Comienza con un titular que capture el aspecto emocional y resuene con la audiencia.]
      "Redescubre la Alegría: Experimenta la Felicidad con [Producto]."
      [Describe un escenario donde el [producto] aporta felicidad y alegría.]
      "Imagina las sonrisas y las risas que [producto] aporta a los momentos cotidianos."
      
      Variación de Anuncio 2:
      [Comienza con un titular que despierte nostalgia y atraiga las emociones de la audiencia.]
      "Viaje al Pasado: Revive Recuerdos con [Producto]."
      [Comparte un escenario donde el [producto] evoca nostalgia y recuerdos entrañables.]
      "Revive la magia de los recuerdos queridos con [producto] a tu lado."
      
      Variación de Anuncio 3:
      [Comienza con un titular que despierte emoción y anticipación.]
      "Libera la Emoción: Embárcate en Aventuras Emocionantes con [Producto]."
      [Describe un escenario donde el [producto] agrega emoción y anticipación.]
      "Aprovecha la adrenalina y la emoción que [producto] aporta a cada aventura."
      
      Por favor, crea las variaciones de anuncios siguiendo las pautas proporcionadas. Las copias de los anuncios deben transportar a los lectores a experiencias emocionales que nuestro [producto] puede aportar a sus vidas, creando una conexión más allá de la funcionalidad.
      
      Nuestro objetivo es crear variaciones de anuncios que no solo informen, sino que también resuenen con la audiencia en un nivel emocional, destacando los sentimientos de felicidad, nostalgia o emoción que nuestro [producto] puede evocar.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en el diseño de una serie de anuncios que destaquen la increíble versatilidad de nuestro [producto]. Nuestro objetivo es crear una colección de anuncios que no solo muestren las diversas aplicaciones del [producto], sino que también resuenen con diferentes aspectos del estilo de vida de nuestra audiencia objetivo. Como un experto [persona de ayuda - diseñador de anuncios, comunicador de versatilidad, conectador de estilos de vida], tus conocimientos serán fundamentales para crear anuncios visualmente atractivos y cautivadores.

      Para proporcionar contexto, nuestro [producto] es una solución versátil que puede servir para múltiples propósitos en diversos entornos. Queremos enfatizar esta versatilidad ilustrando cómo el [producto] encaja perfectamente en diferentes aspectos del estilo de vida de nuestra audiencia. El objetivo es crear una serie de anuncios que no solo informen, sino que también inspiren a nuestra audiencia a imaginar cómo el [producto] puede mejorar sus experiencias diarias.
      
      Por favor, diseña una serie de anuncios que muestren la versatilidad de nuestro [producto]. Mantén en mente estas pautas:
      
          Escenarios diversos: Ilustra múltiples formas en que el [producto] puede ser utilizado en diferentes entornos.
          Conexión con el estilo de vida: Atiende a varios aspectos del estilo de vida de nuestra audiencia objetivo (por ejemplo, hogar, trabajo, ocio).
          Representación visual: Utiliza imágenes que demuestren de manera efectiva el [producto] en acción.
          Enfoque en la solución: Destaca cómo el [producto] resuelve necesidades o desafíos específicos en cada escenario.
          Llamada a la acción: Incluye una llamada a la acción sólida y accionable que anime a los usuarios a explorar más.
      
      Aquí tienes una estructura de ejemplo para la serie de anuncios:
      
      Anuncio 1 - Entorno del Hogar:
      [Muestra una imagen del [producto] siendo utilizado en un entorno hogareño.]
      "Transforma Tu Hogar: Descubre cómo el [producto] añade comodidad y estilo a tu espacio vital."
      
      Anuncio 2 - Entorno de Trabajo:
      [Muestra una imagen del [producto] en un contexto relacionado con el trabajo.]
      "Eleva Tu Espacio de Trabajo: Observa cómo el [producto] aumenta la productividad y la organización."
      
      Anuncio 3 - Entorno de Ocio:
      [Muestra una imagen del [producto] mejorando actividades de ocio o al aire libre.]
      "La Aventura te Espera: Explora las innumerables formas en que el [producto] mejora tus experiencias al aire libre."
      
      Anuncio 4 - Entorno Social:
      [Muestra una imagen del [producto] siendo utilizado durante reuniones sociales.]
      "Momentos Inolvidables: Comparte alegría y conexión con el [producto] en tus reuniones."
      
      Por favor, diseña la serie de anuncios siguiendo las pautas proporcionadas. Las imágenes y el texto deben trabajar juntos para mostrar la versatilidad de nuestro [producto] en diferentes entornos y aspectos del estilo de vida de nuestra audiencia.
      
      Nuestro objetivo es crear una serie de anuncios que no solo demuestren las diversas aplicaciones del [producto], sino que también inspiren a nuestra audiencia a imaginar cómo puede encajar perfectamente en sus vidas diarias.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Prompt 2",
      content: `Estoy emocionado/a de colaborar contigo en la creación de copias de anuncios que subrayen el significativo impacto ambiental y social de elegir nuestro [producto]. Nuestro objetivo es crear copias que no solo resalten las características de sostenibilidad del [producto], sino que también comuniquen cómo cada compra contribuye a una causa mayor, marcando una diferencia positiva. Como un experto [persona de ayuda - comunicador de impacto, defensor de la sostenibilidad, narrador impulsado por un propósito], tus conocimientos serán fundamentales para crear copias de anuncios que resuenen con consumidores conscientes.

      Para proporcionar contexto, nuestro [producto] es más que un simple producto, es una elección que se alinea con la sostenibilidad y contribuye a un bien mayor. Queremos transmitir este mensaje a través de copias de anuncios que muestren las características respetuosas con el medio ambiente del [producto] y el impacto positivo que tiene en el medio ambiente y la sociedad. El objetivo es crear copias de anuncios que no solo informen, sino que también inspiren a los consumidores a tomar decisiones con propósito.
      
      Por favor, compón copias de anuncios que enfaticen el impacto ambiental y social de elegir nuestro [producto]. Mantén en mente estas pautas:
      
          Enfoque en la sostenibilidad: Resalta las características ecológicas y sostenibles del [producto].
          Impacto positivo: Comunica cómo cada compra contribuye directamente a una causa mayor.
          Empatía y propósito: Utiliza un lenguaje que apela al deseo de los consumidores de marcar una diferencia positiva.
          Propuesta de valor clara: Explica cómo elegir el [producto] se alinea con el consumo consciente.
          Llamada a la acción: Incluye una llamada a la acción sólida y accionable que anime a los usuarios a realizar una compra con propósito.
      
      Aquí tienes una estructura de ejemplo para las copias de los anuncios:
      
      Copia del Anuncio:
      [Comienza con un titular que capture el impacto ambiental y social del [producto].]
      "Haz que cada elección cuente: Elige [Producto] para un futuro más verde."
      [Resalta las características sostenibles del [producto].]
      "Experimenta la innovación del [producto], diseñado con materiales respetuosos con el medio ambiente y prácticas sostenibles."
      [Explica el impacto positivo de cada compra en el medio ambiente y la sociedad.]
      "Con cada compra, contribuyes a iniciativas de reforestación y apoyas a comunidades locales."
      [Evoque empatía e inspire decisiones impulsadas por un propósito.]
      "Empodera el cambio positivo y marca un impacto duradero al elegir [producto]."
      [Concluye con una llamada a la acción que invita a los usuarios a unirse al movimiento.]
      "Únete a nosotros en la creación de un mundo más sostenible. Elige [producto] hoy."
      
      Por favor, compón la copia del anuncio siguiendo las pautas proporcionadas. La copia debe transmitir de manera efectiva cómo elegir nuestro [producto] no solo beneficia a los consumidores, sino que también realiza una contribución positiva a causas ambientales y sociales.
      
      Nuestro objetivo es crear copias de anuncios que no solo informen, sino que también inspiren a los consumidores a tomar decisiones conscientes que se alineen con la sostenibilidad y el propósito.
      
      ¡Esperamos con ansias tu aporte impactante!`
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
        alert('Please fill in all input fields before submitting.');
      }
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert("Text copied to clipboard");
        })
        .catch((error) => {
          alert("Error copying text to clipboard");
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
      <h1 className="text-3xl font-bold text-black mb-2">Descriptive Prompts</h1>
      <p className="text-sm text-gray-600 mb-4">Choose a Prompt</p>
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
                    <div>{`Enter ${variable}:`}</div>
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
                  Submit
                </button>
                <button
                  className="w-1/3 ml-2 px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  onClick={() => copyToClipboard(generatedPrompt || '')}
                >
                  {copySuccess ? <span className="text-blue-500">Text copied to clipboard</span> : 'Copy Text'}
                </button>
                <button
                  className="w-1/3 ml-2 px-2 py-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                  onClick={handleReset}
                >
                  Reset
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