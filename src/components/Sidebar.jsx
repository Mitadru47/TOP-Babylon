import axios from "../utils/axios";
import { useEffect, useState } from "react";

import { POSTS_PER_PAGE } from "../utils/constants";
import { logOut } from "../utils/auth";

async function getTotalUserCount(setUserCount){

    axios.get("/users/count")

        .then((response) => setUserCount(response.data))
        .catch((error) => console.log(error));
}

function getPostCount(setPostCount){
        
    const contentCards = document.getElementsByClassName("content-card");
    setPostCount(contentCards.length);
}

function Sidebar(){

    const [userCount, setUserCount] = useState();
    const [postCount, setPostCount] = useState(POSTS_PER_PAGE);

    useEffect(() => {

        getTotalUserCount(setUserCount);

        const contentCardContainer = document.getElementById("content-card-container");
        contentCardContainer.addEventListener("scroll", () => getPostCount(setPostCount));

        return () => {
            contentCardContainer.removeEventListener('scroll', () => getPostCount(setPostCount));
        };

    }, []);

    return(

        <div id="sidebar-component" className="component">
            
            <div id="top-info-container">

                <div id="posts-count">Posts Rendered: { postCount || ".." }</div>
                <div id="users-count">Total Babylonian Population: { userCount || ".." }</div>

                <hr></hr>

            </div>

            <div id="sidebar-user-buttons-container">

                <div id="user-buttons-group1">

                    <div id="my-profile-button-container">

                        <a href="">My Profile</a>

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

export default Sidebar;