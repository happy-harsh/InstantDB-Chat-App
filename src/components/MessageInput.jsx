import React, { useState } from "react";
import { useChat } from "../context/ChatContext";
import { useCrud } from "../hooks/useCrud";

export default function MessageInput() {
  const { user, selectedContact } = useChat();
  const { sendMessage } = useCrud();
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text.trim() === "") return;
    console.log(text, user.id, selectedContact.id);
    await sendMessage(text, user.id, selectedContact.id);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
