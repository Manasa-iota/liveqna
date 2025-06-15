import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../contexts/FeedBackItemsContextProvider";

export default function FeedbackList() {
  const {filteredFeedbackItems,loading,errorMessage} = useFeedbackItemsContext();
  return (
    <ol>
      {loading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} {...feedbackItem} />
      ))}
    </ol>
  )
} 