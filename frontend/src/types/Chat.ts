export interface ChatMessage {
  id: number;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export interface SuggestedQuestion {
  id: number;
  title: string;
  question: string;
}
