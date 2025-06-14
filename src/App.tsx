import Container from "./components/layout/Container"
import HashtagList from "./components/hashtag/HashtagList";
import { useEffect, useMemo, useState } from "react"
import { type feedbackItemProp } from "./lib/types"


function App() {
  const [feedbackItems, setFeedbackItems] = useState<feedbackItemProp[]>([]);
  const [loading,setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany,setSelectedCompany] = useState("");
  
const filteredFeedbackItems = useMemo(()=> selectedCompany ? feedbackItems.filter((item) => item.company === selectedCompany) : feedbackItems,[selectedCompany,feedbackItems])

  const handleSelectCompany= (company:string) => {
        setSelectedCompany(company);
  }
  const companyList = useMemo(()=>feedbackItems.map((item)=>(item.company)).filter((company,index,array) =>{
    return array.indexOf(company)==index;
  }),[feedbackItems])
  const handleAddToList= async (text:string) =>{
    const companyName= text.split(' ').find((word)=>word.includes('#'))!.substring(1);
    const newItem :feedbackItemProp ={
      id:new Date().getTime(),
      upvoteCount:0,
      text:text,
      company:companyName.charAt(0).toUpperCase() + companyName.slice(1),
      badgeLetter:companyName?.substring(0,1).toUpperCase(),
      daysAgo:0,
    }
    setFeedbackItems([...feedbackItems,newItem]);
    // await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",{method:"POST",
    //   body:JSON.stringify(newItem),
    //   headers:{
    //     Accept:"application/json",
    //     "Content-Type":"application/json",
    //   }
    // })
  }

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
        if (!data.feedbacks|| !Array.isArray(data.feedbacks)) {
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
  return (
    <>
      <Container feedbackItems={filteredFeedbackItems} loading={loading} errorMessage = {errorMessage} handleAddToList={handleAddToList} />
      <HashtagList companyList = {companyList} onSelectCompany={handleSelectCompany}/>
    </>
  )
}

export default App
