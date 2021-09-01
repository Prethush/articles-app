function Tags(props) {

    let allTags = props.tags;

    return (
        <div className="flex flex-wrap bg-gray-200 px-4 py-8 rounded-md">
            {
                allTags.map(tag => {
                  return  <span key={tag} className="bg-gray-700 p-2 cursor-pointer text-white text-xs rounded-md mx-1 my-1" onClick={(e) => props.selectTag(e)} data-value={tag}>{tag}</span>
                })
            }
        </div>
    )
}

export default Tags;