import { useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.init();

    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
    });

    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <div className="container">
      <h1>Pastel Chat</h1>

      {!user ? (
        <button onClick={() => netlifyIdentity.open()}>Login / Sign up</button>
      ) : (
        <>
          <p>Welcome {user.user_metadata.full_name}</p>
          <button onClick={() => netlifyIdentity.logout()}>Logout</button>
        </>
      )}
    </div>
  );
}
