import Pattern from "../Pattern"
import Logo from "../Logo"
import PageHeading from "../PageHeading"
import FeedbackForm from "../feedback/FeedbackForm"
import { useFeedbackItemsContext } from "../../contexts/FeedBackItemsContextProvider";

export default function Header() {
  const {handleAddToList} = useFeedbackItemsContext();
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onHandleToList={handleAddToList}/>
    </header>
  )
}
