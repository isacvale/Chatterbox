export const fetchMessages = async ({
  setMessages,
  setLastTimestamp,
  lastTimestamp,
}) => {
  const res = await fetch(`/.netlify/functions/chat?since=${lastTimestamp}`);

  const newMessages = await res.json();

  if (newMessages.length) {
    setMessages((prev) => {
      const updated = [...prev, ...newMessages];

      localStorage.setItem("chat", JSON.stringify(updated));

      setLastTimestamp(newMessages[newMessages.length - 1].timestamp);

      return updated;
    });
  }
};
