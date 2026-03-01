export const sendMessage = async ({ text, type = "message", displayName }) => {
  await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      user: displayName,
      type,
    }),
  });
};
