import axios from "../utils/axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { isLoggedIn } from "../utils/auth";

import Login from "./Login";
import Header from "./Header";

import LeftFooter from "./LeftFooter.jsx";
import Sidebar from "./Sidebar.jsx";

async function getUserDetail(userId, setUserDetail){

    axios.get("/users/" + userId)

        .then((response) => setUserDetail(response.data))
        .catch((error) => console.log(error));
}

function UserDetail(){

    if(isLoggedIn()){

        const { userid: userId } = useParams();
        const [ userDetail, setUserDetail ] = useState();

        useEffect(() => {
            getUserDetail(userId, setUserDetail);

        }, []);

        return(

            <div id="user-detail-page" className="page">
            
                <div className="page-top page-section">
                    <Header />
                
                </div>

                <div className="page-middle page-section">

                    <div className="page-left-bottom">

                        <Sidebar pageName="Your Profile" pageDescription="Your Babylonian citizenship papers." />
                        <LeftFooter />

                    </div>
                    
                    <div id="user-detail-container">

                        {userDetail && "Loading.."}

                    </div>

                </div>

            </div>
        );
    }

    else
        return <Login />
}

export default UserDetail;