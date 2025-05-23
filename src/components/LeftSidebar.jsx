import axios from "../utils/axios.js";
import Login from "./Login.jsx";

import { useEffect, useState } from "react";
import { isLoggedIn, logOut } from "../utils/auth.js";

async function getTotalUserCount(setUserCount){

    axios.get("/users/count")

        .then((response) => setUserCount(response.data))
        .catch((error) => console.log(error));
}

function getPostCount(setPostCount){
        
    const contentCards = document.getElementsByClassName("content-card");
    setPostCount(contentCards.length);
}

function LeftSidebar(props){

    if(isLoggedIn()){

        const [userCount, setUserCount] = useState();
        const [postCount, setPostCount] = useState();

        useEffect(() => {

            if(props.pageName.includes("Feed")){
            
                getTotalUserCount(setUserCount);

                const contentCardContainer = document.getElementById("content-card-container");
                contentCardContainer.addEventListener("scroll", () => getPostCount(setPostCount));

                return () => {
                    contentCardContainer.removeEventListener('scroll', () => getPostCount(setPostCount));
                };
            }

        }, []);

        return(

            <div id="left-sidebar-component" className="component">
                
                <div id="top-info-container">

                    <div id="left-sidebar-info-line1">
                        {(postCount && "Your Feed has " + postCount + " posts") || props.pageName}
            
                    </div>
                        
                    <div id="left-sidebar-info-line2">
                        {(userCount && "Total Babylonian Population: " + (userCount || "..")) || props.pageDescription}
                           
                    </div>

                    <hr></hr>

                </div>

                <div id="left-sidebar-user-buttons-container">

                    <div id="user-buttons-group1">

                        <div id="my-profile-button-container">

                            <a href={"/users/" + localStorage.getItem("uid")}>My Profile</a>

                        </div>

                        <div id="my-posts-button-container">

                            <a href="">My Posts</a>

                        </div>

                        <div id="my-comments-button-container">

                            <a href="">My Comments</a>

                        </div>

                        <div id="archived-posts-button-container">

                            <a href="">My Archived Posts</a>

                        </div>

                    </div>
                    
                    <div id="user-buttons-group2">

                        <a href="/login" onClick={() => logOut()}>Log out</a>

                    </div>

                </div>
                
            </div>
        );
    }

    else
        return <Login />;
}

export default LeftSidebar;