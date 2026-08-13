import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/api/ai/chat`;

export interface AIChatRequest {
  question: string;
}

export const sendAIMessage = (question: string) => {
  return axios.post(API_URL, {
    question,
  });
};
