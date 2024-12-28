import React, { useRef, useEffect } from "react";
import { useInstantDB } from "../hooks/useInstantDb";
import { useChat } from "../context/ChatContext";

export default function MessageContainer() {
  const db = useInstantDB();
  const { user, selectedContact } = useChat();
  const endOfMessagesRef = useRef(null); 

 
  const query = {
    messages: {
      $: {
        where: {
          or: [
            { sid: user.id, rid: selectedContact?.id },
            { sid: selectedContact?.id, rid: user.id },
          ],
        },
      },
    },
  };

  const { isLoading, error, data } = db.useQuery(query);


  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data?.messages]);


  if (isLoading) {
    return <div className="message-container">Loading messages...</div>;
  }


  if (error) {
    return <div className="message-container">Error fetching messages: {error.message}</div>;
  }

  return (
    <div className="message-container">
      {!data.messages || data.messages.length === 0 ? (
        "No messages in this conversation yet. Start by sending one!"
      ) : (
        data.messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sid === user.id ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              <strong>
                {message.sid === user.id ? "You" : selectedContact.name}
              </strong>
              <p>{message.message}</p>
              <span className="timestamp">
                {new Date(message.date_created).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
