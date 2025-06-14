import { useState } from "react"
import { MAX_CHARACTERS} from "../../lib/constants"
export default function FeedbackForm({ handleAddToList }: { handleAddToList: (text: string) => void }) {
  const [text,setText] = useState("");
  const remainingCharacters = MAX_CHARACTERS - text.length;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const newText = e.target.value;
        if (newText.length>MAX_CHARACTERS){
          return;
        }
        setText(newText);
        }
  return (
    <form className="form" onSubmit={(e)=>{
      e.preventDefault();
      handleAddToList(text);
      setText("");
    }}>
      <textarea id="feedback-textarea" onChange={handleChange} value={text} placeholder="placeholder" spellCheck={false}/>
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
  )
}