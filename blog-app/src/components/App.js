import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./Main";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Article from "./Article";

function App(props) {
    return (
        < Router>
        < Header />
        < Route path="/" exact>
            < Home />
        </Route>
        < Route path="/articles" exact>
           < Main />
        </Route>
        < Route path="/articles/:id" component={Article} >
        </Route>
        < Route path="/register">
            < Signup />
        </Route>
        < Route path="/login">
            < Signin />
        </Route>
        </Router>
    )
}

export default App;