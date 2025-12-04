"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, MessageCircle, X, Send, User, Loader2 } from "lucide-react";
import { chatWithAI } from "@/app/actions"; // Import Server Action

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", content: "Halo! 👋 Saya Asisten Mawar Indah. Ada yang bisa saya bantu mengenai perawatan tanaman Anda hari ini?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke bawah saat ada pesan baru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput(""); // Kosongkan input segera
    
    // 1. Tampilkan pesan user
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsLoading(true);

    try {
      // 2. Panggil AI dari Server Action
      const aiResponse = await chatWithAI(userText);
      
      // 3. Tampilkan balasan AI
      setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "Maaf, terjadi kesalahan koneksi. Silakan coba lagi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? "hidden" : "flex"} fixed bottom-6 right-6 z-40 bg-brand-green text-white p-4 rounded-full shadow-xl hover:bg-emerald-800 transition hover:scale-110 items-center justify-center group`}
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Tanya AI Mawar Indah 🌿
        </span>
      </button>

      {/* Chat Widget Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90%] md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-fade-in font-sans">
          
          {/* Header */}
          <div className="bg-brand-green p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Mawar AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-green-100">Online • Generative AI</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm ${
                  msg.role === "user" 
                    ? "bg-brand-green text-white rounded-br-none" 
                    : "bg-white border border-gray-200 text-gray-700 rounded-bl-none"
                }`}>
                  {/* Render line breaks for AI response */}
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-brand-green" />
                  <span className="text-xs text-gray-500">AI sedang mengetik...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-center bg-gray-100 px-4 py-2 rounded-full focus-within:ring-2 focus-within:ring-brand-green/50 transition">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Tanya soal tanaman..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 text-sm focus:ring-0 text-gray-800 outline-none disabled:opacity-50"
                />
                <button 
                    onClick={handleSend} 
                    disabled={!input.trim() || isLoading}
                    className="text-brand-green p-1.5 rounded-full hover:bg-green-100 disabled:opacity-50 disabled:hover:bg-transparent transition"
                >
                <Send size={18} />
                </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400">AI bisa salah. Selalu cek ulang informasi.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
