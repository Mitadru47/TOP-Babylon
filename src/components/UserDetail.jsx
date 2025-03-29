import axios from "../utils/axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { isLoggedIn } from "../utils/auth";

import Login from "./Login";
import Header from "./Header";

import LeftSidebar from "./LeftSidebar.jsx";

import LeftFooter from "./LeftFooter.jsx";
import RightFooter from "./RightFooter.jsx";

import { USERNAMES_PER_PAGE } from "../utils/constants";

const usernamesPerPage = USERNAMES_PER_PAGE;
const placeholderList = [];

for(let i=0; i<usernamesPerPage; i++)
    placeholderList.push("...");

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

                        <LeftSidebar pageName="Your Profile" pageDescription="Your Babylonian citizenship papers" />
                        <LeftFooter />

                    </div>
                    
                    <div id="user-detail-container">

                        {userDetail && "Loading.."}

                    </div>

                    <div className="page-right-bottom">

                        <div id="right-sidebar-component" className="component">

                            <div id="user-list-container">
                    
                                { placeholderList.map((placeholder, index) => {
                                return(<div key={"user" + (index + 1)} className="user-list-item">{placeholder}</div>); })}

                            </div>

                        </div>

                        <RightFooter />

                    </div>

                </div>

            </div>
        );
    }

    else
        return <Login />
}

export default UserDetail;