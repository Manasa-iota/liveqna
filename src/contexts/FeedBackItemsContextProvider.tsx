import { useState, useMemo, createContext,  } from "react";
import { type TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../components/hooks";

type FeedBackItemsContextProviderProps = {
  children: React.ReactNode;
};

type TFeedbackItemsContext = {
  feedbackItems: TFeedbackItem[];
  loading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  selectedCompany: string;
  filteredFeedbackItems: TFeedbackItem[];
  handleSelectCompany: (company: string) => void;
};

export const FeedbackItemContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedBackItemsContextProvider({
  children,
}: FeedBackItemsContextProviderProps) {
  const { feedbackItems, loading, errorMessage, setFeedbackItems } = useFeedbackItems();
  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) == index;
        }),
    [feedbackItems]
  );

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      text: text,
      company: companyName.charAt(0).toUpperCase() + companyName.slice(1),
      badgeLetter: companyName?.substring(0, 1).toUpperCase(),
      daysAgo: 0,
    };
    setFeedbackItems([...feedbackItems, newItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };


  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter((item) => item.company === selectedCompany)
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  return (
    <FeedbackItemContext.Provider
      value={{
        feedbackItems,
        loading,
        errorMessage,
        companyList,
        handleAddToList,
        selectedCompany,
        filteredFeedbackItems,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackItemContext.Provider>
  );
}
