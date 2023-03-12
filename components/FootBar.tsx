import React from "react";
import create from "zustand";
import { useRouter } from 'next/router';

import { ChatBar } from "./ChatBar";
import { Message } from "./Message";
import { Settings } from "./Settings";
import { User } from "./User";

// TODO: remove react-dropzone dependency and implement ImageBox from scratch
import { useDropzone } from "react-dropzone";


export function FootBar({
  }) {

    const user = User.use.getState()
    const router = useRouter();

    const [setChatBarHidden] = ChatBar.use((state) => [
      state.setHidden,
    ]);

    const [hidden, setHidden] = FootBar.use((state) => [
      state.hidden,
      state.setHidden,
    ]);

    const [settings, setSettings] = Settings.use((state) => [
        state.settings,
        state.setSettings,
      ]);


    function handleChoice( 
        pix2pix: boolean
    ) {
        // setHidden(true)
        setSettings({
            ...settings,
            model: pix2pix ? "instruct-pix2pix" : "stable-diffusion-v1-5"
        })
        setChatBarHidden(false)
        router.push("/chat")
    }

    function TextBox(
    ) {
        return (
            <div className={'p-1 grow text-center h-[8rem] rounded-2xl dropCardText opacity-90'} onClick={() => handleChoice(false)} >
                <div className={'dropzone p-1 mt-1 rounded-2xl dtext-white'}>
                    <h1 className={'text-xl font-bold'}>
                        SD-1.5: Start from text
                    </h1>
                    <p className={'m-1'}>
                        Generate a new image from text.
                    </p>
                    <button onClick={() => handleChoice(false)} type="button" className="btn dropCardTextButton h-8 w-48 mt-2 rounded-2xl">
                        Continue to prompt
                    </button>
                </div>
            </div>
        );
    }

    function ImageBox(
        ) {
            function onDrop(
                acceptedFile: Blob[]
                ) {
                const file = acceptedFile[0]
                var reader = new FileReader();
              
                reader.onloadend = function() {
                    if (reader.result && typeof(reader.result) == 'string') {
                        Message.addImageMessage(reader.result, user);
                        handleChoice(true)
                    }
    
                };
              
                reader.readAsDataURL(file);
            };
          
            const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
            useDropzone({
            accept: {
                'image/png': ['.png'],
                'image/jpg': ['.jpg'],
                'image/jpeg': ['.jpeg'],
            },
            onDrop,
            });
        
            return (
                <div className={'p-8 grow text-center  rounded-2xl dropCard opacity-90'}>
                    <div {...getRootProps({ className: "dropzone p-4 rounded-2xl dtext-white border-dashed border-2 border-slate-300" })}>
                        <input {...getInputProps()} />
                        <h1 className={'text-xl font-bold'}>
                         🔥 Your selfie in a famous art style 🔥
                        </h1>
                        <p className={'m-4'}>
                            {"Send us a selfie and we'll make it UNREAL !"}
                        </p>
                        <button type="button" className="btn dropCardButton h-14 w-48 m-1 rounded-2xl">
                            Click to take a selfie / upload one
                        </button>
                    </div>
                </div>
            );
        }

    return (
        <>
            {true ?
                <div className="flex flex-row justify-evenly gap-x-10 m-5 mx-auto">
                    <ImageBox></ImageBox>
                    {/* <TextBox></TextBox> */}
                </div>
            :
                <></>
            }
        </>
    )
        

}


export function SmallImageBox(
    ) {
        function onDrop(
            acceptedFile: Blob[]
            ) {
            console.log("drop")
            const file = acceptedFile[0]
            var reader = new FileReader();
          
            reader.onloadend = function() {
                if (reader.result && typeof(reader.result) == 'string') {
                    console.log("drop")
                }

            };
          
            reader.readAsDataURL(file);
        };
      
        const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop,
        });
    
        return (
            <div {...getRootProps({ className: "dropzone dropCard w-[30] p-3 w-40 mx-5 rounded" })}>
                    <input {...getInputProps()} />
                    <p className={'m-4'}>
                        {"Drop to share"}
                    </p>
            </div>
        );

    }





export type FootBar = {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
};

export namespace FootBar {
  export const use = create<FootBar>()((set) => ({
    hidden: false,
    setHidden: (hidden: boolean) => set((state: FootBar)=> ({ hidden }))
  }));
}
