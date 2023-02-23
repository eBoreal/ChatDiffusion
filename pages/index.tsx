import React from "react";
import Link from 'next/link';

import { useRouter } from 'next/router';
import { BigLogo } from '../components/Logo'

import Image from 'next/image'

export type InstructionStep = {
  title: string;
  details: string
  images: string[];
};

var instructions: InstructionStep[] = [
  {
    title: "Drop an Image",
    details: "Upload a starting image in the Image to Image box to use Pix2pix. You can also start from text by clicking on Text to Image.",
    images: ["/steps/1-drop.png"]
  },
  {
    title: "Prompt the model",
    details: "Tell the model how to edit your image. Optional: Play with the model parameters.",
    images: ["/steps/2-prompt.png", "/steps/2-settings.png"]
  },
  {
    title: "Save the results",
    details: "Wait for the AI to answer back (usually takes 4 to 20 seconds)",
    images: ["/steps/3-results.png"]
  },
  {
    title: "Repeat !",
    details: "You can drag an drop generated images to the Image 2 Image box to keep editing them. You spend 1 credit everytime you send a message.",
    images: ["/steps/4-repeat.png"]
  },
]

var examples = [
  "/examples/elon_base.jpg",
  "/examples/make_him_a_claymation.png",
  "/examples/make_it_a_modigliani_painting-0.png",
  "/examples/make_it_a_picasso_painting-0.png",
  "/examples/put_him_on_mars-0.png",
  "/examples/turn_him_into_a_cyborg-0.png",
]


export default function Home() {
  const router = useRouter();

  function GalleryImage({
    path
  } : {
    path: string
  }) {

    let name;
    if (!path.includes("base")) {
      let file_paths = path.split("/")
      let filename;
      if (file_paths.length > 0) filename = file_paths.at(-1)
      else filename = file_paths[0]
      name = `"${filename?.split(".")[0].replace(/[\W-0-9]+/g, '').replace(/_/g, " ")}"`
      console.log(name)
    } else {
      name = "Base Image"
    }


    return (
    <div className={`flex flex-col`}>
      <Image className="rounded" src={path} alt="me" width="250" height="250" />
      <p className="text-white sm:text-center m-auto">
            {name}
      </p>
    </div>
  )
  }


  function Step({
    id,
    step,
  } : {
    id: number,
    step: InstructionStep,
  }) {

    function StepImgs ({
      images
    } : {
      images: string[]
    }
    ){
      return (        
        <div className={`w-1/2 relative px-2 lg:px-0 flex flex-col items-start`}>
          {images.map((image: string, i) => (
            <Image key={i} src={image} alt="me" width="462" height="241" />
          ))}
        </div>
      )
    }

    function StepCard({
      id,
      step
    } : {
      id: number,
      step: InstructionStep
    }
    ) {
      return (
        <div className={`bg-chatbox rounded-lg p-8 max-h-72 m-auto  w-1/2 relative px-2 lg:px-0 flex flex-col items-end`}>
          <p className="font-extrabold text-white sm:text-center sm:text-4xl m-auto">
            {`Step ${id}: ${step.title}`}
          </p>
          <p className="mt-5 p-8 text-zinc-200 sm:text-center sm:text-xl m-auto">
              {step.details}
          </p>
        </div>
      )
    }

    return (
      <div className={`my-20 sm:flex sm:flex-row  dw-full hover:bg-black/10 group`}>
        {(id % 2 ) ? 
          <>
            <StepImgs images={step.images}/>
            <StepCard id={id} step={step}/>
          </>
        :
          <>
          <StepCard id={id} step={step}/>
          <StepImgs images={step.images}/>
          </>
        }
      </div>

      
    )
  }

  function Gallery() {
    return (
      <>
      </>
    )
  }

  return (
    <section>

      {/* header */}
      <div className="max-w-6xl mx-auto space-y-40 py-8 sm:flex sm:flex-col sm:py-24 px-4 sm:px-6 lg:px-8">
        
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            ChatDiffusion
          </h1>
          <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Edit images from text.
          </p>
          <button onClick={() => router.push("/chat")} type="button" className="btn dropCard font-bold text-xl h-12 w-48 mt-8 rounded-2xl mx-auto">
                        Get started
          </button>
        </div>

        {/* tagline */}
        <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r text-gradient sm:text-center sm:text-4xl">
          Check out some examples of what you can do below...
        </h1>

        {/* galery of examples */}
        <div className={`dw-full bg-chatbox rounded-lg p-8`}>
          <h2 className="font-extrabold text-white text-2xl mb-2">Elon's example</h2>
          <div className={'sm:flex sm:flex-row space-x-4 '}>
            {examples.map((path: string, i) => <GalleryImage key={i} path={path}/>)}
          </div>
        </div>

        {/* tagline 2*/}
        <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r text-gradient sm:text-center sm:text-4xl">
            Drop something to edit and chat with the model
        </h1>

        {/* steps */}
        {instructions.map((step: InstructionStep,  i) => 
          <Step key={i} id={i+1} step={step}/>)
        }        

        {/* launch app footer */}
        <button onClick={() => router.push("/chat")} type="button" className="btn dropCard font-bold text-xl h-12 w-48 rounded-2xl mx-auto">
            Launch App
        </button>

        {/* Credits & Acknowledgements section*/}
        <div className={`sm:flex sm:flex-row  w-full hover:bg-black/10 group`}>
          <div
              className={`bg-chatbox rounded-lg p-8 max-h-72 m-auto w-full relative px-2 lg:px-0 flex flex-col`}
            >
            <p className="font-extrabold text-white sm:text-center sm:text-4xl m-auto">
              Credits and Acknowledgements
            </p>
            <ul className="mt-5 p-8 text-zinc-200 sm:text-center sm:text-xl m-auto">
              <li>- Tim Brooks et al. for the <Link  href="https://www.timothybrooks.com/instruct-pix2pix" className="underline">Instruct Pix2pix model</Link ></li>
              <li>- Stability.ai for open sourcing the original <Link href="https://arxiv.org/abs/2112.10752" className="underline">Stable Diffusion model </Link ></li>
              <li>- kajDev for the original <Link  href="https://github.com/KAJdev/diffusion-chat" className="underline">front-end code base</Link ></li>
              <li>- HuggingFace diffusers for their <Link  href="https://github.com/huggingface/diffusers" className="underline">implementation of Stable Diffusion and Pix2Pix</Link ></li>
            </ul>
          </div>
        </div>

        
        <div className="m-auto mt-20">
          <BigLogo/>
        </div>  
      </div>
    </section>

  );
}
