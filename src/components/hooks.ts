import { useEffect, useState, useContext } from "react";
import { type TFeedbackItem } from "../lib/types";
import { FeedbackItemContext } from "../contexts/FeedBackItemsContextProvider";

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemContext);
  if (!context) {
    throw new Error("FeedbackItemsContext is not defined");
  }
  return context;
}


export function useFeedbackItems(){
     const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
      const [loading, setLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const res = await fetch(
              "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
            );
            if (!res.ok) {
              throw new Error("Failed to fetch");
            }
            const data = await res.json();
            if (!data.feedbacks || !Array.isArray(data.feedbacks)) {
              throw new Error("Invalid data format");
            }
    
            setFeedbackItems(data.feedbacks);
          } catch (error) {
            console.error(error);
            setErrorMessage("Something went wrong");
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
        return { feedbackItems, loading, errorMessage, setFeedbackItems  };
}