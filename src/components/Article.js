import React from "react";
import { articlesURL } from "../utils/constant";
import Loader from "./Loader";
import {withRouter} from "react-router-dom";
import CommentBox from "./CommentBox";


class Article extends React.Component{
    constructor(props){
        super();
        this.state = {
            article: "",
            error: "",
        };
    }

    componentDidMount() {
        this.getArticle();
    }

    
    getArticle = () => {
        fetch(articlesURL + `/${this.props.match.params.slug}`)
        .then((res) => {
            if(!res.ok)  {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data, "article");
            this.setState({article: data.article }, this.getUserInfo);
        })
        .catch((err) => {
            this.setState({error: "Not able to fetch Articles"});
        });
    }
    
    getDate = (date) => {
        let newDate =  new Date(date).toISOString().split('T')[0];
         return newDate;
     }

     handleEdit = () => {
         let {slug} = this.state.article;
         console.log(this.props, "props");
         this.props.history.push({
             pathname: `/articles/edit/${slug}`,
             article: this.state.article
         });
     }

     handleDelete = () => {
         let {user} = this.props;
         console.log(user.username, "username");
         fetch(articlesURL + "/" + this.props.match.params.slug, {
             method: "DELETE",
             headers: {
                 "Authorization": "Bearer " + localStorage.token
             }
         })
         .then((res) => {
            if(!res.ok) {
                return res.json().then(({errors}) => {
                    return Promise.reject(errors);
                })
            }
            this.props.history.push(`/profiles/${user.username}`);
         })
         .catch((err) => console.log(err));
     }

     

    render() {
        let {error, article} = this.state;
        let {isLoggedIn, user} = this.props;
            if(error) {
                return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>
            }

            if(!article) {
                return < Loader />
            } 
            let {tagList} = article; 
        return (
            <main className="pb-12">

                {/* hero section */}
                <section className="px-20 bg-articlePage text-white py-12">
                    <h2 className="mt-2 mb-3 text-4xl">{article.title}</h2>
                    <p className="">{article.description}</p>
                    <div className="flex py-6 items-center">
                        <img src={article.author.image} alt={article.author.username} className="w-16 h-16 object-cover rounded-full"/>
                        <span className="mx-3">{article.author.username}</span>
                        <span className="mx-3">{this.getDate(article.createdAt)}</span>
                    </div>
                   <div className="flex justify-between">
                       <div>
                            {
                                tagList.map((tag) => {
                                    return  <span key={tag} className="mr-3 bg-red-400 p-1 px-2 text-xs rounded-md">{tag}</span>

                                })
                            }
                        </div>
                       
                        <div>
                            <span className={isLoggedIn && user.username === article.author.username ? "bg-blue-500 py-2 px-4 text-white rounded-md mx-3 cursor-pointer": "hidden"} onClick={this.handleEdit}>Edit</span>

                            <span className={isLoggedIn && user.username === article.author.username ? "bg-red-500 py-2 px-4 text-white rounded-md mx-3 cursor-pointer": "hidden"}onClick={this.handleDelete}>Delete</span>
                        </div>
                   </div>
                </section> 

                {/* article body */}
                 <section className="px-20 py-12">
                    <p className="text-xl">{article.body}</p>
                </section> 

                <section className="px-20">
                    <h2 className="text-3xl font-bold">Comments</h2>
                    < CommentBox {...this.props} slug={article.slug}/>
                </section> 
            </main>
        )
    }
}

export default withRouter(Article);