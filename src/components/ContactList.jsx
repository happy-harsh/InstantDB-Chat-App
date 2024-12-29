import React from "react";
import { useChat } from "../context/ChatContext";

const ContactList = () => {
  const {
    contactList,
    contactLoading,
    contactError,
    selectedContact,
    setSelectedContact,
    user, 
  } = useChat();

  if (contactLoading) {
    console.log("Loading contact list...");
    return <p>Loading contacts...</p>;
  }

  if (contactError) {
    console.error("Error fetching contacts:", contactError);
    return <p>Error fetching contacts</p>;
  }

  if (!contactList.length) {
    console.warn("No contacts available.");
    return <p>No contacts available</p>;
  }

  const filteredContactList = contactList.filter(
    (contact) => contact.id !== user?.id
  );

  console.log("Filtered contact list:", filteredContactList);

  return (
    <div >
      <div className="contact-list-header">Contacts</div>
      <ul className="contact-list">
        {filteredContactList?.map((contact) => (
          <li
            key={contact.id}
            onClick={() => {
              console.log("Selected contact:", contact);
              setSelectedContact(contact);
            }}
            className={`contact-list-item ${
              selectedContact?.id === contact.id ? "selected" : ""
            }`}
          >
            <div className="contact-avatar">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <span className="contact-name">{contact.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
