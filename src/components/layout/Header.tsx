import Pattern from "../Pattern"
import Logo from "../Logo"
import PageHeading from "../PageHeading"
import FeedbackForm from "../feedback/FeedbackForm"
import useFeedbackItemsStore from "../../stores/feedbackitems"

export default function Header() {
  const { addItemToLst } = useFeedbackItemsStore();
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onHandleToList={addItemToLst} />
    </header>
  )
}
