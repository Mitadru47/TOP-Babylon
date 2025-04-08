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

async function getPostDetail(postId, setPostCount, setCommentCount, setPostDetail){

    axios.get("/posts/" + postId)

        .then((response) => {
            
            getPostCount(response.data.author._id, setPostCount);
            getCommentCount(response.data.author._id, setCommentCount);
            
            setPostDetail(response.data);
        })
        
        .catch((error) => console.log(error));
}

function PostDetail(){

    if(isLoggedIn()){

        const { postid: postId } = useParams();
        const [postDetail, setPostDetail] = useState();

        const [postCount, setPostCount] = useState();
        const [commentCount, setCommentCount] = useState();

        useEffect(() => { getPostDetail(postId, setPostCount, setCommentCount, setPostDetail); }, []);

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

                        <div id="post-detail">

                            <div id="post-detail-top-section">

                                <div id="post-detail-title">{postDetail && postDetail.title}</div>
                                <div id="post-detail-body">{postDetail && postDetail.body}</div>

                            </div>
                           
                            <div id="post-detail-bottom-section">

                                <div id="post-detail-author">Authored By: {postDetail && postDetail.author.username}</div>

                                <div id="post-detail-dates">

                                    <div id="post-detail-created">Created: {postDetail && postDetail.dateCreated}</div>

                                    <div id="post-detail-edited">
                                        
                                        {postDetail && (postDetail.dateEdited === postDetail.dateCreated ? 
                                            "Never Edited" : `Last Edited: ${postDetail && postDetail.dateEdited}`)}
                                        
                                    </div>

                                </div>

                            </div>
                            
                        </div>

                        <div id="comment-section">
                                    
                            <div id="comment-creator"></div>
                            <div id="comment-container"></div>

                        </div>

                        
                    </div>


                    <div className="page-right-bottom">

                        <div id="right-sidebar-component" className="component">

                            <div id="author-stats-header-container">
                        
                                <div id="author-stats-header">This Babylonian's Accomplishments</div>
                        
                            </div>

                            <div id="author-stats-container">
                    
                                <div className="author-stats-item">Posts: {postCount || "0"}</div>
                                <div className="author-stats-item">Comments: {commentCount || "0"}</div>

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