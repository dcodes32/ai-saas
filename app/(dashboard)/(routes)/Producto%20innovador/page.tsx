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
      title: "Identificación de Audiencias en Facebook",
      content: `Estoy emocionado/a de colaborar contigo en la generación de una lista de posibles audiencias de Facebook que podrían sentirse cautivadas por el vanguardista [producto]. Nuestro objetivo es identificar demografías diversas que resuenen con la modernidad y la innovación de nuestra oferta. Como un experto [persona de ayuda - explorador de audiencia, conector demográfico, casamentero de innovación], tus conocimientos desempeñarán un papel crucial en la identificación de audiencias que se alineen con la esencia de nuestro [producto].

      Para proporcionar contexto, nuestro [producto] es una representación de la innovación orientada hacia el futuro, que atrae a aquellos que abrazan los avances modernos. Queremos identificar audiencias que compartan afinidad por soluciones de vanguardia y que probablemente se sientan cautivadas por nuestra oferta. El objetivo es crear una lista de posibles audiencias que no solo refleje diversidad, sino que también resuene con el espíritu innovador de nuestro [producto].
      
      Por favor, genera una lista de 20 posibles audiencias de Facebook que probablemente se sentirían cautivadas por el vanguardista [producto]. Mantén en mente estas pautas:
      
          Demografías diversas: Incluye una variedad de audiencias de diferentes grupos de edad, profesiones, intereses y estilos de vida.
          Modernidad e innovación: Enfócate en audiencias que se alineen con la naturaleza orientada hacia el futuro de nuestro [producto].
          Resonancia con la audiencia: Identifica grupos que probablemente apreciarán y abrazarán los beneficios de nuestra oferta.
          Exploración creativa: Piensa fuera de lo común para descubrir segmentos de audiencia únicos e inesperados.
      
      Aquí tienes una lista de muestra de posibles audiencias de Facebook:
      
          Entusiastas de la Tecnología: Personas apasionadas por los últimos avances tecnológicos.
          Innovadores y Adoptantes Tempranos: Aquellos que abrazan y respaldan nuevas soluciones.
          Profesionales en Campos STEM: Ingenieros, científicos y expertos que valoran la innovación.
          Futuristas: Visionarios que anticipan y exploran tendencias futuras.
          Aficionados al Diseño y la Creatividad: Personas que aprecian la estética moderna y la innovación.
          Emprendedores y Startups: Dueños de negocios que buscan ventajas competitivas.
          Jugadores y Entusiastas de la Realidad Virtual: Aquellos intrigados por experiencias inmersivas.
          Exploradores de la Salud y el Bienestar: Personas interesadas en soluciones de salud innovadoras.
          Defensores de la Vida Sostenible: Gente que valora soluciones modernas para la vida sostenible.
          Defensores de la Reforma Educativa: Individuos en busca de enfoques innovadores para el aprendizaje.
          Entusiastas de los Viajes y la Exploración: Aquellos intrigados por experiencias de viaje modernas.
          Conocedores de Arte y Cultura: Individuos atraídos por expresiones artísticas contemporáneas.
          Buscadores de un Estilo de Vida de Lujo: Personas que valoran el vivir moderno y sofisticado.
          Aventureros de la Comida y la Gastronomía: Individuos abiertos a experiencias gastronómicas innovadoras.
          Consumidores Eco-conscientes: Aquellos interesados en productos ecológicos e innovadores.
          Nómadas Digitales: Profesionales que abrazan el trabajo remoto moderno y los estilos de vida digitales.
          Innovadores en Fitness y Bienestar: Personas que buscan soluciones de fitness y salud vanguardistas.
          Profesionales Creativos: Artistas, escritores y creadores que abrazan herramientas innovadoras.
          Entusiastas de la Automatización del Hogar: Personas que buscan modernizar sus espacios de vida.
          Fanáticos de la Ciencia Ficción: Aquellos que disfrutan explorando conceptos e ideas futuristas.
      
      Por favor, genera la lista de posibles audiencias de Facebook siguiendo las pautas proporcionadas. La lista debe abarcar una amplia gama de demografías y reflejar la modernidad y la innovación inherentes a nuestro [producto].
      
      Nuestro objetivo es identificar audiencias que resuenen con la naturaleza innovadora de nuestro [producto] y que probablemente se involucren con nuestra oferta.
      
      ¡Esperamos con ansias tu perspicaz aporte!`
    },
    {
      title: "Creación de Titulares y Texto de Campaña",
      content: `Estoy emocionado/a de embarcarme en una misión contigo para componer titulares y texto principal convincentes para nuestra campaña que destaca el innovador [producto/servicio]. Nuestro objetivo es crear contenido que no solo capte la atención de los posibles clientes, sino que también hable a sus aspiraciones, incitándolos a abrazar la vanguardia de nuestra oferta. Como un experto [persona de ayuda - narrador de innovación, comunicador aspiracional, estratega de persuasión], tus conocimientos serán fundamentales para crear contenido que resuene y persuade.

      Para proporcionar contexto, nuestro [producto/servicio] es un faro de innovación, ofreciendo una solución única y avanzada que aborda desafíos contemporáneos. Queremos que los titulares y el texto principal comuniquen esta innovación de una manera que capte e inspire, al mismo tiempo que persuaden a los posibles clientes a explorar más. El objetivo es crear contenido que no solo informe, sino que también encienda una sensación de curiosidad y emoción.
      
      Por favor, compón titulares y texto principal convincentes para nuestra campaña que destaque el innovador [producto/servicio]. Mantén en mente estas pautas:
      
          Titulares cautivadores: Crea titulares que capten la atención y despierten la curiosidad.
          Conexión aspiracional: Aborda los deseos y aspiraciones de los posibles clientes.
          Propuesta de valor innovadora: Comunica cómo el [producto/servicio] revoluciona la forma en que abordan los desafíos.
          Narrativa persuasiva: Teje una narrativa que involucre emociones y anime a la acción.
          Llamado a la acción: Incluye un llamado a la acción claro y concreto que invite a los usuarios a explorar más.
      
      Aquí tienes una estructura de muestra para el contenido:
      
      Titular 1:
      [Comienza con un titular que despierte curiosidad e intriga.]
      "Desata el Futuro: Descubre la Innovación Inimaginable de [Producto/Servicio]."
      [Elabora el texto principal que resalta la solución innovadora y su impacto.]
      "Entra en un mundo donde la innovación no conoce límites. Con [Producto/Servicio], redefinirás lo que es posible."
      
      Titular 2:
      [Empieza con un titular que conecte con las aspiraciones de los clientes.]
      "Potencia tu Trayecto: Abraza [Producto/Servicio] y Eleva tu Potencial."
      [Escribe el texto principal que hable sobre cómo el [producto/servicio] capacita a los usuarios para lograr sus objetivos.]
      "Eleva tus aspiraciones con [Producto/Servicio], diseñado para impulsarte hacia el éxito como nunca antes."
      
      Titular 3:
      [Comienza con un titular que transmita la naturaleza transformadora de la oferta.]
      "Transforma Hoy, Da Forma al Mañana: Abraza el Futuro con [Producto/Servicio]."
      [Redacta el texto principal que muestre cómo el [producto/servicio] transforma la forma en que los usuarios enfrentan los desafíos.]
      "Experimenta el poder transformador de [Producto/Servicio], pavimentando el camino para una nueva era de posibilidades."
      
      Por favor, compón los titulares y el texto principal siguiendo las pautas proporcionadas. El contenido no solo debe informar, sino también cautivar y persuadir a los posibles clientes para que exploren el mundo innovador de nuestro [producto/servicio].
      
      Nuestro objetivo es crear contenido que resuene profundamente con los deseos de innovación de los posibles clientes, mientras los persuade a dar el siguiente paso.
      
      ¡Esperamos con ansias tu aporte creativo!`
    },
    {
      title: "Copias de Anuncios para Página de Destino",
      content: `Estoy emocionado/a de colaborar contigo en la creación de tres copias distintas para anuncios de Facebook que encarnen de manera perfecta la esencia moderna y vanguardista del texto proporcionado en la página de destino. Nuestro objetivo es crear copias de anuncios que no solo resuenen con el espíritu innovador de la página de destino, sino que también conecten con la apreciación de la audiencia por la modernidad. Como un experto [persona de ayuda - innovador de copias de anuncios, realzador de esencia, conector de audiencia], tus conocimientos desempeñarán un papel crucial en la creación de copias de anuncios que se alineen de manera perfecta con la esencia de la página de destino.

      Para proporcionar contexto, el texto proporcionado en la página de destino irradia modernidad y sofisticación vanguardista, y se dirige a una audiencia que valora la innovación. Queremos que las copias de los anuncios reflejen esta esencia de manera impecable y que también conecten profundamente con la apreciación de la audiencia por soluciones de vanguardia. El objetivo es crear copias de anuncios que no solo informen, sino que también evocen un sentido de admiración y curiosidad.
      
      Por favor, crea tres copias distintas para anuncios de Facebook que encarnen la esencia moderna y vanguardista del texto proporcionado en la página de destino. Mantén en mente estas pautas:
      
          Tono moderno y vanguardista: Utiliza un lenguaje que refleje el estilo contemporáneo e innovador de la página de destino.
          Alineación perfecta: Asegúrate de que las copias de los anuncios resuenen de manera armoniosa con la esencia de la página de destino.
          Resonancia con la audiencia: Crea copias de anuncios que conecten con la apreciación de la audiencia por la innovación.
          Narrativa atractiva: Teje una historia que capture la atención y despierte la curiosidad.
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que invite a los usuarios a involucrarse aún más.
      
      Aquí tienes una estructura de muestra para las copias de los anuncios:
      
      Copia de Anuncio 1:
      [Comienza con una apertura que capture la atención y refleje la esencia de la página de destino.]
      "Adéntrate en el Mañana: Eleva tu Experiencia en [industria] con Innovación Futurista."
      [Redacta un texto que desarrolle sobre las soluciones innovadoras y su impacto.]
      "Abraza un reino de [beneficios] que redefinen lo posible. ¡El futuro es ahora!"
      
      Copia de Anuncio 2:
      [Inicia con un titular que despierte la curiosidad y se alinee con la esencia de la página de destino.]
      "Abraza el Futuro: [Producto/Servicio] Desata una Revolución de Posibilidades."
      [Redacta un texto que enfatice los aspectos transformadores de la oferta.]
      "Imagina [beneficios] que te impulsan más allá de los límites. ¡Embarca en un viaje de innovación!"
      
      Copia de Anuncio 3:
      [Comienza con una apertura cautivadora que conecte con la apreciación de la audiencia por la innovación.]
      "Potencia tu Evolución: Experimenta el Avance en [industria] con Soluciones Vanguardistas."
      [Escribe un texto que refuerce la naturaleza innovadora de la página de destino y su impacto.]
      "Tu camino hacia [beneficios] está iluminado por la innovación. ¡Únete a nosotros en la construcción del mañana!"
      
      Por favor, crea las copias de los anuncios siguiendo las pautas proporcionadas. Cada copia de anuncio debe capturar de manera impecable la esencia moderna y vanguardista de la página de destino, mientras conecta con la apreciación de la audiencia por la innovación.
      
      Nuestro objetivo es crear copias de anuncios que no solo informen, sino que también inspiren y cautiven, invitando a los usuarios a explorar el mundo innovador que ofrecemos.
      
      ¡Esperamos con ansias tu perspicaz aporte!`
    },
    {
      title: "Narrativa Inmersiva para Producto Tecnológico",
      content: `Estoy emocionado/a de colaborar contigo en crear una narrativa inmersiva para un anuncio que presenta el futurista [producto] a la audiencia experta en tecnología de [demográfico específico]. Nuestro objetivo es crear una historia que no solo capte la atención de la audiencia, sino que también resuene con su naturaleza conocedora de la tecnología. Como un experto [persona de ayuda - maestro de la narración, visionario futurista, conector de audiencia], tus conocimientos desempeñarán un papel fundamental en crear una narrativa que transporte a la audiencia a un mundo donde el [producto] se convierte en una parte indispensable de sus vidas.

      Para proporcionar contexto, el [producto] representa el epítome de la innovación futurista, perfectamente alineado con las sensibilidades de personas expertas en tecnología. Queremos crear una historia que sumerja a la audiencia en escenarios que muestren cómo el [producto] revoluciona sus experiencias diarias. El objetivo es elaborar una narrativa que no solo informe, sino que también despierte emoción y curiosidad.
      
      Por favor, crea una narrativa inmersiva para el anuncio que promociona el futurista [producto] a la audiencia experta en tecnología de [demográfico específico]. Mantén en mente estas pautas:
      
          Narrativa inmersiva: Crea una historia que atraiga a la audiencia y los transporte a un mundo donde el [producto] es central en sus experiencias.
          Resonancia con conocedores de tecnología: Infunde escenarios y situaciones que resuenen con la apreciación de la audiencia por la innovación tecnológica.
          Impacto revolucionario: Muestra cómo el [producto] transforma y mejora diversos aspectos de sus vidas cotidianas.
          Escenarios cautivadores: Teje situaciones relacionables que resalten los beneficios y características del producto.
          Conexión emocional: Crea escenarios que evocan emociones y un sentido de anticipación.
      
      Aquí tienes una estructura de muestra para la narrativa:
      
      Narrativa:
      [Comienza con una apertura cautivadora que capte la atención y curiosidad de la audiencia.]
      "Imagina un mundo donde la tecnología se entrelaza perfectamente con cada aspecto de tu vida."
      
      [Escenario 1:]
      [Describe un escenario que ilustre el impacto del producto en su rutina matutina.]
      "Al despertar al suave murmullo del amanecer, el [producto] cobra vida. Tus cortinas se deslizan abriéndose, y tu música favorita llena la habitación. Una notificación inteligente te informa sobre el clima, y comienzas un día que ya anticipa tus necesidades."
      
      [Escenario 2:]
      [Detalla un escenario que muestre el papel del producto en su entorno de trabajo.]
      "Al entrar a tu espacio de trabajo, el [producto] se sincroniza con tus dispositivos. Tu asistente virtual comprende tus órdenes sin esfuerzo, programa reuniones e incluso ofrece sugerencias creativas. Las tareas mundanas desaparecen, permitiéndote concentrarte en lo que realmente importa."
      
      [Escenario 3:]
      [Incorpora un escenario que demuestre el impacto del producto en su tiempo de ocio.]
      "Las tardes se transforman en experiencias mágicas. El [producto] crea entornos inmersivos para películas, te transporta a tierras lejanas en realidad virtual e incluso ajusta la iluminación según tu estado de ánimo."
      
      [Cierre:]
      [Concluye la narrativa con un sentido de anticipación y emoción.]
      "Bienvenido/a a un futuro donde la innovación está a tu alcance. Abraza las posibilidades ilimitadas del [producto] y redefine tu mundo."
      
      Por favor, crea la narrativa inmersiva siguiendo las pautas proporcionadas. La narrativa debe cautivar la imaginación de la audiencia y mostrar el papel transformador del [producto] en sus vidas.
      
      Nuestro objetivo es crear una narrativa que no solo informe, sino que también despierte un sentido de asombro y emoción, invitando a la audiencia a explorar el mundo futurista que ofrecemos.
      
      ¡Esperamos con ansias tu perspicaz aporte!`
    },
    {
      title: "Anuncio de Carrusel de Evolución del Producto",
      content: `Estoy emocionado/a de colaborar contigo en diseñar un cautivador anuncio de carrusel que muestre de manera hermosa la evolución del [producto] a lo largo del tiempo. Nuestro objetivo es crear una serie de diapositivas que no solo capturen la atención de la audiencia, sino que también los lleven en un viaje de cómo el [producto] ha transformado. Como un experto [persona de ayuda - narrador visual, historiador de productos, conector de audiencia], tus conocimientos serán invaluables para diseñar un carrusel que comunique eficazmente la evolución del producto.

      Para proporcionar contexto, el [producto] ha experimentado transformaciones significativas a lo largo del tiempo, reflejando avances e innovación. Queremos crear un anuncio de carrusel que capture de manera concisa estas transformaciones, cautivando a los espectadores con imágenes elegantes y texto conciso. El objetivo es crear una narrativa visual que no solo informe, sino que también deje una impresión duradera.
      
      Por favor, diseña un cautivador anuncio de carrusel que muestre la evolución del [producto] a lo largo del tiempo. Mantén en mente estas pautas:
      
          Imágenes cautivadoras: Utiliza imágenes elegantes que representen visualmente cada fase de la evolución del producto.
          Texto conciso: Incluye texto conciso e impactante que complemente las imágenes y proporcione contexto.
          Narrativa de transformación: Asegúrate de que cada diapositiva cuente una parte de la historia de transformación del producto.
          Coherencia visual: Mantén un estilo visual y diseño consistentes en todas las diapositivas.
          Compromiso del espectador: Crea un flujo que mantenga a los espectadores comprometidos mientras desplazan el carrusel.
      
      Aquí tienes una estructura de muestra para el anuncio de carrusel:
      
      Diapositiva 1:
      [Imagen que representa la versión inicial del producto]
      "Donde todo comenzó: El [producto] hace su debut, preparando el escenario para la innovación."
      
      Diapositiva 2:
      [Imagen que representa un avance significativo en el diseño o características del producto]
      "Revolucionando [industria]: El [producto] da un salto adelante, presentando [característica]."
      
      Diapositiva 3:
      [Imagen que muestra otra mejora notable]
      "Elevando el rendimiento: El [producto] experimenta [transformación], mejorando [beneficio]."
      
      Diapositiva 4:
      [Imagen que resalta un avance reciente]
      "Hacia el futuro: El [producto] integra [tecnología de vanguardia], redefiniendo [aspecto]."
      
      Diapositiva 5:
      [Imagen que representa el estado actual del producto]
      "El pináculo de hoy: El [producto] es un testimonio de evolución e innovación."
      
      [Concluye con una llamada a la acción]
      "Vive la experiencia del viaje por ti mismo/a. Obtén más información sobre el [producto] moderno."
      
      Por favor, diseña el anuncio de carrusel siguiendo las pautas proporcionadas. Cada diapositiva debe encapsular de manera concisa una fase de la evolución del producto, mientras que atrae a los espectadores con imágenes cautivadoras y texto conciso.
      
      Nuestro objetivo es crear un anuncio de carrusel que no solo informe, sino que también sumerja visualmente a los espectadores en el viaje transformador del [producto].
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Anuncio Emotivo para Producto Innovador",
      content: `Estoy emocionado/a de colaborar contigo en desarrollar un anuncio emotivo que presente el [producto] de última generación como la solución definitiva a un desafío persistente enfrentado por la audiencia moderna. Nuestro objetivo es crear un anuncio que no solo informe, sino que también evoque emociones profundas, mostrando cómo el [producto] puede transformar vidas. Como un experto [persona de ayuda - encantador de emociones, comunicador de transformaciones, conector de audiencia], tus conocimientos desempeñarán un papel crucial en el desarrollo de un anuncio que toque la fibra sensible de la audiencia.

      Para proporcionar contexto, el [producto] representa una solución innovadora que aborda un desafío significativo enfrentado por individuos modernos. Queremos crear un anuncio que resuene emocionalmente con la audiencia, mostrando la transformación que el [producto] aporta a sus vidas. El objetivo es crear una narrativa que no solo informe, sino que también conmueva los corazones.
      
      Por favor, desarrolla un anuncio emotivo que presente el [producto] de última generación como la solución definitiva a un desafío persistente enfrentado por la audiencia moderna. Mantén en mente estas pautas:
      
          Narrativa emotiva: Crea una narrativa que toque las emociones de la audiencia y muestre su lucha.
          Enfoque en la transformación: Destaca cómo el [producto] genera una transformación positiva en sus vidas.
          Resonancia emocional: Evoca emociones como alivio, esperanza, alegría o empoderamiento.
          Escenarios identificables: Utiliza escenarios identificables que representen el desafío y su impacto.
          Llamado a la acción: Incluye un llamado a la acción convincente que fomente la participación y exploración.
      
      Aquí tienes una estructura de muestra para el anuncio emotivo:
      
      Anuncio:
      [Comienza con una apertura que capte la atención de la audiencia e introduzca el desafío.]
      "Cada día, la vida moderna nos presenta desafíos que parecen insuperables."
      
      [Escenario 1:]
      [Describe un escenario identificable que represente el desafío y su impacto emocional.]
      "Imagina tratar de [desafío] mientras malabareas [responsabilidad], sintiéndote abrumado y exhausto."
      
      [Escenario 2:]
      [Detalla la transformación que el [producto] genera.]
      "Pero ahora, hay una solución que lo cambia todo. Presentamos el [producto], una innovación de última generación que te empodera para [solución]."
      
      [Escenario 3:]
      [Resalta el impacto emocional de la transformación.]
      "Experimenta el alivio de [beneficios] y la nueva libertad para [resultado positivo]."
      
      [Cierre:]
      [Concluye con un llamado a la acción convincente que invite a la audiencia a explorar el [producto].]
      "Adéntrate en un mundo donde los desafíos se convierten en triunfos. Descubre cómo el [producto] puede transformar tu vida."
      
      Por favor, desarrolla el anuncio emotivo siguiendo las pautas proporcionadas. El anuncio debe transmitir no solo el desafío y la solución, sino también evocar emociones que resuenen profundamente con la audiencia.
      
      Nuestro objetivo es crear un anuncio que no solo informe, sino que también conmueva emocionalmente a la audiencia, inspirándolos a tomar acción y experimentar el poder transformador del [producto].
      
      ¡Esperamos con ansias tu creativo aporte!`
    },
    {
      title: "Campaña Persuasiva en Acción",
      content: `Estoy emocionado/a de colaborar contigo en componer una campaña publicitaria persuasiva que aproveche el poder de la influencia del respaldo social para avalar el vanguardista [producto]. Nuestro objetivo es crear una campaña publicitaria que no solo informe, sino que también persuade al mostrar cómo autoridades respetadas y clientes reales respaldan la efectividad del [producto]. Como un experto [persona de ayuda - maestro de persuasión, estratega de respaldo social, conector de audiencia], tus conocimientos serán invaluables en crear una campaña publicitaria que infunda confianza y credibilidad en la audiencia.

      Para proporcionar contexto, el [producto] cuenta con respaldos de autoridades y historias de éxito reales de clientes satisfechos. Queremos crear una campaña publicitaria que resalte estos elementos, aprovechando el respaldo social para persuadir a la audiencia del valor del [producto]. El objetivo es crear una campaña que no solo informe, sino que también construya credibilidad y confianza.
      
      Por favor, compón una campaña publicitaria persuasiva aprovechando el poder del influyente respaldo social para avalar el vanguardista [producto]. Mantén en mente estas pautas:
      
          Respaldos de autoridades: Incorpora citas o testimonios de autoridades respetadas en el campo.
          Historias de éxito del mundo real: Destaca historias de clientes que muestren beneficios y resultados tangibles.
          Calificaciones y reseñas: Resalta calificaciones y reseñas positivas de clientes satisfechos.
          Lenguaje persuasivo: Utiliza un lenguaje convincente que enfatice el impacto y el valor del [producto].
          Llamado a la acción: Incluye un llamado a la acción claro y convincente que fomente la participación.
      
      Aquí tienes una estructura de muestra para la campaña publicitaria:
      
      Campaña Publicitaria:
      [Comienza con un titular llamativo que introduzca el aspecto influyente del respaldo social.]
      "Únete a la Revolución del [producto]: ¡Respaldado por Expertos, Elogiado por Clientes!"
      
      [Anuncio 1:]
      [Incorpora un respaldo de autoridad y una historia de éxito real de un cliente.]
      "¡El renombrado experto en [industria] aplaude el [producto] como un cambio de juego! Escucha a [nombre del cliente], quien transformó su [desafío] con el [producto]."
      
      [Anuncio 2:]
      [Destaca un testimonio de cliente y resalta las calificaciones positivas del producto.]
      "¡Descubre el [producto] que obtuvo reseñas entusiastas! [Nombre del cliente] comparte su experiencia, respaldada por calificaciones de 5 estrellas."
      
      [Anuncio 3:]
      [Incorpora una historia de éxito y enfatiza los beneficios del producto.]
      "¡Experimenta el impacto del [producto] de primera mano! [Nombre del cliente] logró [beneficios], ¡y tú también puedes!"
      
      [Cierre:]
      [Concluye con un llamado a la acción sólido que invite a la audiencia a explorar el [producto].]
      "Desbloquea el poder del influyente respaldo social. ¡Únete hoy al movimiento del [producto]!"
      
      Por favor, compón la campaña publicitaria siguiendo las pautas proporcionadas. La campaña debe mostrar efectivamente cómo los respaldos respetados y las historias de éxito reales validan el valor y los beneficios del [producto].
      
      Nuestro objetivo es crear una campaña publicitaria que no solo informe, sino que también persuade al aprovechar la influencia persuasiva del respaldo social, guiando a la audiencia a explorar el potencial transformador del [producto].
      
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