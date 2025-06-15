import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type TFeedbackItem } from "../../lib/types";
import { useState } from "react";

export default function FeedbackItem({ upvoteCount, badgeLetter, company, text, daysAgo }: TFeedbackItem) {
  const [toggleExpand,setToggleExand] = useState(false);
  const [count,setCount] =useState(upvoteCount);

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.stopPropagation(); 
    e.currentTarget.disabled = true;
    setCount(count+1);
  }

  return (
    <li 
      className={`feedback ${toggleExpand ? "feedback--expand" : ""}`} onClick={() => {setToggleExand(!toggleExpand);}}>
        <button onClick={handleUpvote}>
          <TriangleUpIcon/>
          <span>{count}</span></button>
        <div>
          <p>{badgeLetter}</p>
        </div>
        <div>
          <p>{company}</p>
          <p>{text}</p>
        </div>
        <p>{daysAgo}d</p>
      </li>
  )
}