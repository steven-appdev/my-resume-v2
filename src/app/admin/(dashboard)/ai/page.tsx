"use client";

import { trpc } from "@/trpc/client";
import { ArrowLeftCircle, Bot, Send, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AIDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mutations
  const createExperienceMutation = trpc.experience.create.useMutation();
  const createProjectMutation = trpc.project.create.useMutation();
  const createTechnicalMutation = trpc.technical.create.useMutation();

  // Initialize with a welcome message (client-side only to avoid hydration mismatch)
  useEffect(() => {
    setMessages([
      {
        id: "1",
        content: "Hello! I am your AI assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const currentInput = inputValue;
    const newMessage: Message = {
      id: Date.now().toString(),
      content: currentInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    try {
      const response = await fetch(
        "https://n8n.the-clanker.com/webhook/resume/ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: currentInput }),
        },
      );

      const result = await response.json();

      if (result[0].data) {
        switch (result[0].task_type) {
          case "create-experience":
            await createExperienceMutation.mutateAsync({
              company: result[0].data.company,
              position: result[0].data.position,
              startDate: result[0].data.start_date,
              endDate: result[0].data.end_date || null,
              location: result[0].data.location,
              description: result[0].data.description,
            });
            break;
          case "create-project":
            await createProjectMutation.mutateAsync({
              title: result[0].data.title,
              description: result[0].data.description,
              url: result[0].data.url,
              urlDisplayText: result[0].data.url_display_text,
              tags: result[0].data.tags,
            });
            break;
          case "create-skill":
            await createTechnicalMutation.mutateAsync({
              skill: result[0].data.name,
              proficiency: result[0].data.proficiency,
              imgSrc: result[0].data.url,
            });
          default:
            break;
        }
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          result[0].response ||
          "I received your message but couldn't parse the response.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, something went wrong while connecting to the AI.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="h-[600px] flex flex-col p-4 sm:p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-row items-center gap-5 mb-4 shrink-0">
        <Link href="/admin/dashboard">
          <ArrowLeftCircle className="w-7 h-7 text-white cursor-pointer hover:text-neutral-300 transition-colors" />
        </Link>
        <div className="flex flex-row items-center gap-3">
          <p className="text-white">AI Content Assistant</p>
          <div className="border-2 border-white rounded-lg px-2">
            <p className="text-white text-sm">BETA</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-neutral-900/50 rounded-2xl border border-neutral-700/50 overflow-hidden flex flex-col shadow-xl backdrop-blur-sm">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex w-full ${
                message.sender === "user" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`flex max-w-[85%] sm:max-w-[70%] gap-3 ${
                  message.sender === "user" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.sender === "user" ? "bg-neutral-700" : "bg-blue-600"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl px-5 py-3 text-sm sm:text-base shadow-sm ${
                    message.sender === "user"
                      ? "bg-neutral-800 text-white rounded-tl-none"
                      : "bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-none"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-[10px] mt-1.5 opacity-50 ${
                      message.sender === "user" ? "text-left" : "text-right"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-neutral-800/30 border-t border-neutral-700/50">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-neutral-900/50 border border-neutral-700 hover:border-neutral-600 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-neutral-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-lg flex-shrink-0 flex items-center justify-center min-w-[3rem]"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
