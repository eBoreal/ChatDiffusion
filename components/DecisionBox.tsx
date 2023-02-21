import React from "react";
import create from "zustand";

import { ChatBar } from "./ChatBar";
import { Message } from "./Message";
import { Settings } from "./Settings";

// TODO: remove react-dropzone dependency and implement ImageBox from scratch
import { useDropzone } from "react-dropzone";


export function DecisionBox({
  }) {

    const [chatBarHidden, setChatBarHidden] = ChatBar.use((state) => [
      state.hidden,
      state.setHidden,
    ]);

    const [hidden, setHidden] = DecisionBox.use((state) => [
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
        setHidden(true)
        setSettings({
            ...settings,
            model: pix2pix ? "instruct-pix2pix" : "stable-diffusion-v1-5"
        })
        setChatBarHidden(false)
    }

    function TextBox(
    ) {
        return (
            <div onClick={() => handleChoice(false)} className={'w-9/12 m-5 p-5 text-center mr-auto max-w-[30rem] rounded-3xl dropCardText opacity-90'}>
                <div className={'rounded-2xl border-dashed border-2 border-slate-300'}>
                <div className={"dropzone p-2 rounded-l dtext-white"}>
                    <h1 className={'text-4xl font-bold'}>
                        Text to Image
                    </h1>
                    <p className={'m-2'}>
                        Choose this to generate a new image from a text prompt
                    </p>
                    <button onClick={() => handleChoice(false)} type="button" className="btn dropCardTextButton h-12 w-48 m-2 rounded-2xl">
                        Continue to prompt
                    </button>
    
                </div>
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
                        Message.addImageMessage(reader.result);
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
                <div className={'w-9/12 m-5 p-5 text-center ml-auto max-w-[30rem] rounded-3xl dropCard opacity-90'}>
                    <div className={'rounded-2xl border-dashed border-2 border-slate-300'}>
                    <div {...getRootProps({ className: "dropzone p-2 rounded-l dtext-white" })}>
                        <input {...getInputProps()} />
                        <h1 className={'text-4xl font-bold'}>
                            Image to Image
                        </h1>
                        <p className={'m-2'}>
                            Drag and drop an image to edit it with prompts
                        </p>
                        <button type="button" className="btn dropCardButton h-12 w-48 m-2 rounded-2xl">
                            Click to select an image
                        </button>
            
                    </div>
                    </div>
                </div>
            );

        }

    return (
        <>
            {!hidden ?
                <>
                    <ImageBox></ImageBox>
                    <TextBox></TextBox>
                </>
            :
                <></>
            }
        </>
    )
    

}

export type DecisionBox = {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
};

export namespace DecisionBox {
  export const use = create<DecisionBox>()((set) => ({
    hidden: false,
    setHidden: (hidden: boolean) => set((state: DecisionBox)=> ({ hidden }))
  }));
}
