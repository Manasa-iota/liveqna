import FeedbackItem from "./FeedbackItem"
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useEffect } from "react";
import useFeedbackItemsStore from "../../stores/feedbackitems";
  
export default function FeedbackList() {
  const { getFilteredFeedbackItems, loading, errorMessage, fetchFeedbackItems } = useFeedbackItemsStore();
  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);
  const filteredFeedbackItems = getFilteredFeedbackItems();
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