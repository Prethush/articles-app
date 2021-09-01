import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./Main";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Article from "./Article";
import Nomatch from "./Nomatch";

function App(props) {
    return (
        < Router>
        < Header />
        < Switch >
            < Route path="/" exact>
                < Home />
            </Route>
            < Route path="/articles" exact>
            < Main />
            </Route>
            < Route path="/articles/:slug" component={Article} />
            < Route path="/register">
                < Signup />
            </Route>
            < Route path="/login">
                < Signin />
            </Route>
            < Route path="*">
                < Nomatch />
            </Route>
        </Switch>

        </Router>
    )
}

export default App;