import { useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import "./App.css";
import { sendMessage } from "./utils/send-message";
import { Chat } from "./components/Chat/Chat";

export default function App() {
  const [user, setUser] = useState(null);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    "User";

  useEffect(() => {
    netlifyIdentity.init();

    const user = netlifyIdentity.currentUser();
    if (user) {
      setUser(user);
    }

    netlifyIdentity.on("login", (user) => {
      const displayName =
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.email ||
        "User";

      sendMessage({
        text: `${displayName} joined`,
        type: "system",
        displayName,
      });
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on("logout", () => {
      const displayName =
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.email ||
        "User";

      sendMessage({ text: `${displayName} left`, type: "system", displayName });
      setUser(null);
    });
  }, []);

  const isLoggedIn = !!user;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Pastel Chat</h1>

      {!user ? (
        <button onClick={() => netlifyIdentity.open()}>Login / Sign up</button>
      ) : (
        <>
          <p>Welcome {displayName}</p>
          <button onClick={() => netlifyIdentity.logout()}>Logout</button>
        </>
      )}

      {isLoggedIn && <Chat user={user} />}
    </div>
  );
}
