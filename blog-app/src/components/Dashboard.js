
import Main from "./Main";
import Home from "./Home";
import {Redirect} from "react-router-dom";

function Dashboard(props) {
   let {userInfo} = props.location;
   console.log(userInfo, "userInfo");
    return (
        <>
            {
                userInfo ? < Main userInfo = {userInfo} /> : < Redirect to="/" />
            }
        </>
    )
}
    


export default Dashboard;

