import useFeedbackItemsStore from "../../stores/feedbackitems";
import HashtagItem from "./HashtagItem"


export default function HashtagList() {
 const { getCompanyList, selectCompany } = useFeedbackItemsStore();
  const companyList = getCompanyList();
  return (
    <>
        <ul className="hashtags">
          {
            companyList.map(company => (
              <HashtagItem onSelectCompany={selectCompany} key={company} company={company} />
            ))
          }
        </ul>
    </>
  )
}
