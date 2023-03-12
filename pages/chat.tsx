import React from "react";
import { useState, useEffect } from 'react'

import { ChannelTop } from "../components/ChannelTop";
import { ChatBar } from "../components/ChatBar";
import { MessageList } from "../components/MessageList";
import { FootBar } from "../components/FootBar"
import { User } from '../components/User'

import { redirectToLogin } from '../utils/protectRoutes'

// if not logged in redirect to /user for user to log in
//export const getServerSideProps = redirectToLogin


export default function Chat() {
  const inputContainer = React.useRef<HTMLDivElement>(null);
  const mainConatiner = React.useRef<HTMLDivElement>(null);
  
  let [user, setUser] = useState({
    id: 11111,
    name: "John Doe"
  })

  useEffect(() => {
      const retrieved = JSON.parse(
          window.localStorage.getItem("UnrealUser") || "John Doe"
          )
      setUser(retrieved)
    }, [])


  React.useEffect(() => {
    if (mainConatiner.current && inputContainer.current) {
      mainConatiner.current.style.marginTop = `calc(100vh - ${425}px)`;
    }

    const ubnsub = MessageList.use.subscribe(() => {
      setTimeout(() => {
        if (mainConatiner.current && inputContainer.current) {
          mainConatiner.current.style.marginBottom = `${
            inputContainer.current.offsetHeight + 10
          }px`;
        }

        window.scrollTo({
          behavior: "smooth",
          top: document.body.scrollHeight,
        });
      }, 100);
    });

    return () => {
      ubnsub();
    };
  }, [
    inputContainer.current?.offsetHeight,
    mainConatiner.current?.offsetHeight,
  ]);

  return (
    <>
      <main className="flex flex-col gap-1 w-full items-start" ref={mainConatiner}>
          {/* <ChannelTop /> */}
          <MessageList />
      </main>

      <div className="fixed bottom-0 w-screen"
           ref={inputContainer}>

        {/* 1 showing at the time depending on state */}
        <ChatBar/>
        {/* <FootBar/> */}
      </div>
    </>
  );
}