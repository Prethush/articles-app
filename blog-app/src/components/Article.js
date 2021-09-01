import React from "react";

class Article extends React.Component{
    constructor(props){
        super();
        this.state = {};
    }
    
    getDate = (date) => {
        let newDate =  new Date(date).toISOString().split('T')[0];
         return newDate;
     }

    render() {
        console.log(this.props.location);
        let article = this.props.location.article;
        let {tagList} = article; 
        return (
            <main>

                {/* hero section */}
                <section className="px-20 bg-blue-800 text-white py-12">
                    <h2 className="mt-2 mb-3 text-4xl">{article.title}</h2>
                    <p className="">{article.description}</p>
                    <div className="flex py-6 items-center">
                        <img src={article.author.image} alt={article.author.username} className="w-16 h-16 object-cover rounded-full"/>
                        <span className="mx-3">{article.author.username}</span>
                        <span className="mx-3">{this.getDate(article.createdAt)}</span>
                    </div>
                   <div className="flex">
                        {
                            tagList.map((tag) => {
                                return <span key={tag} className="mr-3 bg-red-400 p-1 px-2 text-xs rounded-md">{tag}</span>
                            })
                        }

                   </div>
                </section>

                {/* article body */}
                <section className="px-20 py-12">
                    <p className="text-xl">{article.body}</p>
                </section>
            </main>
        )
    }
}

export default Article;