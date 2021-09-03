
import Main from "./Main";
import {Redirect} from "react-router-dom";

function Dashboard(props) {
  
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    return (
        <>
         {
             userInfo ? < Main /> : < Redirect to="/" />
         }
        </>
    )
}
    


export default Dashboard;

