import React from "react";
import create from "zustand";

import { ChatBar } from "./ChatBar";
import { Message } from "./Message";
import { Settings } from "./Settings";

// TODO: remove react-dropzone dependency and implement ImageBox from scratch
import { useDropzone } from "react-dropzone";


export function SideBar({
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
            <div onClick={() => handleChoice(false)} className={'mb-6 p-1 text-center h-[8rem] w-[17rem] rounded-2xl dropCardText opacity-90'}>
                <div className={'dropzone p-1 mt-1 rounded-2xl dtext-white'}>
                    <h1 className={'text-xl font-bold'}>
                        Stable Diffusion 1.5
                    </h1>
                    <p className={'m-1'}>
                        Start from plain english.
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
                <div className={'p-1 text-center h-[8rem] w-[17rem] rounded-2xl dropCard opacity-90'}>
                    <div {...getRootProps({ className: "dropzone p-1 mt-1 rounded-2xl dtext-white border-dashed border-2 border-slate-300" })}>
                        <input {...getInputProps()} />
                        <h1 className={'text-xl font-bold'}>
                            Instruct Pix2Pix
                        </h1>
                        <p className={'m-1'}>
                            Drag and drop an image to edit it.
                        </p>
                        <button type="button" className="btn dropCardButton h-8 w-48 m-1 rounded-2xl">
                            Click to select an image
                        </button>
                    </div>
                </div>
            );

        }
    

    return (
        <>
            {!hidden ?
                <div className="flex flex-row w-full justify-evenly">
                    <ImageBox></ImageBox>
                    <TextBox></TextBox>
                </div>
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
