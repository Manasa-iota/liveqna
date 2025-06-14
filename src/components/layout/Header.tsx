import Pattern from "../Pattern"
import Logo from "../Logo"
import PageHeading from "../PageHeading"
import FeedbackForm from "../feedback/FeedbackForm"

export type AddToListHandler = {
  handleAddToList: (text: string) => void;
};

export default function Header({handleAddToList}:AddToListHandler) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm handleAddToList={handleAddToList}/>
    </header>
  )
}
