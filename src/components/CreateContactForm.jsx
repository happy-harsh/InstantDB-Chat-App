import React, { useState, useEffect } from "react";
import { useCrud } from "../hooks/useCrud";
import { useChat } from "../context/ChatContext";
import { useInstantDB } from "../hooks/useInstantDb";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf();

export default function CreateContactForm() {
  const db = useInstantDB();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser } = useCrud();
  const { dispatch } = useChat();

  const { isLoading, error, data } = db.useQuery({
    contacts: {
      $: {
        where: {
          email: email,
        },
      },
    },
  });

  useEffect(() => {
    if (email === "") {
      setIsLogin(true);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        if (
          data?.contacts.length > 0 &&
          password === data.contacts[0].password
        ) {
          notyf.success("Login successful");
          dispatch({ type: "LOGIN", payload: data.contacts[0] });
        } else {
          notyf.error("Invalid credentials");
        }
      } else {
        const dateCreated = new Date().toISOString();
        const id = await createUser(name, email, password, dateCreated);
        const newUser = { id, name, email, dateCreated };
        dispatch({ type: "LOGIN", payload: newUser });
        notyf.success("Signup successful");
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      notyf.error(`Error during ${isLogin ? "login" : "signup"}: ${err.message}`);
    }
  };

  return (
    <div className="authContainer">
      <div className="auth-form">
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>
        {error && notyf.error(`Error fetching contacts: ${error.message}`)}
        <button
          className="toggle-auth"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
}
