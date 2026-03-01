import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { EmojiBar } from "../EmojiBar/EmojiBar";

export function TextInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div>
      <EmojiBar setValue={setValue} />

      <SimpleMDE
        value={value}
        onChange={setValue}
        options={{
          spellChecker: false,
          status: false,
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
