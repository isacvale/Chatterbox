import { renderMarkdown } from "../../utils/render-markdown";

export const Message = ({ msg }) => {
  if (msg.type === "system") {
    return (
      <div className="system-message">
        <div dangerouslySetInnerHTML={renderMarkdown(msg.text)} />
      </div>
    );
  }

  return (
    <div className="chat-message">
      <strong>{msg.user}: </strong>
      <div dangerouslySetInnerHTML={renderMarkdown(msg.text)} />
    </div>
  );
};
