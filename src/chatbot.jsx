import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { IoChatbubble } from "react-icons/io5";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  function toggleChat() {
    setIsOpen(prev=>!prev);
  }
  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

    const geminiMessages = [
          {
          role: "user",
          parts: [{ text: `You are a chatbot for The Sisterhood, a website dedicated to providing better access
                          to feminine health and safety knowledge, a way for women to connect and share their
                          stories, and potential resources. The website contains the following tabs: 'Home', 'Resources',
                          'Forum', 'Map', and 'About'. The 'Map' section contains a map with filters to resources
                          such as OBGYN clinics and women's shelters. The 'Resources' section has topics ranging from
                          sexual health, periods, pregnancy, domestic violence, and menopause. The 'Forum' section
                          allows for users to post their thoughts, fears, and confessions for their peers to see. Your main
                          goal is to discuss and explain topics relating to women (e.g., specific period questions) as well
                          as provide support. If a user is venting, do not immediately try to fix their problem until
                          asked to; instead, offer kind words and emotional understanding (and also maintain a gentle tone
                          without any emojis). If a user is excited about
                          something, be excited with them, provided the content is not inappropriate. Always try to relate
                          to the user (but do not hallucinate personal examples as you are still a chatbot) and try to ask
                          follow-up questions to make the user feel welcomed, especially if they say a statement or share a story.
                          Keep responses brief, between 50-100 words (but can be above or below by 20 words), unless
                          directed by the user for a more detailed explanation of something. Always be kind to the
                          user; if they say something derogatory or inappropriate, redirect the conversation and
                          politely ask them to stop. You can match the user's tone, but never overuse emojis, capitalization,
                          or demeaning words.` }]
          },
          ...updatedMessages.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }))
        
        ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: geminiMessages
      });
    
    const botReply = response.text || "Sorry, I couldn't generate a response.";
      console.log("AI Response:", response.text);

    const assistantMessage = { role: "assistant", content: botReply };
    setMessages(prev => [...prev, assistantMessage]);
    setInput("");
    }

  return (
    <div>
      {/* ICON BUTTON */}
      <button 
        onClick={toggleChat} style={{ position: "fixed", bottom: "20px", right: "20px", width: "60px", height: "60px", borderRadius: "50%", background: "#e69494", color: "white", fontSize: "24px", border: "none", cursor: "pointer" }} >
        <IoChatbubble size = {20} />
      </button>

      {/* CHATBOX (only appears when isOpen === true) */}
      {isOpen && (
        <div style={{ position: "fixed", bottom: "100px", right: "20px", width: "300px", height: "400px", background: "white", border: "1px solid #ccc", borderRadius: "10px", padding: "1rem", display: "flex", flexDirection: "column" }} >
          <h3>The Sisterhood Chatbot</h3>

          <div style={{ flex: 1, overflowY: "auto", border: "1px solid #eee", padding: "0.5rem", marginBottom: "0.5rem" }} >
            {messages.map((m, i) => (
              <p key={i}>
                <strong>{m.role}:</strong> {m.content}
              </p>
            ))}
          </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        style = {{marginBottom: "0.5rem"}}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
      )}
    </div>
  );
}
;
