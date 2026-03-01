import { useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.init();

    const user = netlifyIdentity.currentUser();
    if (user) {
      setUser(user);
    }

    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
    });
  }, []);

  const displayName =
  user?.user_metadata?.full_name ||
  user?.user_metadata?.name ||
  user?.email ||
  "User";

return (
  <div style={{ padding: "2rem" }}>
    <h1>Pastel Chat</h1>

    {!user ? (
      <button onClick={() => netlifyIdentity.open()}>
        Login / Sign up
      </button>
    ) : (
      <>
        <p>Welcome {displayName}</p>
        <button onClick={() => netlifyIdentity.logout()}>
          Logout
        </button>
      </>
    )}
  </div>
);
