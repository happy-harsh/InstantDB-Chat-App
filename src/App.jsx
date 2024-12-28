import React from "react";
import "./styles/App.css";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import { useChat } from "./context/ChatContext";
import CreateContactForm from "./components/CreateContactForm";

export default function App() {
  const { isAuth, selectedContact, user, dispatch } = useChat();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <>
      {!isAuth ? (
        <CreateContactForm />
      ) : (
        <div className="mainContainer">
          <div className="topNav">
            <h1 className="title">HelloCat</h1>
            <div className="user-info">{user?.name}</div>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="container">
            <div className="contactListContainer">
              <ContactList />
            </div>
            <div className="chatWindowContainer">
              <ChatWindow />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
