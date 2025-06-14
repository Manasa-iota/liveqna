export default function HashTagList({ companyList }) {
  return (
    <>
        <ul className="hashtags">
          {
            companyList.map(company => (
              <li>
              <button>#{company}</button>  
            </li> 
            ))
          }
        </ul>
    </>
  )
}
