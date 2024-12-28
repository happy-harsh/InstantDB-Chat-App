import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { useInstantDB } from "../hooks/useInstantDb";

const ChatContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: !!localStorage.getItem("user"),
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    case "INIT":
      return {
        ...state,
        user: action.payload,
        isAuth: !!action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const ChatProvider = ({ children }) => {
  const db = useInstantDB();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [selectedContact, setSelectedContact] = useState([]);
  // Query for messages
  const {
    isLoading: messageLoading,
    error: messageError,
    data: messageData,
  } = db.useQuery({ messages: {} });

  // Query for contacts
  const {
    isLoading: contactLoading,
    error: contactError,
    data: contactData,
  } = db.useQuery({
    contacts: {},
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "INIT", payload: user });
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user: state.user,
        isAuth: state.isAuth,
        dispatch,

        messageList: messageData?.messages || [],
        messageLoading,
        messageError,
        contactList: contactData?.contacts || [],
        contactLoading,
        contactError,
        selectedContact,
        setSelectedContact,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
