import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";
export default function FeedbackForm({
  handleAddToList,
}: {
  handleAddToList: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const remainingCharacters = MAX_CHARACTERS - text.length;
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };
  const isValid = (text: string) => {
    const match = text.match(/#[a-zA-Z]+/);
    return match && text.length > 5;
  };

  return (
    <form
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
      onSubmit={(e) => {
        e.preventDefault();

        if (isValid(text)) {
          setShowValidIndicator(true);
          setShowInvalidIndicator(false);
          handleAddToList(text);
          setText("");
        } else {
          setShowValidIndicator(false);
          setShowInvalidIndicator(true);
          setTimeout(() => {
            setShowInvalidIndicator(false);
          }, 2000);
          return;
        }

        handleAddToList(text);
        setText("");
      }}
    >
      <textarea
        id="feedback-textarea"
        onChange={handleChange}
        value={text}
        placeholder="placeholder"
        spellCheck={false}
      />
      <label htmlFor="feedback-textareak">
        Enter Your feedback , remember to # the company
      </label>
      <div>
        <p className="u-italic">{remainingCharacters}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
