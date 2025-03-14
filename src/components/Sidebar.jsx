import axios from "../utils/axios";
import { useEffect, useState } from "react";

async function getTotalUserCount(setUserCount){

    axios.get("/users/count")

        .then((response) => setUserCount(response.data))
        .catch((error) => console.log(error));
}

async function getTotalPostCount(setPostCount){

    axios.get("/posts/count")

        .then((response) => setPostCount(response.data))
        .catch((error) => console.log(error));
}

function Sidebar(){

    const [userCount, setUserCount] = useState();
    const [postCount, setPostCount] = useState();

    useEffect(() => {

        getTotalUserCount(setUserCount);
        getTotalPostCount(setPostCount);

    }, []);

    if(userCount && postCount){

        return(

            <div id="sidebar-component" className="component">
                
                <div id="top-info-container">

                    <div id="posts-count">Total Posts: {postCount}</div>
                    <div id="users-count">Total Users: {userCount}</div>

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

                        <a href="">Log out</a>

                    </div>

                </div>
                
            </div>
        );
    }

    else{

        return(

            <div id="sidebar-component" className="component">
                
                <div id="top-info-container">

                    <div id="posts-count">Total Posts: Loading..</div>
                    <div id="users-count">Total Users: Loading..</div>

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

                        <a href="">Log out</a>

                    </div>

                </div>
                
            </div>
        );
    }
}

export default Sidebar;