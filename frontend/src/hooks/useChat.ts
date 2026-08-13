import { useState } from "react";

import type { ChatMessage } from "../types/Chat";

import { portfolioKnowledge } from "../data/portfolioKnowledge";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "assistant",
      text: "👋 Hello! I'm Rajeev's AI Portfolio Assistant.\n\nAsk me anything about Rajeev's experience, projects, technical skills, certifications, resume or contact information.",
      timestamp: new Date(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const findAnswer = (question: string): string => {
    const input = question.toLowerCase().trim();

    for (const item of portfolioKnowledge) {
      const matched = item.keywords.some((keyword) =>
        input.includes(keyword.toLowerCase()),
      );

      if (matched) {
        return item.answer;
      }
    }

    return (
      "I'm sorry, I couldn't find information related to that question.\n\n" +
      "You can ask me about:\n\n" +
      "• Professional Experience\n" +
      "• Enterprise Projects\n" +
      "• Java\n" +
      "• Spring Boot\n" +
      "• Microservices\n" +
      "• AWS\n" +
      "• Docker\n" +
      "• Kubernetes\n" +
      "• React\n" +
      "• Certifications\n" +
      "• Resume\n" +
      "• Contact Information"
    );
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((previous) => [...previous, userMessage]);

    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text: findAnswer(text),
        timestamp: new Date(),
      };

      setMessages((previous) => [...previous, assistantMessage]);

      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: "assistant",
        text: "👋 Hello! I'm Rajeev's AI Portfolio Assistant.\n\nAsk me anything about Rajeev's experience, projects, technical skills, certifications, resume or contact information.",
        timestamp: new Date(),
      },
    ]);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  };
}
