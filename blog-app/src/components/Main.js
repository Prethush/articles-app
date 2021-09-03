import React from "react";
import Articles from "./Articles";
import Tags from "./Tags";
import {articlesURL, feedURL}  from "../utils/constant";
import Pagination from "./Pagination";


class Main extends React.Component {
   
        constructor(props) {
            super();
            this.state = {
                articles: null,
                error: "",
                articlesCount: null,
                articlesPerPage: 10,
                activePage: 1,
                tagSelected: "",
                feedSelected: "",
                isLoggedIn: JSON.parse(localStorage.getItem("userInfo")) ? true : false
            }
        }
    

    componentDidMount() {
       let {isLoggedIn} = this.state;
       if(isLoggedIn) {
           this.setState({feedSelected: "myfeed"}, this.myFeed);
       }else {
           this.setState({feedSelected: "global"}, this.getArticles);
       }
    }

    
   
    handleClick = ({target}) => {
        let {id} = target.dataset;
        this.setState({activePage: id}, this.getArticles);
    }

    getArticles = () => {
        let offset = (this.state.activePage - 1) * 10;
        let tag = this.state.tagSelected;
        
        fetch(articlesURL + `/?limit=${this.state.articlesPerPage}&offset=${offset}` + (tag && `&tag=${tag}`))
        .then((res) => {
            if(!res.ok)  {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({articles: data.articles, articlesCount: data.articlesCount});
        })
        .catch((err) => {
            this.setState({error: "Not able to fetch Articles"});
        });
    }

    selectTag = ({target}) => {
        let {value} = target.dataset;
        this.setState({tagSelected: value, activePage: 1}, this.getArticles);
    }

    myFeed = () => {
        
        let offset = (this.state.activePage - 1) * 10;
        let token = JSON.parse(localStorage.getItem("userInfo")).token;
            let bearer = "Bearer " + token;
            fetch(feedURL + `?/limit=${this.state.activePage}&skip=${offset}`, {
                method: "GET",
                headers: {
                    "Authorization": bearer,
                    "Content-type": "application/json"
                }
            })
            .then((res) => {
                if(!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => 
            {   
                this.setState({articles: data.articles, articlesCount: data.articlesCount, feedSelected: "myfeed"})
            })
            
            .catch((err) => this.setState({error: "Not able to fetch Articles"}));
        
         }

    
     

    render() {
        let {articles, error, articlesCount, articlesPerPage, activePage, feedSelected, isLoggedIn, tagSelected} = this.state;
        return (
            
            // Hero section
                <main className="px-24 py-16">

                    {/* feeds part */}
                        <div className="flex mb-3">
                            <span className={!isLoggedIn ?  "hidden": feedSelected === "myfeed" ? "text-xl mr-8 cursor-pointer text-green-500": "text-xl mr-8 cursor-pointer green"}  onClick={this.myFeed}> <i className="fas fa-newspaper mr-2"></i>
                                My feed
                            </span>
                            <span className={feedSelected === "global" ? "cursor-pointer text-xl text-green-500": "cursor-pointer text-xl"} onClick={() => this.setState({
                                tagSelected: "",
                                feedSelected: "global"
                            }, this.getArticles)}>
                                <i className="fas fa-newspaper mr-2"></i>
                                Global Feed 
                                </span>
                            <div className={tagSelected && feedSelected === "global" ? "visible text-xl": "hidden"}>
                                <span className="mx-4 text-gray-500">/</span>
                                <span className="text-green-700">#{this.state.tagSelected}</span>
                            </div>
                        </div>

                        {/* articles part */}
                        <section className="flex justify-between ">
                            <div className="flex-70">
                                < Articles articles={articles} error={error} />
                            </div>

                        {/* tags part */}
                            <div className="flex-25">
                                < Tags selectTag={this.selectTag}/>
                            </div>
                        </section>
                            
                        {/* page indicator */}
                        <div className="text-center py-8">
                            < Pagination 
                            articlesCount={articlesCount} 
                            articlesPerPage={articlesPerPage}
                            activePage={activePage}
                            handleClick = {this.handleClick}
                            />
                        </div>
                </main>
        )
    }
}

export default Main;