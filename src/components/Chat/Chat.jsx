import { useEffect, useState } from "react";
import { fetchMessages } from "../../utils/fetch-messages";
import { Message } from "../Message/Message";
import { TextInput } from "../TextInput.js/TextInput";
import { sendMessage } from "../../utils/send-message";

export const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState(0);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    "User";

  useEffect(() => {
    if (!user) return;

    // Load local history
    const stored = localStorage.getItem(`chat_${user.id}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setMessages(parsed);

      if (parsed.length) {
        setLastTimestamp(parsed[parsed.length - 1].timestamp);
      }
    }

    const interval = setInterval(
      () => fetchMessages({ setMessages, setLastTimestamp, lastTimestamp }),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [user, lastTimestamp, displayName]);

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </div>
      <TextInput onSend={(text) => sendMessage(text, "user", displayName)} />
    </div>
  );
};
