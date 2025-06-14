import type { feedbackItemProp } from "../lib/types";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

export type ContainerProps =  {
  feedbackItems: feedbackItemProp[];
  loading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
}

export default function Container({
  feedbackItems,
  loading,
  errorMessage,
  handleAddToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        loading={loading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
    </main>
  );
}
