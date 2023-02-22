import React from "react";

import { useRouter } from 'next/router';


import { BigLogo } from '../components/Logo'

import Image from 'next/image'


export default function Home() {
  const router = useRouter();

  

  return (
    <section>
      <div className="max-w-6xl mx-auto my-10 py-8 sm:flex sm:flex-col sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            ChatDiffusion
          </h1>
          <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Edit images from text.
          </p>
          <button onClick={() => router.push("/chat")} type="button" className="btn dropCard font-bold text-xl h-12 w-48 m-8 rounded-2xl mx-auto">
                        Get started
          </button>
        </div>

        <h1 className="mt-40 mb-40 font-bold text-transparent bg-clip-text bg-gradient-to-r text-gradient sm:text-center sm:text-4xl">
            Start from existing images, create entirely new ones, edit them, iterate, share them... 
        </h1>

        <div className={`my-20 sm:flex sm:flex-row  dw-full hover:bg-black/10 group`}>
          <div
            className={`w-1/2 relative px-2 lg:px-0 flex flex-col items-start`}
          >
            <Image src="/cd-drop.png" alt="me" width="462" height="241" />

          </div>
          <div
            className={`bg-chatbox rounded-lg p-8 max-h-72 m-auto  w-1/2 relative px-2 lg:px-0 flex flex-col items-end`}
          >
            <p className="font-extrabold text-white sm:text-center sm:text-4xl m-auto">
              Step 1: Upload an image
            </p>
            <p className="mt-5 p-8 text-zinc-200 sm:text-center sm:text-xl m-auto">
                Upload a starting image in the Image to Image box to use Pix2pix.
                You can also start from text by clicking on Text to Image.
            </p>
          </div>
        </div>

        <div className={`my-20 sm:flex sm:flex-row  dw-full hover:bg-black/10 group`}>
          <div
              className={`bg-chatbox rounded-lg p-8 max-h-72 m-auto w-1/2 relative px-2 lg:px-0 flex flex-col`}
            >
            <p className="font-extrabold text-white sm:text-center sm:text-4xl m-auto">
              Step 2: Prompt the model
            </p>
            <p className="mt-5 p-8 text-zinc-200 sm:text-center sm:text-xl m-auto">
              Tell the model how to edit your image.
              Optional: Play with the model parameters. 
            </p>
          </div>
          <div
            className={`w-1/2 relative px-2 lg:px-0 flex flex-col items-end`}
          >
            <Image src="/cd-enter-prompt.png" alt="me" width="462" height="241" />
            <Image src="/cd-settings.png" alt="me" width="462" height="241" />
          </div>
        </div>

    
        <div className={`my-20 sm:flex sm:flex-row  dw-full hover:bg-black/10 group`}>
          <div
            className={`w-1/2 relative px-2 lg:px-0 flex flex-col `}
          >
            <Image src="/cd-results-dl.png" alt="me" width="462" height="241" />
          </div>
          <div
              className={`bg-chatbox rounded-lg p-8 max-h-72 m-auto w-1/2 relative px-2 lg:px-0 flex flex-col items-end`}
            >
            <p className="font-extrabold text-white sm:text-center sm:text-4xl m-auto">
              Step 3: Save the results
            </p>
            <p className="mt-5 p-8 text-zinc-200 sm:text-center sm:text-xl m-auto">
              Wait for the AI to answer back (usually takes 4 to 20 seconds) 
            </p>
          </div>
        </div>
  
        <div className={`my-20 sm:flex sm:flex-row  dw-full hover:bg-black/10 group`}>
          <div
              className={`bg-chatbox rounded-lg p-8 max-h-72 m-auto w-1/2 relative px-2 lg:px-0 flex flex-col`}
            >
            <p className="font-extrabold text-white sm:text-center sm:text-4xl m-auto">
              Repeat ! 
            </p>
            <p className="mt-5 p-8 text-zinc-200 sm:text-center sm:text-xl m-auto">
              You can drag an drop generated images to the Image 2 Image box to keep editing them. 
              You spend 1 credit everytime you send a message.
            </p>
          </div>
          <div
            className={`w-1/2 relative px-2 lg:px-0 flex flex-col items-end`}
          >
            <Image src="/cd-repeat.png" alt="me" width="462" height="241" />
          </div>
        </div>

        <button onClick={() => router.push("/chat")} type="button" className="btn dropCard font-bold text-xl h-12 w-48 m-8 rounded-2xl mx-auto mt-20  ">
            Launch App
        </button>


        <div className="m-auto mt-20">
          <BigLogo/>
        </div>  
      </div>
    </section>

  );
}
