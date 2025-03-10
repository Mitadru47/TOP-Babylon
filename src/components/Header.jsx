import axios from "../utils/axios";
import { useEffect, useState } from "react";

import { isLoggedIn, tokenExpiresIn } from "../utils/auth";
import Login from "../components/Login";

async function getUsername(setUsername){

    axios.get("/users/" + localStorage.getItem("uid"))

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
                setTimestamp(() => new Date().toUTCString());

            }, 1000);

            return () => {
                clearInterval(intervalID);
            }

        }, []);

        if(timestamp){
            
            return(

                <div id="header-component" className="component">
                    
                    <div id="site-title-container">

                        <div id="site-title">Babylon</div>

                    </div>
                    
                    <div id="greeting-date-time-container">

                        <div id="greeting">Hi { username ?  username : "User" }!</div>
                        <div id="auth-token-expiration-eta">Your authentication token expires {tokenExpiresIn()}.</div>

                        <div id="header-date-time">{timestamp}</div>

                    </div>

                </div>
            );
            
        }

        else{

            return(

                <div id="header-component" className="component">
                    
                    <div id="site-title-container">

                        <div id="site-title">Babylon</div>

                    </div>
                    
                    <div id="greeting-date-time-container">

                        <div id="greeting">Hi User!</div>
                        <div id="auth-token-expiration-eta">Your authentication token expires in..</div>

                        <div id="header-date-time">Loading..</div>

                    </div>

                </div>
            );
        }
    }

    else
        return <Login />;
}

export default Header;