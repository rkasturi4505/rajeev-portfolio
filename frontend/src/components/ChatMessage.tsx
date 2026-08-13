import type { ChatMessage } from "../models/ChatMessage";

interface Props {
  message: ChatMessage;
}

function ChatMessageComponent({ message }: Props) {
  return (
    <div
      className={
        message.sender === "user"
          ? "user-message"
          : "bot-message"
      }
    >
      <p>{message.text}</p>
      <small>{message.timestamp}</small>
    </div>
  );
}

export default ChatMessageComponent;