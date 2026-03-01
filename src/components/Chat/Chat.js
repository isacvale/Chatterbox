import { useState } from "react";
import { fetchMessages } from "../../utils/fetch-messages";

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
    const stored = localStorage.getItem("chat");
    if (stored) {
      const parsed = JSON.parse(stored);
      setMessages(parsed);

      if (parsed.length) {
        setLastTimestamp(parsed[parsed.length - 1].timestamp);
      }
    }

    // Announce join
    sendMessage(`${displayName} joined`, "system");

    const interval = setInterval(
      () => fetchMessages({ setMessages, setLastTimestamp, lastTimestamp }),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.type === "system" ? "system-message" : "chat-message"
            }
          >
            {msg.type !== "system" && <strong>{msg.user}: </strong>}
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};
