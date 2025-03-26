import axios from "../utils/axios";
import { useEffect, useState } from "react";

import { isLoggedIn, tokenExpiresIn } from "../utils/auth";
import Login from "../components/Login";

import moment from "moment";

async function getUsername(setUsername){

    axios.get("/users/" + localStorage.getItem("uid") + "/username")

        .then((response) => setUsername(response.data))
        .catch((error) => console.log(error));
}

function Header(){
    
    if(isLoggedIn()){

        const [ username, setUsername ] = useState();
        const [ timestamp, setTimestamp ] = useState();

        useEffect(() => {

            getUsername(setUsername);

            const intervalID = setInterval(() => {
                setTimestamp(() => moment().format('LLLL'));

            }, 1000);

            return () => {
                clearInterval(intervalID);
            }

        }, []);
            
        return(

            <div id="header-component" className="component">
                
                <div id="site-title-container">

                    <div id="site-title">Babylon</div>

                </div>
                
                <div id="greeting-date-time-container">

                    <div id="greeting">Hi { username ?  username : "User" }!</div>
                    <div id="auth-token-expiration-eta">Your authentication token expires {tokenExpiresIn() ? tokenExpiresIn() : "in.."}.</div>

                    <div id="header-date-time">{timestamp ? timestamp : "Loading.."}</div>

                </div>

            </div>
        );
    }

    else
        return <Login />;
}

export default Header;