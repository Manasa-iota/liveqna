import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import {type  ContainerProps } from "../layout/Container";

type FeedbackListProps = Omit<ContainerProps, 'handleAddToList'> & {
  handleAddToList: (text: string) => void;
};

 
export default function FeedbackList({feedbackItems,loading,errorMessage}:FeedbackListProps) {
  return (
    <ol>
      {loading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} {...feedbackItem} />
      ))}
    </ol>
  )
} 