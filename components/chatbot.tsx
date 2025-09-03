"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "👋 Welcome to Jode Restaurant! I'm your AI assistant. How can I help you today? 🍽️",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
  
    try {
      // ✅ Send only the latest message to Gemini API
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }), // FIXED
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API returned ${res.status}: ${errorText}`);
      }
  
      const data = await res.json();
  
      if (!data.reply) {
        throw new Error("No reply field in response");
      }
  
      setMessages([...newMessages, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
  
      let errorMessage = "⚠️ Oops! Something went wrong. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "⚠️ Network error. Please check your connection.";
        } else if (error.message.includes("401")) {
          errorMessage = "⚠️ Authentication error. Please contact support.";
        } else if (error.message.includes("429")) {
          errorMessage = "⚠️ Too many requests. Please wait a moment.";
        }
      }
  
      setMessages([...newMessages, { role: "bot", content: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(true)}
          className="bg-neutral-800 p-4 rounded-full shadow-lg/50 hover:bg-neutral-700 transition"
        >
          <Bot className="w-6 h-6 text-white" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="w-80 sm:w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 rounded-t-2xl">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <Bot className="w-5 h-5" /> Jode AI Assistant
              </h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 max-w-[70%] rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-neutral-800 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 bg-gray-200 text-gray-600 text-sm rounded-2xl rounded-bl-none animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center p-3 border-t border-gray-200 bg-white rounded-b-2xl">
              <input
                type="text"
                placeholder="Ask about our menu, offers..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={loading}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="ml-2 p-2 bg-neutral-600 rounded-lg shadow hover:bg-nutral-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;