import React from "react";
import {Link} from "react-router-dom";
import Loader from "./Loader";

function Articles(props) {
    
      function getDate(date) {
        let newDate =  new Date(date).toISOString().split('T')[0];
        return newDate;
       }

        let {articles, error} = props;
        
        if(error) {
            return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>
         }

        if(!articles) {
            return < Loader />
        }
        
        if(!articles.length){
            return <h2 className="text-red-500 text-center text-xl mt-8">No articles found</h2>
        }
        return(
            <article>
                {
                    articles.map(article => {
                        return (
                            <div key={article.slug} className="bg-gray-200 flex justify-between my-3 w-full p-4 rounded-md">
                                <div>
                                    <div className="flex items-center my-2">
                                        <img src={article.author.image} alt={article.author.username} className="w-14 h-14 rounded-full object-cover"/>
                                        <div className="ml-4">
                                            <h5 className="text-red-500 font-bold text-xl">{article.author.username}</h5>
                                            <h6>{getDate(article.createdAt)}</h6>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                                    <Link to={`/articles/${article.slug}`}>
                                        <h4 className="bg-green-400 text-white font-bold rounded-lg inline-block py-2 px-3">Read More</h4>
                                    </Link>
                                </div>
                                <div className="flex items-center text-xl">
                                     <i className="far fa-heart"></i>
                                     <span className="ml-2">{article.favoritesCount}</span>
                                </div>
                            </div>
                        )
                    }) 
                }
            </article>
        )
    }


export default Articles;