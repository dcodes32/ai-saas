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
      title: "Anuncio de Características Vanguardistas para un Producto Innovador",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de colaborar contigo en crear un anuncio que destaque las características vanguardistas del [producto], atendiendo a las exigentes necesidades de una audiencia pionera en tendencias. Nuestro objetivo es crear un anuncio que no solo informe, sino que también cautive a la audiencia al mostrar cómo las características del [producto] encarnan la innovación y la modernidad. Como un experto [persona de ayuda - comunicador de innovación, conector de pioneros en tendencias, involucrador de audiencia], tus conocimientos serán cruciales para crear un anuncio que resuene con las aspiraciones de mentalidad avanzada de la audiencia.

      Para proporcionar contexto, el [producto] presume de características de última generación que satisfacen las necesidades de individuos pioneros en tendencias que exigen innovación y modernidad. Queremos crear un anuncio que destaque estas características, elaborando al menos tres aspectos distintos que encarnen la esencia de la tecnología vanguardista. El objetivo es crear un anuncio que no solo informe, sino que también intrigue y atraiga el deseo de la audiencia por lo último y lo mejor.
      
      Por favor, crea un anuncio que destaque las características vanguardistas del [producto] que satisfacen las exigentes necesidades de una audiencia pionera en tendencias. Mantén en mente estas pautas:
      
          Destacar las características: Detalla al menos tres características distintas del [producto].
          Énfasis en la innovación: Encarna la naturaleza innovadora y moderna de las características.
          Alineación con la audiencia: Aborda las necesidades y aspiraciones exigentes de la audiencia pionera en tendencias.
          Lenguaje persuasivo: Utiliza un lenguaje convincente que subraye el valor y los beneficios de las características.
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que fomente la exploración.
      
      Aquí tienes una estructura de muestra para el anuncio:
      
      Anuncio:
      [Comienza con un titular impactante que capte la atención de la audiencia pionera en tendencias.]
      "Eleva Tu Estilo de Vida con el [Producto] Definitivo: Innovación más allá de la Imaginación."
      
      [Característica 1:]
      [Detalla la primera característica vanguardista, enfatizando su innovación y modernidad.]
      "Presentamos la Característica X: Una Revolución en [Capacidad]. Experimenta el siguiente nivel de [experiencia] que establece nuevos estándares para la innovación."
      
      [Característica 2:]
      [Detalla la segunda característica distintiva, mostrando su naturaleza de vanguardia.]
      "Descubre la Característica Y: Donde la Imaginación se Encuentra con la Realidad. Sumérgete en un mundo de [beneficio] que desafía expectativas y abraza la modernidad."
      
      [Característica 3:]
      [Detalla la tercera característica que encarna la esencia vanguardista.]
      "Desvelamos la Característica Z: Redefiniendo [Función]. Acepta el futuro con [característica] que rompe barreras y empodera a los pioneros en tendencias."
      
      [Cierre:]
      [Concluye con un llamado a la acción convincente que invite a la audiencia a explorar el producto.]
      "Experimenta el pináculo de la innovación. Eleva tu estilo de vida con el [producto] vanguardista."
      
      Por favor, crea el anuncio siguiendo las pautas proporcionadas. El anuncio no solo debe informar, sino también cautivar y resonar con el deseo de la audiencia pionera en tendencias por la tecnología de vanguardia.
      
      Nuestro objetivo es crear un anuncio que destaque las características vanguardistas del [producto], atrayendo a las exigentes necesidades de individuos pioneros en tendencias que buscan innovación y modernidad.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Anuncio de Avance sin Esfuerzo con un Producto Transformador",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de colaborar contigo en crear un anuncio persuasivo centrado en el concepto de "avance sin esfuerzo" a través del uso del [producto]. Nuestro objetivo es crear un anuncio que no solo informe, sino que también resuene con el deseo de la audiencia por un progreso fluido y una conveniencia amplificada. Como un experto [persona de ayuda - mejorador de progreso, comunicador de conveniencia, involucrador de audiencia], tus conocimientos serán fundamentales para crear un anuncio que hable a las aspiraciones de la audiencia por un avance sin problemas.

      Para proporcionar contexto, el [producto] ofrece la promesa de un avance sin esfuerzo, integrándose perfectamente en rutinas progresivas para amplificar la conveniencia y propulsar a las personas hacia sus metas. Queremos crear un anuncio que muestre escenarios donde el [producto] mejora sin esfuerzo las rutinas diarias, haciendo que el progreso se sienta natural y conveniente. El objetivo es crear un anuncio que no solo informe, sino que también atraiga el deseo de la audiencia por eficiencia y crecimiento sin esfuerzo.
      
      Por favor, compón un anuncio persuasivo centrado en el concepto de "avance sin esfuerzo" a través del uso del [producto]. Mantén en mente estas pautas:
      
          Énfasis en el concepto: Centra el anuncio en la idea de "avance sin esfuerzo".
          Pintar escenarios: Describe situaciones donde el [producto] se integra perfectamente en rutinas progresivas.
          Amplificación de conveniencia: Resalta cómo el [producto] amplifica la conveniencia y mejora la vida diaria.
          Conexión con aspiraciones: Conecta con el deseo de la audiencia por un progreso fluido y crecimiento.
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que fomente la participación.
      
      Aquí tienes una estructura de muestra para el anuncio:
      
      Anuncio:
      [Comienza con un titular impactante que introduzca el concepto de "avance sin esfuerzo."]
      "Desbloquea el Avance sin Esfuerzo: Impulsa Tu Progreso de Manera Fluida con el [Producto]!"
      
      [Escenario 1:]
      [Pinta un escenario donde el producto se integre sin problemas en una rutina diaria, amplificando la conveniencia.]
      "Imagina que [actividad] se vuelve un juego de niños con el [producto]. Integra sin esfuerzo [beneficio del producto] en tu rutina, avanzando en tu progreso sin perder el ritmo."
      
      [Escenario 2:]
      [Detalla otro escenario que muestre el aspecto de mejora de conveniencia del producto.]
      "Acoje el futuro de [experiencia] con el [producto]. Transiciónate sin problemas de [actividad] a [actividad], experimentando un avance real con cada paso."
      
      [Escenario 3:]
      [Elabora en un escenario que refleje las aspiraciones de la audiencia por un progreso fluido.]
      "Eleva tu camino hacia [meta] con el [producto]. La integración sin esfuerzo significa que no hay más barreras para tus aspiraciones, solo avance puro."
      
      [Cierre:]
      [Concluye con un llamado a la acción sólido que invite a la audiencia a explorar el producto.]
      "Haz que el progreso se sienta natural. Acoje el avance sin esfuerzo con el [producto]. ¡Eleva tu rutina hoy mismo!"
      
      Por favor, compón el anuncio siguiendo las pautas proporcionadas. El anuncio no solo debe informar, sino también resonar con el deseo de la audiencia por un progreso sin esfuerzo y una conveniencia amplificada.
      
      Nuestro objetivo es crear un anuncio centrado en el concepto de "avance sin esfuerzo", mostrando escenarios donde el [producto] se integra sin esfuerzo en rutinas progresivas para amplificar la conveniencia y facilitar el crecimiento.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: " Anuncio de Video Visualizando el Impacto Vanguardista de un Producto",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de colaborar contigo en imaginar un atractivo anuncio de video que visualice el impacto de vanguardia del [producto]. Nuestro objetivo es crear un guión que no solo informe, sino que también cautive a los espectadores al mostrar la innovación del [producto] de una manera que los emocione y los anime a abrazar el futuro. Como un experto [persona de ayuda - narrador visionario, visualizador de innovación, involucrador de audiencia], tus ideas creativas desempeñarán un papel fundamental en crear un guión que resuene con el deseo de la audiencia por soluciones visionarias.

      Para proporcionar contexto, el [producto] representa el pináculo de la innovación, ofreciendo soluciones que revolucionan la forma en que las personas interactúan con la tecnología. Queremos crear un anuncio de video que comunique magistralmente esta innovación, utilizando imágenes y narración para pintar una imagen vívida del impacto del [producto]. El objetivo es crear un guión que no solo informe, sino que también emocione a los espectadores, dejándolos ansiosos por ser parte del futuro que el [producto] representa.
      
      Por favor, imagina un atractivo anuncio de video que visualice el impacto de vanguardia del [producto] y escribe un guión que comunique magistralmente su innovación. Mantén en mente estas pautas:
      
          Narración visual: Utiliza un lenguaje descriptivo para crear una narrativa visual.
          Énfasis en la innovación: Destaca las características y capacidades innovadoras del [producto].
          Emoción por el futuro: Infunde el guión con anticipación y emoción por lo que está por venir.
          Conexión con aspiraciones: Conéctate con el deseo de la audiencia por soluciones visionarias.
          Llamado a la acción: Incluye un llamado a la acción convincente que anime a los espectadores a obtener más información.
      
      Aquí tienes una estructura de muestra para el guión del video:
      
      Guion del Video:
      [Comienza con una apertura llamativa que establezca el tono para la innovación por venir.]
      [Narrador o Voz en Off:]
      "Bienvenidos al futuro, donde la innovación no es solo un concepto, es una realidad."
      
      [Secuencia Visual 1:]
      [Describe una escena visualmente cautivadora que muestre la naturaleza de vanguardia del producto.]
      "He aquí el [producto], una creación que desafía la convención y redefine lo que es posible."
      
      [Narrador o Voz en Off:]
      "En este mundo de posibilidades ilimitadas, el [producto] se encuentra a la vanguardia de la innovación."
      
      [Secuencia Visual 2:]
      [Pinta una escena que destaque una característica innovadora clave del producto.]
      "Imagina [característica] al alcance de tus dedos, integrándose perfectamente en tu vida y mejorando cada momento."
      
      [Narrador o Voz en Off:]
      "El futuro ha llegado y se encarna en el [producto]."
      
      [Secuencia Visual 3:]
      [Describe una escena que muestre el impacto transformador que el producto tiene en las rutinas diarias.]
      "Desde [actividad] hasta [actividad], el [producto] se adapta sin esfuerzo, haciendo que el progreso y la conveniencia sean sinónimos."
      
      [Narrador o Voz en Off:]
      "¿Estás listo para abrazar el futuro? Es hora de experimentar el poder del [producto]."
      
      [Cierre:]
      [Concluye con un llamado a la acción convincente que invite a los espectadores a obtener más información sobre el producto.]
      "Únete al viaje hacia la innovación. Descubre el [producto] y desbloquea las posibilidades ilimitadas que te esperan."
      
      Por favor, imagina el atractivo anuncio de video siguiendo las pautas proporcionadas. El guión no solo debe informar, sino también cautivar y emocionar a los espectadores, dejándolos ansiosos por ser parte del futuro visionario que el [producto] representa.
      
      Nuestro objetivo es crear un guión que comunique magistralmente la innovación del [producto] y deje a los espectadores emocionados por ser parte del futuro visionario que ofrece.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: " Serie de Anuncios Comunicando el Prestigio y la Exclusividad de un Producto Revolucionario",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de colaborar contigo en diseñar una serie de anuncios que comuniquen sin esfuerzo el prestigio y la exclusividad de ser dueño del revolucionario [producto]. Nuestro objetivo es crear anuncios que no solo informen, sino que también sumerjan a la audiencia en un aura de distinción selecta, capturando la esencia de ser dueño del [producto] como un privilegio exclusivo. Como un experto [persona de ayuda - comunicador de lujo, realzador de exclusividad, involucrador de audiencia], tus ideas creativas serán fundamentales para crear anuncios que resuenen con el deseo de la audiencia por experiencias premium.

      Para proporcionar contexto, el [producto] encarna una nueva era de innovación y excelencia, reservada para unos pocos selectos que aprecian y exigen lo mejor. Queremos crear una serie de anuncios que comuniquen magistralmente este sentido de prestigio y exclusividad, utilizando un lenguaje evocador para transmitir la experiencia elevada de ser dueño del [producto]. El objetivo es crear anuncios que no solo informen, sino que también sumerjan a la audiencia en un mundo de distinción selecta.
      
      Por favor, diseña una serie de anuncios que comuniquen sin esfuerzo el prestigio y la exclusividad de ser dueño del revolucionario [producto]. Mantén en mente estas pautas:
      
          Representación de prestigio: Utiliza un lenguaje evocador para transmitir un sentido de lujo y distinción.
          Aura exclusiva: Sumerge a la audiencia en la experiencia distinguida de ser dueño del [producto].
          Beneficios premium: Destaca los beneficios únicos que vienen con ser dueño del [producto].
          Conexión con aspiraciones: Conéctate con el deseo de la audiencia por experiencias elevadas.
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que invite a la participación.
      
      Aquí tienes una estructura de muestra para la serie de anuncios:
      
      Anuncio 1:
      [Comienza con un titular llamativo que establezca el tono de prestigio y exclusividad.]
      "Eleva Tu Mundo: Experimenta el Prestigio Inigualable del [Producto]."
      
      [Texto del Cuerpo:]
      "Adéntrate en un reino de exclusividad que solo unos pocos selectos tienen el privilegio de abrazar. El [producto] no es solo una posesión; es una encarnación de distinción refinada. Sumérgete en un mundo donde el lujo se encuentra con la innovación."
      
      [Cierre:]
      [Concluye con un llamado a la acción convincente que invite a la audiencia a obtener más información sobre el producto.]
      "Posee el futuro del prestigio. Descubre la experiencia inigualable del [producto]."
      
      Anuncio 2:
      [Título:]
      "Indulge en la Excelencia: Presentando el [Producto] – Donde el Prestigio No Conoce Límites."
      
      [Texto del Cuerpo:]
      "Cada detalle del [producto] está meticulosamente diseñado para redefinir la opulencia. Abraza el atractivo de ser dueño de una obra maestra que capta la atención y comanda admiración. Experimenta el epítome de la distinción."
      
      [Cierre:]
      [Llamado a la acción:]
      "Eleva tu estilo de vida. Revela la elegancia del [producto] y sumérgete en un mundo de exclusividad."
      
      Anuncio 3:
      [Título:]
      "Experimenta el Verdadero Lujo: Descubre los Territorios Inexplorados del Prestigio [Producto]."
      
      [Texto del Cuerpo:]
      "Solo un círculo selecto puede reclamar la propiedad del [producto]. Su aura exclusiva resuena con aquellos que valoran la sofisticación y el estilo. Sumérgete en el mundo de la exclusividad, donde cada interacción se eleva."
      
      [Cierre:]
      [Llamado a la acción:]
      "Posee lo extraordinario. Abraza el pináculo de la exclusividad con el [producto]."
      
      Por favor, diseña la serie de anuncios siguiendo las pautas proporcionadas. Los anuncios no solo deben informar, sino también cautivar y sumergir a la audiencia en el prestigio y la exclusividad de ser dueño del revolucionario [producto].
      
      Nuestro objetivo es crear una serie de anuncios que comunique sin esfuerzo la distinción selecta de ser dueño del [producto], resuenen con el deseo de la audiencia por experiencias premium.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Anuncio Impulsado por la Curiosidad para un Producto Transformador",
      content: `Estoy emocionado/a de colaborar contigo en crear un anuncio en Facebook impulsado por la curiosidad, que plantea una pregunta intrigante sobre el potencial del [producto]. Nuestro objetivo es diseñar un anuncio que no solo capte la atención, sino que también estimule la curiosidad de la audiencia al plantear una pregunta que invite a la reflexión. Como un experto [persona de ayuda - cultivador de la curiosidad, planteador de preguntas, involucrador de audiencia], tus ideas serán fundamentales para crear un anuncio que incite a la audiencia a explorar más a fondo.

      Para proporcionar contexto, el [producto] representa un salto adelante en innovación, ofreciendo soluciones que tienen el potencial de transformar la forma en que las personas interactúan con la tecnología. Queremos crear un anuncio que despierte la curiosidad al plantear una pregunta sobre las posibilidades que tiene el [producto], insinuando su impacto transformador. El objetivo es crear un anuncio que no solo capture la atención, sino que también estimule la curiosidad de la audiencia, animándolos a buscar respuestas.
      
      Por favor, crea un anuncio en Facebook impulsado por la curiosidad que plantee una pregunta intrigante sobre el potencial del [producto]. Mantén en mente estas pautas:
      
          Pregunta intrigante: Crea una pregunta que despierte el interés de la audiencia.
          Insinuación de solución: Da pistas que lleven a la audiencia a considerar el [producto] como una solución.
          Estimulación de la curiosidad: Utiliza un lenguaje que estimule el deseo de la audiencia de aprender más.
          Tono que invita a la reflexión: Plantea una pregunta que despierte la contemplación y el compromiso.
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que invite a la exploración.
      
      Aquí tienes una estructura de muestra para el anuncio:
      
      Anuncio:
      [Comienza con un titular llamativo que plantee la pregunta intrigante.]
      "¿Y si tu [problema] pudiera resolverse con el [producto]?"
      
      [Texto del Cuerpo:]
      "Imagina un mundo donde [problema] ya no sea una barrera. ¿Y si la innovación de vanguardia fuera la clave para desbloquear nuevas posibilidades? Descubre cómo el [producto] podría redefinir tu [experiencia]."
      
      [Cierre:]
      [Concluye con un llamado a la acción convincente que invite a la audiencia a obtener más información sobre la solución.]
      "¿Curioso/a? Sumérgete en el futuro de la [solución de problemas]. Explora el potencial del [producto] hoy."
      
      Por favor, crea el anuncio impulsado por la curiosidad siguiendo las pautas proporcionadas. El anuncio no solo debe captar la atención, sino también estimular la curiosidad de la audiencia, animándolos a explorar el potencial del revolucionario [producto].
      
      Nuestro objetivo es crear un anuncio que plantee una pregunta intrigante sobre el potencial del [producto], insinúe su impacto transformador y estimule la curiosidad.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Campaña Publicitaria para un Producto Visionario",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de colaborar contigo en crear variaciones de anuncios que amplifiquen la resonancia emocional de usar el [producto] visionario. Nuestro objetivo es crear anuncios que no solo informen, sino que también se conecten con las experiencias emocionales que el [producto] brinda a la vida de las personas visionarias. Como un experto [persona de ayuda - amplificador de emociones, creador de sentimientos, involucrador de audiencia], tus ideas creativas serán vitales para crear anuncios que resuenen profundamente con los sentimientos y aspiraciones de la audiencia.

      Para proporcionar contexto, el [producto] representa un salto adelante en innovación, ofreciendo soluciones que tienen el potencial de crear conexiones emocionales significativas. Queremos crear variaciones de anuncios que capturen la resonancia emocional de usar el [producto], articulando cómo suscita emociones como la emoción, la nostalgia o la inspiración. El objetivo es crear anuncios que no solo informen, sino que también evocan una poderosa respuesta emocional en la audiencia.
      
      Por favor, crea variaciones de anuncios que magnifiquen la resonancia emocional de usar el [producto] visionario. Mantén en mente estas pautas:
      
          Amplificación emocional: Intensifica emociones como la emoción, la nostalgia o la inspiración.
          Narrativa de mirada al futuro: Crea una historia que resuene con las personas que abrazan el futuro.
          Conexión personal: Ilustra escenarios en los que el [producto] realza las experiencias emocionales.
          Encarnación de aspiraciones: Presenta el [producto] como un medio para cumplir deseos aspiracionales.
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que invite al compromiso emocional.
      
      Aquí tienes una estructura de muestra para las variaciones de anuncios:
      
      Variación de Anuncio 1: Emoción:
      [Comienza con un titular llamativo que conecte con la emoción de la emoción.]
      "Experimenta la Emoción: Desata la Emoción con el [Producto] Visionario."
      
      [Texto del Cuerpo:]
      "Descubre el [producto] – un catalizador para momentos emocionantes que desafían la convención. Siente la adrenalina al abrazar la innovación de vanguardia y forjar tu camino hacia el futuro."
      
      [Cierre:]
      [Concluye con un llamado a la acción convincente que invite a la audiencia a experimentar la emoción con el producto.]
      "¿Listo/a para la emoción? Sumérgete en el futuro con el [producto]."
      
      Variación de Anuncio 2: Nostalgia:
      [Título:]
      "Redescubre el Pasado: El [Producto] Despierta Nostalgia e Inspiración."
      
      [Texto del Cuerpo:]
      "Cada interacción con el [producto] se convierte en un viaje al pasado, infundiendo el presente con nostalgia e inspiración. Abraza la innovación mientras aprecias los momentos que te moldearon."
      
      [Cierre:]
      [Llamado a la acción:]
      "Experimenta nostalgia e inspiración. Abraza el futuro con el [producto]."
      
      Variación de Anuncio 3: Inspiración:
      [Título:]
      "Desvela Tu Potencial: Encuentra Inspiración con el [Producto] Visionario."
      
      [Texto del Cuerpo:]
      "El [producto] no es solo una herramienta; es una fuente de inspiración que impulsa tu camino hacia adelante. Deja que la innovación te empodere para alcanzar nuevas alturas, inspirando a quienes te rodean."
      
      [Cierre:]
      [Llamado a la acción:]
      "¿Listo/a para inspirarte? Desbloquea tu potencial con el [producto]."
      
      Por favor, crea las variaciones de anuncios siguiendo las pautas proporcionadas. Los anuncios no solo deben informar, sino también evocar resonancia emocional dentro de la audiencia, capturando cómo el [producto] visionario suscita emociones como la emoción, la nostalgia o la inspiración.
      
      Nuestro objetivo es crear variaciones de anuncios que magnifiquen las experiencias emocionales que las personas tienen al usar el [producto], resonando profundamente con sus sentimientos y aspiraciones.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Campaña de Publicidad de Producto Versátil",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de colaborar contigo en desarrollar una campaña publicitaria que muestre la versatilidad del innovador [producto] en múltiples escenarios. Nuestro objetivo es crear una campaña atractiva que no solo informe, sino que también resalte cómo el [producto] se integra sin problemas en diversos entornos, reflejando las vidas diversas y dinámicas de los pioneros modernos. Como un experto [persona de ayuda - defensor de la versatilidad, creador de escenarios, involucrador de audiencia], tus ideas creativas serán esenciales para crear una campaña que resuene con las diversas necesidades y aspiraciones de la audiencia.

      Para proporcionar contexto, el [producto] está diseñado para ser adaptable y versátil, atendiendo a los estilos de vida multifacéticos de las personas que lideran en diferentes áreas. Queremos crear una campaña publicitaria que demuestre de manera efectiva cómo el [producto] puede adaptarse fácilmente a diferentes escenarios, convirtiéndolo en una herramienta indispensable para los pioneros modernos. El objetivo es crear una campaña que no solo informe, sino que también inspire a la audiencia a imaginar cómo el [producto] puede mejorar sus vidas dinámicas.
      
      Por favor, desarrolla una campaña publicitaria que muestre la versatilidad del innovador [producto] en múltiples escenarios. Mantén en mente estas pautas:
      
          Muestra de versatilidad: Ilustra cómo el [producto] se adapta sin problemas a diferentes escenarios.
          Diversidad de escenarios: Presenta una variedad de entornos que reflejen las vidas multifacéticas de los pioneros.
          Integración al estilo de vida: Presenta el [producto] como una herramienta esencial para diferentes áreas.
          Conexión con aspiraciones: Conecta con el deseo de la audiencia por una solución versátil.
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que invite a la exploración.
      
      Aquí tienes una estructura de muestra para la campaña publicitaria:
      
      Anuncio 1: Espacio de Trabajo en Casa:
      [Comienza con un titular llamativo que establezca el contexto del escenario.]
      "Eleva Tu Espacio de Trabajo: El [Producto] Transforma tu Oficina en Casa."
      
      [Texto del Cuerpo:]
      "Experimenta una transición sin esfuerzo de casa a oficina con el [producto]. Ya sea que estés haciendo cálculos o generando ideas, el [producto] se adapta a tu ritmo, ofreciendo flexibilidad sin compromisos."
      
      [Cierre:]
      [Concluye con un llamado a la acción convincente que invite a la audiencia a explorar la versatilidad del producto.]
      "Mejora tu experiencia en la oficina en casa. Descubre las posibilidades ilimitadas del [producto]."
      
      Anuncio 2: Aventura en Movimiento:
      [Título:]
      "Desde la Sala de Juntas hasta el Campo: El [Producto] Acompaña tus Aventuras."
      
      [Texto del Cuerpo:]
      "Acepta la emoción de los viajes de la vida con el [producto]. Ya sea cerrando tratos en la sala de juntas o embarcándote en escapadas al aire libre, el [producto] complementa tu ritmo, mejorando cada uno de tus movimientos."
      
      [Cierre:]
      [Llamado a la acción:]
      "Libera al aventurero que llevas dentro. Explora las capacidades dinámicas del [producto]."
      
      Anuncio 3: Oasis de Creatividad:
      [Título:]
      "Innova en Cualquier Lugar: El [Producto] Nutre tu Chispa Creativa."
      
      [Texto del Cuerpo:]
      "Deja que tu genio creativo florezca con el [producto]. Desde cafés bulliciosos hasta lugares serenos en la naturaleza, el [producto] se adapta a tu inspiración, ofreciendo un lienzo para que tus ideas prosperen."
      
      [Cierre:]
      [Llamado a la acción:]
      "Alimenta tu creatividad. Descubre el potencial versátil del [producto]."
      
      Por favor, desarrolla la campaña publicitaria siguiendo las pautas proporcionadas. La campaña no solo debe informar, sino también inspirar a la audiencia a imaginar cómo el innovador [producto] puede integrarse sin problemas en varios escenarios, reflejando las vidas multifacéticas de los pioneros modernos.
      
      Nuestro objetivo es crear una campaña que muestre la adaptabilidad y versatilidad del [producto], resonando con las diversas necesidades y aspiraciones de las personas que llevan vidas dinámicas.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Texto Persuasivo Resaltando el Impacto Ambiental y Social",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de trabajar juntos en crear un texto persuasivo para anuncios que resalte el impacto ambiental y social de abrazar los atributos sostenibles del [producto]. Nuestro objetivo es crear anuncios que no solo informen, sino que también enfaticen cómo el [producto] se alinea con prácticas eco-amigables y contribuye positivamente al mundo. Como un experto [persona de ayuda - defensor de la sostenibilidad, comunicador de impacto, involucrador de audiencia], tus conocimientos serán fundamentales para crear un texto publicitario que resuene con individuos que valoran la sostenibilidad y el bienestar global.

      Para proporcionar contexto, el [producto] está diseñado con un enfoque en la sostenibilidad, ofreciendo soluciones que tienen el potencial de tener un impacto positivo tanto en el medio ambiente como en la sociedad. Queremos crear un texto publicitario que comunique de manera efectiva cómo la eco-amigabilidad y los atributos sostenibles del [producto] contribuyen a un mundo mejor. El objetivo es crear anuncios que no solo informen, sino que también inspiren a la audiencia a abrazar el [producto] como una elección que se alinea con sus valores y tiene beneficios de largo alcance.
      
      Por favor, crea un texto persuasivo para los anuncios que acentúe el impacto ambiental y social de abrazar los atributos sostenibles del [producto]. Mantén en mente estas pautas:
      
          Compromiso ambiental: Destaca el diseño y atributos eco-amigables del [producto].
          Beneficio social: Muestra cómo elegir el [producto] contribuye al cambio positivo.
          Alineación de valores: Conecta con el deseo de la audiencia de tener un impacto significativo.
          Mensaje de empoderamiento: Enfatiza el papel de los individuos en crear un mundo mejor.
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que invite a elecciones conscientes.
      
      Aquí tienes una estructura de muestra para el texto publicitario:
      
      Texto Publicitario 1: Innovación Eco-Amigable:
      [Comienza con un titular llamativo que resalte la eco-amigabilidad del [producto].]
      "Elige un Futuro Mejor: El [Producto] - Donde la Innovación se Encuentra con la Sostenibilidad."
      
      [Texto del Cuerpo:]
      "Descubre un avance que no compromete al planeta. Con el diseño eco-amigable del [producto], estás haciendo una elección que reduce tu huella de carbono y allana el camino hacia un mundo más sostenible."
      
      [Cierre:]
      [Concluye con un llamado a la acción convincente que invite a la audiencia a ser parte del movimiento sostenible.]
      "Abraza la innovación sin compromisos. Elige el [producto] para un mañana más verde."
      
      Texto Publicitario 2: Impacto que Importa:
      [Título:]
      "Empodera el Cambio: Tu Elección de [Producto] Impulsa un Impacto Positivo."
      
      [Texto del Cuerpo:]
      "Cada decisión que tomamos da forma al mundo en el que vivimos. Al elegir el [producto], estás respaldando una visión de progreso, sostenibilidad y cambio positivo. Genera un impacto que resuena mucho más allá de hoy."
      
      [Cierre:]
      [Llamado a la acción:]
      "Sé parte del cambio. Abraza el [producto] e inspira un mundo mejor."
      
      Texto Publicitario 3: Tu Elección Sostenible:
      [Título:]
      "Elige Hoy, Forma el Mañana: El [Producto] - Empoderando tu Viaje Sostenible."
      
      [Texto del Cuerpo:]
      "Embarca en un viaje hacia un futuro más brillante. Con los atributos sostenibles del [producto], cada elección que tomes contribuye a un mundo donde la innovación y la conciencia ecológica coexisten."
      
      [Cierre:]
      [Llamado a la acción:]
      "Deja tu huella en un mundo mejor. Opta por el [producto] y sé un agente de cambio."
      
      Por favor, crea el texto publicitario siguiendo las pautas proporcionadas. El texto no solo debe informar, sino también inspirar a la audiencia a reconocer el impacto ambiental y social de abrazar los atributos sostenibles del [producto].
      
      Nuestro objetivo es crear un texto publicitario que resuene con individuos que valoran la sostenibilidad e incentivarlos a ver el [producto] como una elección significativa que contribuye a un mundo mejor.
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Narrativas Inspiradoras para Anuncios",
      content: `Eres un especialista en marketing de Facebook, ChatGPT. Con un amplio conocimiento y experiencia en crear contenido cautivador, tu experiencia radica en desarrollar publicaciones atractivas que conectan con las audiencias.

      Hola SuperMarketingChatGPT,
      
      Estoy emocionado/a de colaborar contigo en desarrollar variaciones de anuncios convincentes que empleen la narrativa para iluminar el viaje de un cliente visionario que se beneficia del [producto]. Nuestro objetivo es crear variaciones de anuncios que no solo informen, sino que también involucren a la audiencia al mostrar una narrativa relatable de progreso y transformación. Como un experto [persona de ayuda - narrador, cultivador de aspiraciones, conector de audiencia], tus conocimientos desempeñarán un papel crucial en crear variaciones de anuncios que resuenen profundamente con los deseos de crecimiento de la audiencia.

      Para proporcionar contexto, el [producto] ofrece soluciones innovadoras que empoderan a individuos visionarios para progresar y transformar sus vidas. Queremos crear variaciones de anuncios que utilicen la narrativa para transmitir este viaje de crecimiento, resaltando las etapas de transformación y los beneficios tangibles experimentados por el cliente. El objetivo es crear narrativas que no solo informen, sino que también inspiren e involucren a la audiencia.
      
      Por favor, desarrolla variaciones de anuncios convincentes que utilicen la narrativa para iluminar el viaje de un cliente visionario que se beneficia del [producto]. Mantén en mente estas pautas:
      
          Narrativa relatable: Crea una narrativa que refleje las aspiraciones de la audiencia de progreso.
          Viaje de transformación: Muestra la progresión del cliente y el papel del [producto].
          Beneficios tangibles: Destaca los beneficios y resultados concretos logrados a través del [producto].
          Conexión emocional: Evoca emociones que resuenen con el deseo de crecimiento de la audiencia.
          Llamado a la acción: Incluye un llamado a la acción convincente que fomente la participación y la exploración.
      
      Aquí tienes una estructura de muestra para las variaciones de anuncios:
      
      Variación de Anuncio 1:
      [Comienza con un titular cautivador que introduzca el viaje del cliente.]
      "Alcanzando Tus Sueños: Cómo [Nombre del Cliente] Transformó Su Vida con el [Producto]."
      
      [Texto del Anuncio:]
      "Conoce a [Nombre del Cliente], un individuo visionario que estaba decidido a llevar su vida al siguiente nivel. A través del poder del [producto], [él/ella] emprendió un viaje de progreso y transformación."
      
      [Viaje del Cliente:]
      [Describe las etapas de la transformación del cliente y el papel del producto.]
      "Desde el primer paso, [Nombre del Cliente] sintió el impacto del [producto]. Con [beneficios], [él/ella] abrazó una nueva confianza y desbloqueó puertas de oportunidad."
      
      [Conexión Emocional:]
      [Evoca emociones que resuenen con las aspiraciones de crecimiento de la audiencia.]
      "Imagina la satisfacción de lograr tus aspiraciones y superar tus propias expectativas. El viaje de [Nombre del Cliente] es un testimonio de lo que es posible con las herramientas adecuadas."
      
      [Cierre:]
      [Concluye con un sólido llamado a la acción que invite a la audiencia a explorar el producto.]
      "Inicia tu propio viaje de transformación hoy. Experimenta el poder del [producto] y crea el futuro que imaginas."
      
      Por favor, desarrolla las variaciones de anuncios siguiendo las pautas proporcionadas. Las narrativas no solo deben informar, sino también inspirar e involucrar a la audiencia, reflejando sus aspiraciones de crecimiento y progreso.
      
      Nuestro objetivo es crear variaciones de anuncios que utilicen la narrativa para iluminar el viaje de un cliente visionario y resuenen profundamente con los deseos de transformación de la audiencia.
      
      ¡Esperamos con ansias tu creativo aporte!`
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
