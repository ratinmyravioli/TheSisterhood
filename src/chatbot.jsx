import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage ]);

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
      });
    
    const botReply = response.text || "Sorry, I couldn't generate a response.";
      console.log("AI Response:", response.text);

    const assistantMessage = { role: "assistant", content: botReply };
      setMessages(prev => [...prev, assistantMessage]);
      setInput("");
    }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Chatbot</h2>

      <div style={{ border: "1px solid #ccc", padding: "1rem", height: "200px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.role}:</strong> {m.content}</p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
;
