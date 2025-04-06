import axios from "../utils/axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { isLoggedIn } from "../utils/auth";

import Login from "./Login";
import Header from "./Header";

import LeftSidebar from "./LeftSidebar.jsx";

import LeftFooter from "./LeftFooter.jsx";
import RightFooter from "./RightFooter.jsx";

async function getPostDetail(postId, setPostDetail){

    axios.get("/posts/" + postId)

        .then((response) => setPostDetail(response.data))
        .catch((error) => console.log(error));
}

function PostDetail(){

    if(isLoggedIn()){

        const { postid: postId } = useParams();
        const [postDetail, setPostDetail] = useState();

        useEffect(() => { getPostDetail(postId, setPostDetail); }, []);

        return(

            <div id="post-detail-page" className="page">
            
                <div className="page-top page-section">
                    <Header />
                
                </div>

                <div className="page-middle page-section">

                    <div className="page-left-bottom">

                        <LeftSidebar 
                        
                            pageName="Your Requested Post" 
                            pageDescription={`You are browsing 
                                
                                ${(postDetail && (localStorage.getItem("uid") === postDetail.author._id ? "your own" : postDetail.author.username + "'s")) 
                                    || "a Babylonian's"} post`} />
                        
                        <LeftFooter />

                    </div>
                    
                    <div id="post-detail-container">

                        {postDetail && postDetail.title}

                    </div>

                    <div className="page-right-bottom">

                        <div id="right-sidebar-component" className="component">

                            <div id="author-stats-header-container">
                        
                                <div id="author-stats-header">This Babylonian's Accomplishments</div>
                        
                            </div>

                            <div id="author-stats-container">
                    
                                <div className="author-stats-item">Posts: {"0"}</div>
                                <div className="author-stats-item">Comments: {"0"}</div>

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

export default PostDetail;