import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type feedbackItemProp } from "../../lib/types";

export default function FeedbackItem({ upvoteCount, badgeLetter, company, text, daysAgo }: feedbackItemProp) {
  return (
    <li className="feedback">
        <button>
          <TriangleUpIcon/>
          <span>{upvoteCount}</span></button>
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