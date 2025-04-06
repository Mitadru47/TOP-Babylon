import axios from "../utils/axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { isLoggedIn } from "../utils/auth";

import Login from "./Login";
import Header from "./Header";

import LeftSidebar from "./LeftSidebar.jsx";

import LeftFooter from "./LeftFooter.jsx";
import RightFooter from "./RightFooter.jsx";


async function getPostCount(userId, setPostCount){

    const data = JSON.stringify({ authorId: userId });

    axios.post("/posts/count", data)

        .then((response) => setPostCount(response.data))
        .catch((error) => console.log(error));
}

async function getCommentCount(userId, setCommentCount){

    const data = JSON.stringify({ authorId: userId });

    axios.post("/comments/count", data)

        .then((response) => setCommentCount(response.data))
        .catch((error) => console.log(error));
}

async function getUserDetail(userId, setUserDetail){

    axios.get("/users/" + userId)

        .then((response) => setUserDetail(response.data))
        .catch((error) => console.log(error));
}

function UserDetail(){

    if(isLoggedIn()){

        const { userid: userId } = useParams();
        const [userDetail, setUserDetail] = useState();
        
        const [postCount, setPostCount] = useState();
        const [commentCount, setCommentCount] = useState();

        useEffect(() => {

            getPostCount(userId, setPostCount);
            getCommentCount(userId, setCommentCount);

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

                        <form id="user-detail-form">

                            <div className="user-detail-form-group">

                                <div id="dateJoined-container">

                                    <label className="user-detail-label" htmlFor="dateJoined">Date Joined</label> <br></br>
                                    <input id="dateJoined" className="user-detail-input" name="dateJoined" placeholder=".." defaultValue={userDetail && userDetail.dateJoined} disabled/>

                                </div>

                                <div id="email-container">
                            
                                    <label className="user-detail-label" htmlFor="email">Email</label> <br></br>
                                    <input id="email" className="user-detail-input" name="email" placeholder=".." defaultValue={userDetail && userDetail.email}/>
                                
                                </div>

                            </div>

                            <div className="user-detail-form-group">

                                <div id="firstName-container">
                                
                                    <label className="user-detail-label" htmlFor="firstName">First Name</label> <br></br>
                                    <input id="firstName" className="user-detail-input" name="firstName" placeholder=".." defaultValue={userDetail && userDetail.firstName}/>
                                
                                </div>

                                <div id="lastName-container">
                                
                                    <label className="user-detail-label" htmlFor="lastName">Last Name</label> <br></br>
                                    <input id="lastName" className="user-detail-input" name="lastName" placeholder=".." defaultValue={userDetail && userDetail.lastName}/>
                                
                                </div>

                            </div>

                            <div className="user-detail-form-group">

                                <div id="username-container">
                                
                                    <label className="user-detail-label" htmlFor="username">Username</label> <br></br>
                                    <input id="username" className="user-detail-input" name="username" placeholder=".." defaultValue={userDetail && userDetail.username}/>
                                
                                </div>

                                <div id="password-container">
                                
                                    <label className="user-detail-label" htmlFor="password">Password</label> <br></br>
                                    <input id="password" className="user-detail-input" name="password" placeholder=".." defaultValue={userDetail && userDetail.password}/>
                                
                                </div>

                            </div>

                            <br></br>
                            <br></br>

                            <div className="user-detail-form-buttons">

                                <button id="user-detail-update-button">Update Details</button>
                                <button id="user-detail-delete-button">Terminate Citizenship</button>

                            </div>

                        </form>

                    </div>

                    <div className="page-right-bottom">

                        <div id="right-sidebar-component" className="component">

                            <div id="user-stats-header-container">
                        
                                <div id="user-stats-header">Deeds from your time in Babylon</div>
                        
                            </div>

                            <div id="user-stats-container">
                    
                                <div className="user-stats-item">Posts: {postCount || "0"}</div>
                                <div className="user-stats-item">Comments: {commentCount || "0"}</div>

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