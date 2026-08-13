import { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

import "./ChatBot.css";

import ChatInput from "./ChatInput";
import ChatMessageComponent from "./ChatMessage";

import type { ChatMessage as Message } from "../models/ChatMessage";

import { sendMessage } from "../api/chatbotApi";

function ChatBot() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text:
        "👋 Hello! I'm Rajeev's AI Assistant. Ask me anything about Rajeev's experience, skills, projects, certifications or education.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const handleSend = async (text: string) => {

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTyping(true);

    try {

      const response = await sendMessage(text);

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {

      const botMessage: Message = {
        id: Date.now() + 2,
        sender: "bot",
        text:
          "Sorry, I'm currently unavailable. Please try again shortly.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);

    } finally {

      setTyping(false);

    }
  };

  return (
    <>

      {!open && (

        <button
          className="chat-floating-button"
          onClick={() => setOpen(true)}
        >
          <FaRobot />
        </button>

      )}

      {open && (

        <div className="chat-window">

          <div className="chat-header">

            <div>

              <h3>Rajeev AI</h3>

              <small>Online</small>

            </div>

            <button
              onClick={() => setOpen(false)}
            >
              <FaTimes />
            </button>

          </div>

          <div className="chat-body">

            {messages.map((message) => (

               <ChatMessageComponent
    key={message.id}
    message={message}
  />

            ))}

            {typing && (

              <div className="typing-indicator">

                AI is typing...

              </div>

            )}

            <div ref={messagesEndRef}></div>

          </div>

          <ChatInput onSend={handleSend} />

        </div>

      )}

    </>
  );
}

export default ChatBot;