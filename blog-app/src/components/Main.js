import React from "react";
import Articles from "./Articles";
import Tags from "./Tags";

class Main extends React.Component {
    constructor(props){
        super();
        this.state = {
            offset: 0,
            articles: null ,
            tags: null,
            allData: null,
            tagSelected: null
        };
    }

    getAllTags = () => {
        console.log("hello");
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?limit=all`)
        .then((res) => res.json())
        .then((data) => {
           let allTags = data.articles.map(article => article.tagList).flat(Infinity);
            let arr =  allTags.reduce((acc, curr) => {
                if(curr){
                    if(!acc.includes(curr)) {
                        acc.push(curr.trim());
                    }
                } 
                return acc;
           }, []);
           
            this.setState({tags: arr});
        })
    }

    getUrl = () => {
        if(this.state.tagSelected) {
            return `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=all&tag=${this.state.tagSelected}`
        }else {
            return `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=all`
        }
    }
    getArticles = () => {
        let {offset} = this.state;
        fetch(this.getUrl())
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({articles: data.articles.slice(offset, offset + 10), allData: data.articles});
        });
    }

    componentDidMount() {
        this.getArticles();
        this.getAllTags();
    }

    getTotalPages = () => {
        let {allData} = this.state;
        let numberOfPages = Math.floor(allData.length/10);
        let arr = [];
        for(let i = 0; i < numberOfPages; i++){
            arr.push(i+1);
        }
        return arr;
    }

    handleClick = ({target}) => {
        let {id} = target.dataset;
        this.setState((prevState) => {
            return {
                offset: id * 10
            }
        }, () => this.getArticles());
    }

    selectTag = ({target}) => {
        let {value} = target.dataset;
        this.setState((prevState) => {
            return {
                tagSelected: value,
                offset: 0
            }
        }, () => this.getArticles());
    }
    render() {
        
         
        return (
            
            // Hero section
                <main className="px-24 py-16">

                    {/* feeds part */}
                        <div className="flex mb-3">
                            <span className="cursor-pointer text-xl text-blue-900" onClick={() => this.setState((prevState) => {
                                return {
                                    tagSelected: null,
                                   
                                }
                            }, () => this.getArticles())}>Global Feed</span>
                            <div className={this.state.tagSelected ? "visible text-xl": "hidden"}>
                                <span className="mx-2 text-gray-500">/</span>
                                <span className="text-green-700">#{this.state.tagSelected}</span>
                            </div>
                        </div>

                        {/* articles part */}
                        <section className="flex justify-between ">
                            <div className="flex-70">
                                {
                                    !this.state.articles ? <h2>Loading...</h2> : < Articles {...this.state} />
                                }
                            </div>

                        {/* tags part */}
                            <div className="flex-25">
                                {
                                    !this.state.tags ? <h2>Loading...</h2> : < Tags {...this.state} selectTag = {this.selectTag} />
                                }
                            </div>
                        </section>
                            
                        {/* page indicator */}
                        <div className="text-center py-8">
                            {
                                this.state.allData ? this.getTotalPages().map((p, i) => {
                                   return <span key={p} className={this.state.offset === i * 10 ? "bg-black text-white py-2 px-4 mx-4 cursor-pointer": "border border-gray-300 py-2 px-4 mx-4 cursor-pointer"} data-id={i} onClick={(e) => this.handleClick(e)}>{p}</span>
                                }) : ""
                            }
                        </div>
                </main>
            
        )
    }
}

export default Main;