export const EmojiBar = ({ setValue }) => {
  const emojis = ["😀", "😂", "😍", "🔥", "👍", "🎉", "💜", "🚀"];

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => setValue((prev) => prev + emoji)}
          style={{
            fontSize: "1.2rem",
            marginRight: "4px",
            cursor: "pointer",
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};
