import { create } from 'zustand';
import { type TFeedbackItem } from "../lib/types";

type FeedbackStore = {
  feedbackItems: TFeedbackItem[];
  loading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToLst: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

const useFeedbackItemsStore = create<FeedbackStore>((set, get) => ({
  feedbackItems: [],
  loading: false,
  errorMessage: '',
  selectedCompany: '',

  getCompanyList: () => {
    const companies = get().feedbackItems.map(item => item.company);
    return [...new Set(companies)];
  },

  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(item => item.company === state.selectedCompany)
      : state.feedbackItems;
  },

  addItemToLst: async (text: string) => {
    const companyName = text.split(" ").find(word => word.includes("#"))!.substring(1);
    const formattedCompany = companyName.charAt(0).toUpperCase() + companyName.slice(1);
    console.log("aadded to list")
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      text,
      company: formattedCompany,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      daysAgo: 0,
    };


    set(state => ({
      feedbackItems: [...state.feedbackItems, newItem]
    }));

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
  },

  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },

  fetchFeedbackItems: async () => {
    set(() => ({ loading: true }));

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
    const idCount: Record<number, number> = {};
    for (const item of data.feedbacks) {
      idCount[item.id] = (idCount[item.id] || 0) + 1;
    }

    const uniqueFeedbacks = data.feedbacks.filter((item: TFeedbackItem) => idCount[Number(item.id)] === 1);

    set(() => ({
      feedbackItems: uniqueFeedbacks,
    }));

    } catch (error) {
      console.error(error);
      set(() => ({
        errorMessage: "Something went wrong while fetching feedbacks."
      }));
    } finally {
      set(() => ({
        loading: false,
      }));
    }
  },
}));

export default useFeedbackItemsStore;
