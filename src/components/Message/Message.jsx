import { renderMarkdown } from "../../utils/render-markdown";

export const Message = ({ msg }) => {
  return (
    <div className={msg.type === "system" ? "system-message" : "chat-message"}>
      {msg.type !== "system" && <strong>{msg.user}: </strong>}
      <div dangerouslySetInnerHTML={renderMarkdown(msg.text)} />
    </div>
  );
};
