import React from "react";
import Loader from "./Loader";
import { profileURL } from "../utils/constant";
import { articlesURL } from "../utils/constant";
import Articles from "./Articles";
import Pagination from "./Pagination";
import {withRouter} from "react-router-dom";

class Profile extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            user: "",
            articles: null,
            error: "",
            articlesCount: null,
            articlesPerPage: 10,
            activePage: 1,
            feedSelected: "author",
            following: ""
        }
    }

    _isMounted = false;

    componentDidMount(){
        this._isMounted = true;
        console.log(this._isMounted, "mounted");
        if(this._isMounted) {
            this.getUserInfo();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getUserInfo = () => {
        let {id} = this.props.match.params;
        fetch(profileURL + id , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.token
            }
        })
        .then((res => {
            if(!res.ok) {
                return res.json().then(({errors}) => {
                    return Promise.reject();
                })
            }
            return res.json();
        }))
        .then(({profile}) => {
            console.log({profile});
            this.setState({user: profile, following: profile.following}, this.getArticles)
        })
        .catch((err) => console.log(err));
    }

    handleFollow = () => {
        let {username} = this.state.user;
        let {following} = this.state;
        let method = following ? "DELETE" : "POST";
        fetch(profileURL + "/" + username + "/follow", {
            method: method,
            headers: {
                "Authorization": "Bearer " + localStorage.token
            }
        })
        .then((res) => {
            if(!res.ok) {
                return res.json().then(({errors}) => {
                    return Promise.reject();
                })
            }
            return res.json();
        })
        .then(({profile}) => {
            console.log(profile);
            this.setState({following: profile.following})
        })
        .catch((err) => console.log(err));
    }

    componentDidUpdate() {
        let user = this.state.user;
        let {id} = this.props.match.params;
        if(user.username !== id){
            this.getUserInfo();
        }
    }

    handleClick = ({target}) => {
        let {id} = target.dataset;
        this.setState({activePage: id}, this.getArticles);
    }

    getArticles = () => {
        let {username} = this.state.user;
        let offset = (this.state.activePage - 1) * 10;
        
        fetch(`${articlesURL}?${this.state.feedSelected}=${username}&limit=${this.state.articlesPerPage}&offset=${offset}`, {
            method: "GET",
            headers: {
                "Authorization": "Token " + localStorage.token
            }
        })
        .then((res) => {
            if(!res.ok)  {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            this.setState({articles: data.articles, articlesCount: data.articlesCount});
        })
        .catch((err) => {
            this.setState({error: "Not able to fetch Articles"});
        });
    }

    handleFavorite = ({target}) => {
        let {id, slug} = target.dataset;
        let method = id === "false" ? "POST" : "DELETE";
        console.log(method);
        console.log(id, slug);
            fetch(articlesURL + "/" + slug + "/favorite", {
                method: method,
                headers: {
                    "Authorization": "Token " + localStorage.token
                }
            })
            .then((res) => {
                if(!res.ok) {
                    return res.json().then(({errors}) => {
                        return Promise.reject(errors);
                    })  
                }
                return res.json();
            })
            .then((data) => {
                this.getArticles();
            })
            .catch((err) => console.log(err));
        }
        


    render() {
       
        if(!this.state.user) {
            return < Loader />
        }
        let {username, image, bio} = this.state.user;
        let loggenInUser = this.props.user.username;
        let {articles, error, articlesCount, activePage, articlesPerPage, feedSelected, following} = this.state;
        return (
            <main>
                <section>
                    <div className="bg-articlePage text-white py-16 text-center">
                        <img src={image} alt={username} className="w-40 h-40 rounded-full mx-auto"/>
                        <h2 className="text-5xl my-4">{username}</h2>
                        <h3 className="text-2xl text-pink-300">{bio}</h3>
                        <button className={loggenInUser !== username ? "visible bg-white text-gray-700 px-8 py-3 rounded-md mt-6": "hidden"} onClick={this.handleFollow}>{following ? `Unfollow ${username}` : `Follow ${username}`} </button>
                    </div>

                    <article className="px-40">
                        <div className="py-12">
                            <span className={feedSelected === "author" ? "cursor-pointer text-xl text-green-500 pb-2 border-b-2 border-green-500": "cursor-pointer text-xl"}onClick={() => this.setState({
                                feedSelected: "author",
                                activePage: 1
                            }, this.getArticles)}>
                                 <i className="fas fa-newspaper mr-2"></i>
                                My Articles
                                </span>
                            <span className="mx-4">/</span>
                            <span className={feedSelected === "favorited" ? "cursor-pointer text-xl text-green-500 pb-2 border-b-2 border-green-500": "cursor-pointer text-xl"} onClick={() => this.setState({
                                feedSelected: "favorited",
                                activePage: 1
                            }, this.getArticles)}> 
                            <i className="fas fa-newspaper mr-2"></i>
                            Favorited</span>
                        </div>
                        <div className="">
                            < Articles articles={articles} error={error} isLoggedIn={this.props.isLoggedIn} handleFavorite={this.handleFavorite}/>
                        </div>
                    </article>
                    <div className="text-center py-8">
                            < Pagination 
                            articlesCount={articlesCount} 
                            articlesPerPage={articlesPerPage}
                            activePage={activePage}
                            handleClick = {this.handleClick}
                            />
                        </div>
                </section>
            </main>
        )
    }
}

export default withRouter(Profile);