import React from "react";
import {Link} from "react-router-dom";

class Signin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            passwd: "",
            errors: {}
        };
    }

    handleChange = ({target}) => {
        let {name, value} = target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <main>
                <section className="mt-20">
                    <form className="w-1/3 mx-auto border border-gray-400 p-6 rounded-md" onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <legend className="text-2xl font-bold">Sign In</legend>
                            < Link to="/register">
                                <span className="text-blue-700 text-lg text-center">Need an account? </span>
                            </Link>
                        </div>
                        <fieldset className="my-3">

                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="email" placeholder="Enter Email" value={this.state.email} name="email" onChange={(e) => this.handleChange(e)}/>
                            

                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="password" placeholder="Enter Password" value={this.state.passwd} name="passwd" onChange={(e) => this.handleChange(e)}/>
                            

                            <input type="submit" value="Login In" className="block w-full my-6 py-2 px-3 bg-blue-500 text-white font-bold"/>

                        </fieldset>
                    </form>
                </section>
            </main>
        )
    }
}

export default Signin;