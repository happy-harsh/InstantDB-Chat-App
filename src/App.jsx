import React from "react";
import "./styles/App.css";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import { useChat } from "./context/ChatContext";
import CreateContactForm from "./components/CreateContactForm";
import NetworkStatus from "./components/NetworkStatus";
import { useOfflineSync } from "./hooks/useOfflineSync";


export default function App() {
  const { isAuth, selectedContact, user, dispatch } = useChat();

  useOfflineSync()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <>
    <NetworkStatus/>
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
