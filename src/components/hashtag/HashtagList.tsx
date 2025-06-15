import { useFeedbackItemsContext } from "../../contexts/FeedBackItemsContextProvider"
import HashtagItem from "./HashtagItem"


export default function HashtagList() {
  const {companyList, handleSelectCompany} = useFeedbackItemsContext();
  return (
    <>
        <ul className="hashtags">
          {
            companyList.map(company => (
              <HashtagItem onSelectCompany={handleSelectCompany} key={company} company={company} />
            ))
          }
        </ul>
    </>
  )
}
