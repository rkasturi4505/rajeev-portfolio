import { useEffect, useRef, useState } from "react";
import { FaRobot, FaUser, FaPaperPlane, FaStar } from "react-icons/fa6";

import { sendAIMessage } from "../../api/aiApi";

import "./AIAssistant.css";

interface ChatMessage {
  id: number;
  sender: "user" | "assistant";
  message: string;
}

function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "assistant",
      message:
        "Hello! I'm Rajeev AI Assistant. Ask me about Rajeev's experience, technical skills, projects, certifications, or professional background.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // ==========================================================
  // AUTO SCROLL
  // ==========================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ==========================================================
  // SEND MESSAGE
  // ==========================================================

  const handleSendMessage = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      message: trimmedQuestion,
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await sendAIMessage(trimmedQuestion);

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        message:
          response.data || "I couldn't generate a response at the moment.",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        message:
          "I'm unable to connect to the AI service right now. Please try again in a moment.",
      };

      setMessages((previousMessages) => [...previousMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // ENTER KEY
  // ==========================================================

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // ==========================================================
  // SUGGESTED QUESTIONS
  // ==========================================================

  const handleSuggestion = (suggestion: string) => {
    setQuestion(suggestion);
  };

  const suggestions = [
    "Tell me about Rajeev's experience",
    "What are Rajeev's technical skills?",
    "Show me Rajeev's projects",
    "What certifications does Rajeev have?",
  ];

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <section className="ai-assistant-section">
      <div className="ai-assistant-container">
        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="ai-section-heading">
          <span className="ai-section-label">AI ASSISTANT</span>

          <h2>Rajeev AI Assistant</h2>

          <p>
            Ask me about Rajeev's professional experience, technical expertise,
            projects, and career background.
          </p>
        </div>

        {/* ==================================================
            ASSISTANT CARD
        ================================================== */}

        <div className="ai-assistant-card">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="ai-assistant-header">
            <div className="ai-header-icon">
              <FaRobot />
            </div>

            <div className="ai-header-content">
              <h3>Rajeev AI Assistant</h3>

              <p>Your guide to Rajeev's professional portfolio.</p>
            </div>

            <div className="ai-status">
              <span className="ai-status-dot"></span>

              <span>Online</span>
            </div>
          </div>

          {/* ==================================================
              CHAT AREA
          ================================================== */}

          <div className="ai-chat-area">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message-row ${
                  message.sender === "user"
                    ? "user-message-row"
                    : "assistant-message-row"
                }`}
              >
                {/* ASSISTANT ICON */}

                {message.sender === "assistant" && (
                  <div className="ai-message-icon">
                    <FaRobot />
                  </div>
                )}

                {/* MESSAGE */}

                <div
                  className={`ai-message ${
                    message.sender === "user"
                      ? "user-message"
                      : "assistant-message"
                  }`}
                >
                  <p>{message.message}</p>
                </div>

                {/* USER ICON */}

                {message.sender === "user" && (
                  <div className="user-message-icon">
                    <FaUser />
                  </div>
                )}
              </div>
            ))}

            {/* ==================================================
                TYPING INDICATOR
            ================================================== */}

            {loading && (
              <div className="ai-message-row assistant-message-row">
                <div className="ai-message-icon">
                  <FaRobot />
                </div>

                <div className="ai-message assistant-message typing-message">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ==================================================
              SUGGESTIONS
          ================================================== */}

          <div className="ai-suggestions">
            <div className="suggestion-title">
              <FaStar />

              <span>Suggested questions</span>
            </div>

            <div className="suggestion-list">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="suggestion-btn"
                  onClick={() => handleSuggestion(suggestion)}
                  disabled={loading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* ==================================================
              INPUT AREA
          ================================================== */}

          <div className="ai-input-area">
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Rajeev's skills, experience, projects..."
              disabled={loading}
              aria-label="Ask Rajeev AI Assistant"
            />

            <button
              type="button"
              className="ai-send-btn"
              onClick={handleSendMessage}
              disabled={!question.trim() || loading}
              aria-label="Send message"
            >
              <FaPaperPlane />

              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIAssistant;
