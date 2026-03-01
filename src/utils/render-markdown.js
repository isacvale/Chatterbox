import { marked } from "marked";
import DOMPurify from "dompurify";

export const renderMarkdown = (text) => {
  const raw = marked(text ?? "");
  return { __html: DOMPurify.sanitize(raw) };
};
