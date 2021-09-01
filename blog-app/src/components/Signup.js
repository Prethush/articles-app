import React from "react";
import {Link} from "react-router-dom";

class Signup extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: "",
            email: "",
            passwd: "",
            errors: {
                username: "",
                passwd: "",
                email: ""
            }
        };
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

    validatePasswd = (value) => {
        if(!value) {
            return "Password is required";
        }else if(value.length < 6){
           return "Password must be alteast 6 characters long";
       } else if(value.search(/[a-zA-Z]/) === -1) {
           return "Password must contain atleast one letter";
       }else if(value.search(/\d/) === -1) {
           return "Password must contain atleast one number";
       }else {
           return "";
       }
    }

    handleChange = ({target}) => {
        let {name, value} = target;
        let errors = this.state.errors;
        switch(name) {
            case "username": 
                errors.username = !value ? "username is required" : value.length < 6 ? "username should be atleast 6 characters" : "";
                break;
            case "passwd": 
                errors.passwd = this.validatePasswd(value);
                break;
            case "email": 
                errors.email = !value ? "email is required":  this.validateEmail(value) ? "": "Email is invalid";
                break;
            default: 
                break;
        }
        this.setState({[name]: value, errors});
     }

    handleSubmit = (event) => {
        event.preventDefault();
        
    }
    render() {
        let {username, passwd, email} = this.state.errors;
        return (
            <main>
                <section className="mt-20">
                    <form className="w-1/3 mx-auto border border-gray-400 p-6 rounded-md" onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <legend className="text-2xl font-bold">Sign Up</legend>
                            < Link to="/login">
                                <span className="text-blue-700 text-lg text-center">Have an account? </span>
                            </Link>
                        </div>
                        <fieldset className="my-3">

                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="text" placeholder="Enter Username" value={this.state.username} name="username" onChange={(e) => this.handleChange(e)}/>
                            <span className="text-red-500">{username}</span>

                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="email" placeholder="Enter Email" value={this.state.email} name="email" onChange={(e) => this.handleChange(e)}/>
                            <span className="text-red-500">{email}</span>

                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="password" placeholder="Enter Password" value={this.state.passwd} name="passwd" onChange={(e) => this.handleChange(e)}/>
                            <span className="text-red-500">{passwd}</span>

                            <input type="submit" value="Sign Up" className="block w-full my-6 py-2 px-3 bg-blue-500 text-white font-bold"/>
                            

                        </fieldset>
                    </form>
                </section>
            </main>
        )
    }
}

export default Signup;