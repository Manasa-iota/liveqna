import Container from "./components/layout/Container"
import HashtagList from "./components/hashtag/HashtagList";
import FeedBackItemsContextProvider from "./contexts/FeedBackItemsContextProvider";

function App() {
  

  return (
    <>
      <FeedBackItemsContextProvider>
        <Container />
        <HashtagList />
      </FeedBackItemsContextProvider>
    </>
  )
}

export default App
