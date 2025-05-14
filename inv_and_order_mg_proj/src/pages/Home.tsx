import { useEffect, useRef, useState } from "react";
import { useLLMHook } from "../hooks/llmhooks/useLLMHook";
import { ChatMessage } from "../components/types";
import ai from "../images/AMLogo.png";
import user from "../images/wojack.png";

//This needs to be cleaned up

function Home() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync, isError } = useLLMHook();

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      const textarea = textareaRef.current;

      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsChatting(true);
    setInput(" ");

    const userMessage: ChatMessage = { sender: "user", text: input };
    setChat((prevChat) => [...prevChat, userMessage]);
    scrollToBottom();
    try {
      const response = await mutateAsync(input);
      const aiMessage: ChatMessage = { sender: "ai", text: response.response };
      setChat((prevChat) => [...prevChat, aiMessage]);
      scrollToBottom();
    } catch (err) {
      console.error("Error fetching response:", err);
    }
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  function isStructuredText(text: string) {
    // Regex pattern to match: "Item - Quantity units at Location"
    const inventoryPattern = /\w[\w\s]+-\s*\d+\s*units\s*at\s*\w+[-\w]*/g;

    return inventoryPattern.test(text);
  }
  return (
    <div>
      <div>
        {!isChatting ? (
          <div className="hero">
            <div className="triangle-wrapper">
              <div className="triangle-bg"></div>
              <div className="ai-eye"></div>
            </div>
            <div className="content">
              <h1 className="hero-title">Auto Mata</h1>
              <h3 className="hero-text">Inventory Management Assistant</h3>
              <form className="query-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <textarea
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    ref={textareaRef}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isSubmitting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>{" "}
                  </button>
                </div>
              </form>
              {isError && <p className="error">Oops! Something went wrong.</p>}
            </div>
          </div>
        ) : (
          <div>
            <div className="chat-screen">
              <div className="chat-history">
                {chat.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.sender === "ai" ? "ai" : "user"
                    }`}
                  >
                    <div className="profile-pic-wrapper">
                      {message.sender === "ai" &&
                      index === chat.length - 1 &&
                      isChatting ? (
                        <div className="profile-pic-wrapper thinking-glow">
                          <div className="glow-eye" />
                        </div>
                      ) : (
                        <img
                          className="profile-pic"
                          src={message.sender === "ai" ? ai : user}
                          alt={message.sender === "ai" ? "AI" : "User"}
                        />
                      )}
                    </div>
                    {/* Conditionally wrap message text based on its structure */}
                    {isStructuredText(message.text) ? (
                      <pre>{message.text}</pre> // Table-like text
                    ) : (
                      <p>{message.text}</p> // Normal text
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
            <form className="query-form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <textarea
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  ref={textareaRef}
                />
                <button type="submit" disabled={!input.trim()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
