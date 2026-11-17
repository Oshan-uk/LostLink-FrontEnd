import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  X,
  Send,
  Sparkles,
  MessageCircle,
  Plus,
  LoaderCircle,
  MapPin,
  CalendarDays,
  Package,
  ArrowUpRight,
} from "lucide-react";

import {
  sendAIMessage,
  type AIChatItem,
} from "../services/ai.service";

import "./AIChatbot.css";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  items?: AIChatItem[];
}

const suggestedQuestions = [
  "How many lost and found items are available?",
  "Are there any lost mobile phones in Colombo?",
  "How can I report a lost item?",
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! 👋 Welcome to LostLink. I'm your AI assistant. I can help you find lost items, explore found reports, check item statistics, and understand how LostLink works. How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Send message to backend AI API
  const handleSendMessage = async (text?: string) => {
    const userMessage = (text ?? message).trim();

    if (!userMessage || isLoading) {
      return;
    }

    const userChatMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
    };

    setMessages((previous) => [
      ...previous,
      userChatMessage,
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await sendAIMessage(userMessage);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
        items: response.items ?? [],
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I'm sorry! I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle Enter key
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSendMessage();
    }
  };

  // Start a new conversation
  const handleNewChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello again! 👋 What would you like to know about LostLink?",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="ll-ai-container">

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          type="button"
          className="ll-ai-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open LostLink AI Assistant"
        >
          <MessageCircle size={27} />

          <span className="ll-ai-button-pulse" />

          <span className="ll-ai-floating-tooltip">
            Ask LostLink AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ll-ai-window">

          {/* Header */}
          <div className="ll-ai-header">

            <div className="ll-ai-header-info">

              <div className="ll-ai-avatar">
                <Bot size={24} />
                <span className="ll-ai-online-dot" />
              </div>

              <div>
                <h3>LostLink AI</h3>

                <p>
                  <span className="ll-ai-status-dot" />
                  Online Assistant
                </p>
              </div>

            </div>

            <div className="ll-ai-header-actions">

              <button
                type="button"
                onClick={handleNewChat}
                title="New conversation"
                aria-label="New conversation"
              >
                <Plus size={19} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chatbot"
                aria-label="Close chatbot"
              >
                <X size={20} />
              </button>

            </div>

          </div>

          {/* Chat Body */}
          <div className="ll-ai-body">

            {/* Welcome Badge */}
            <div className="ll-ai-welcome-badge">
              <Sparkles size={13} />
              Powered by Gemini AI
            </div>

            {/* Messages */}
            <div className="ll-ai-messages">

              {messages.map((chatMessage) => (
                <div
                  key={chatMessage.id}
                  className={`ll-ai-message ll-ai-${chatMessage.role}`}
                >

                  {chatMessage.role === "assistant" && (
                    <div className="ll-ai-message-avatar">
                      <Bot size={17} />
                    </div>
                  )}

                  <div className="ll-ai-message-content">

                    <div className="ll-ai-message-bubble">
                      {chatMessage.content}
                    </div>

                    {/* Matching Item Cards */}
                    {chatMessage.items &&
                      chatMessage.items.length > 0 && (
                        <div className="ll-ai-results">

                          <div className="ll-ai-results-heading">
                            <Package size={16} />
                            <span>
                              Matching Items (
                              {chatMessage.items.length}
                              )
                            </span>
                          </div>

                          {chatMessage.items.map((item) => (
                            <div
                              key={item.id}
                              className="ll-ai-item-card"
                            >

                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="ll-ai-item-image"
                                />
                              ) : (
                                <div className="ll-ai-item-placeholder">
                                  <Package size={25} />
                                </div>
                              )}

                              <div className="ll-ai-item-details">

                                <div className="ll-ai-item-top">
                                  <span
                                    className={`ll-ai-item-type ${item.type}`}
                                  >
                                    {item.type}
                                  </span>

                                  <span className="ll-ai-item-category">
                                    {item.category}
                                  </span>
                                </div>

                                <h4>{item.name}</h4>

                                <p>
                                  <MapPin size={13} />
                                  {[
                                    item.city,
                                    item.district,
                                    item.province,
                                  ]
                                    .filter(Boolean)
                                    .join(", ")}
                                </p>

                                <p>
                                  <CalendarDays size={13} />
                                  {new Date(
                                    item.date,
                                  ).toLocaleDateString()}
                                </p>

                                <Link
                                  to={`/items/${item.id}`}
                                  className="ll-ai-view-item"
                                  onClick={() => setIsOpen(false)}
                                >
                                  View Details
                                  <ArrowUpRight size={14} />
                                </Link>

                              </div>

                            </div>
                          ))}

                        </div>
                      )}

                  </div>

                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="ll-ai-message ll-ai-assistant">

                  <div className="ll-ai-message-avatar">
                    <Bot size={17} />
                  </div>

                  <div className="ll-ai-typing">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>
              )}

              <div ref={messagesEndRef} />

            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && !isLoading && (
              <div className="ll-ai-suggestions">

                <p>Try asking me</p>

                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => {
                      void handleSendMessage(question);
                    }}
                  >
                    <Sparkles size={13} />
                    {question}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* Input Area */}
          <div className="ll-ai-input-area">

            <div className="ll-ai-input-wrapper">

              <input
                ref={inputRef}
                type="text"
                placeholder="Ask anything about LostLink..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={500}
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={() => {
                  void handleSendMessage();
                }}
                disabled={!message.trim() || isLoading}
                aria-label="Send message"
              >
                {isLoading ? (
                  <LoaderCircle
                    size={19}
                    className="ll-ai-spin"
                  />
                ) : (
                  <Send size={18} />
                )}
              </button>

            </div>

            <p className="ll-ai-disclaimer">
              AI responses may not always be accurate.
              Verify item details before taking action.
            </p>

          </div>

        </div>
      )}
    </div>
  );
};

export default AIChatbot;