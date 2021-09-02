import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component {

    render() {
        return (
            <main>
                <div className="text-center pt-12">
                    <h2 className="text-5xl font-bold mb-8">Welcome to Blog App</h2>
                    < Link to="/articles">
                        <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md">Go to Articles Page</button>
                    </Link>
                </div>
            </main>
            
        )
    }
}

export default Home;