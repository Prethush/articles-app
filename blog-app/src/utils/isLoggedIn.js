import { userURL } from "./constant";
export function isLoggedIn() {
    let user;
    let token = localStorage.getItem("token");
        let bearer = "Bearer " + token;
        fetch(userURL, {
            method: "GET",
            headers: {
                "Authorization": bearer,
                "Content-type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            user = data;
            return user;
        })
        .catch((err) => console.log(err));
    }
