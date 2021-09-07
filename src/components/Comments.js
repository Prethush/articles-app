import Loader from "./Loader";

function Comments(props) {

    console.log(props);
    function getDate(date){
        let newDate =  new Date(date).toISOString().split('T')[0];
         return newDate;
     }

    let {comments, loggedInUser, isLoggedIn} = props;
    if(!comments) {
        return < Loader />
    }
    return (
        <>
            {
                comments.length > 0 ? comments.map((comment) => {
                return  <div key={comment.createdAt} className="flex item-center p-6 bg-gray-100 mb-4 rounded-t-md relative">
                            <div className="">
                                <img src={comment.author.image} alt={comment.author.username} className="w-16 h-16 rounded-full"/>
                            
                            </div>
                            <div className="flex flex-col">
                            <div className="flex items-center">
                                    <h4 className="text-xl ml-6">{comment.author.username}</h4>
                                    <h4 className="text-xl ml-6">#{getDate(comment.createdAt)}</h4>
                                    <span className={(loggedInUser === comment.author.username) && isLoggedIn ? "absolute right-4 text-xl" : "hidden"}>
                                        <i className="fas fa-trash cursor-pointer"></i>
                                    </span>
                                </div>
                                <p className="ml-6 my-4">{comment.body}</p>
                            </div>
                        </div>
                }): <h2 className="text-xl">No comments yet!</h2>
            }
        </>
    )
}

export default Comments;