import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";
import "../assests/css/app.css";

const FloatingChatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => setUserInput(e.target.value);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
    setIsLoading(true);

    try {
      const instruction = `You are SmartInsure's virtual assistant. 
Only answer questions related to SmartInsure's insurance plans, services, booking process, pricing, policies, or related queries. 
If the question is not related to SmartInsure, politely respond: "I'm here to assist you with SmartInsure-related queries only!"`;

      const prompt = `${instruction}\n\nUser: ${userInput}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        💬
      </button>

      {isOpen && (
        <div className="w-96 h-[520px] bg-white rounded-xl shadow-2xl p-4 mt-4 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-blue-700">SmartInsure Chatbot</h2>
            <button
              onClick={toggleChat}
              className="text-red-500 text-xl font-bold hover:text-red-600"
            >
              ✖
            </button>
          </div>

          <div className="flex-grow overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-300">
            <ChatHistory chatHistory={chatHistory} />
            <Loading isLoading={isLoading} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition disabled:opacity-50"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
