import axios from "../utils/axios";
import Login from "./Login.jsx";

import Header from "./Header.jsx";

import LeftFooter from "./LeftFooter.jsx";
import RightFooter from "./RightFooter.jsx";

import LeftSidebar from "./LeftSidebar.jsx";
import RightSidebar from "./RightSidebar.jsx";

import PostCreator from "./PostCreator.jsx";
import Content from "./Content.jsx";

import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth.js";

import { POSTS_PER_PAGE } from "../utils/constants.js";

const postsPerPage = POSTS_PER_PAGE;

let totalPostCount = 0, pageNumber = 1, activeTimeoutFlag = false;
let globalPostIdSet = new Set(), globalPostsArr = [];

async function getTotalPostCount(){

    axios.post("/posts/count")

        .then((response) => totalPostCount = response.data)
        .catch((error) => console.log(error));
}

async function getPosts(updatePrimaryPostContainer, setLoaderStatus){

    const requestBody = JSON.stringify(
        { postsPerPage: postsPerPage, pageNumber: pageNumber });

    axios.post("/posts", requestBody)

        .then((response) => {
            
            response.data.forEach((post) => {

                if(!globalPostIdSet.has(post._id)){

                    globalPostIdSet.add(post._id);
                    globalPostsArr.push(post);
                }
            });

            updatePrimaryPostContainer({ posts: globalPostsArr });
            setLoaderStatus(false);
        })

        .catch((error) => console.log(error));
}

function infiniteScroll(updatePrimaryPostContainer, setLoaderStatus){

    const contentCardContainer = document.getElementById("content-card-container");
    const contentCards = document.getElementsByClassName("content-card");

    if(contentCardContainer.clientHeight + contentCardContainer.scrollTop >= contentCardContainer.scrollHeight - 1){
        
        if(contentCards.length === totalPostCount)
            setLoaderStatus(false);

        else if(!activeTimeoutFlag){

            setLoaderStatus(true);
            activeTimeoutFlag = true;

            setTimeout(() => { 

                pageNumber++;
                activeTimeoutFlag = false;

                getPosts(updatePrimaryPostContainer, setLoaderStatus);

            }, 2500)
        }
    }
}

function scrollTopFeed(){

    const contentCardContainer = document.getElementById("content-card-container");
    const feedContainer = document.getElementById("feed-container");
    
    contentCardContainer.scrollTop = 0;
    feedContainer.scrollTop = 0;
}

function scrollTopCreatePost(){

    const feedContainer = document.getElementById("feed-container");
    feedContainer.scrollTop = 0;
}

function Loader(){

    return(

        <div className="skeleton-content-card">
            Loading..
            
        </div>
    );
}

function Feed(){

    if(isLoggedIn()){

        const [primaryPostContainer, updatePrimaryPostContainer] = useState({ posts: [] });
        const [loaderStatus, setLoaderStatus] = useState(true);

        useEffect(() => {

            if(pageNumber === 1){

                getTotalPostCount();
                getPosts(updatePrimaryPostContainer, setLoaderStatus);
            }

            const contentCardContainer = document.getElementById("content-card-container");
            contentCardContainer.addEventListener("scroll", () => infiniteScroll(updatePrimaryPostContainer, setLoaderStatus));

            return () => {
                contentCardContainer.removeEventListener('scroll', () => infiniteScroll(updatePrimaryPostContainer, setLoaderStatus));
            };
        
        }, []);

        return(

            <div id="feed-page" className="page">
            
                <div className="page-top page-section">
                    <Header />
                
                </div>

                <div className="page-middle page-section">

                    <div className="page-left-bottom">

                        <LeftSidebar pageName="Your Feed" pageDescription="Crunching some cool stats.." />
                        <LeftFooter />

                    </div>
                    
                    <div id="feed-container">

                        <PostCreator />

                        <div id="content-card-container">

                            {primaryPostContainer && primaryPostContainer.posts.map((post, index) => {
                            
                                return(
                                
                                    <Content 
                                    
                                        id={post._id}
                                        key={"content" + (index + 1)}

                                        author={post.author.username} 
                                        date={post.momentDateEdited}

                                        title={post.title}
                                        body={post.body}

                                    />                           
                                );
                            })}

                            {loaderStatus && <Loader />}

                        </div>

                        <div id="scroll-top-buttons">

                            <div id="scroll-up-info">Scroll-Up Options</div>

                            <div id="scroll-up-buttons">

                                <button id="scroll-top-feed-button" onClick={scrollTopFeed}>Top of the Feed</button>
                                <button id="scroll-top-create-post-button" onClick={scrollTopCreatePost}>Create Post</button>

                            </div>

                        </div>

                    </div>

                    <div className="page-right-bottom">

                        <RightSidebar />                   
                        <RightFooter />

                    </div>

                </div>

            </div>
        );
    }

    else
        return <Login />;
}

export default Feed;