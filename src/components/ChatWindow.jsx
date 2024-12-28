import React from "react";
import MessageInput from "./MessageInput";
import { useChat } from "../context/ChatContext";
import { useInstantDB } from "../hooks/useInstantDb";
import MessageContainer from "./MessageContainer";

const ChatWindow = () => {
  const db = useInstantDB();
  const { user, selectedContact } = useChat();

  // No selected contact or no messages
  if (!selectedContact || !selectedContact.id) {
    console.warn("No contact selected.");
    return <p>Please select a contact to view messages.</p>;
  }

  return (
    <div className="chat-window">
      <div className="chat-top">
        <div className="contact-avatar">
          {selectedContact.name.charAt(0).toUpperCase()}
        </div>
        <div className="contact-name">{selectedContact.name}</div>
      </div>
      {/* Display messages */}
      <MessageContainer />
      {/* Message input */}
      <div className="message-input-container">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;
