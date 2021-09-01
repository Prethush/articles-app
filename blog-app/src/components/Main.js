import React from "react";
import Articles from "./Articles";
import Tags from "./Tags";
import {articlesURL}  from "../utils/constant";
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
                tagSelected: ""
            }
        }
    

    componentDidMount() {
       this.getArticles();
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
        this.setState({tagSelected: value}, this.getArticles);
    }
    render() {
        let {articles, error, articlesCount, articlesPerPage, activePage} = this.state;
         
        return (
            
            // Hero section
                <main className="px-24 py-16">

                    {/* feeds part */}
                        <div className="flex mb-3">
                            <span className="cursor-pointer text-xl text-blue-900" onClick={() => this.setState({
                                tagSelected: ""
                            }, this.getArticles)}>Global Feed </span>
                            <div className={this.state.tagSelected ? "visible text-xl": "hidden"}>
                                <span className="mx-2 text-gray-500">/</span>
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