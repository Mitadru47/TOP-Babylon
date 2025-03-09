import Header from "./Header.jsx";

import LeftFooter from "./LeftFooter.jsx";
import RightFooter from "./RightFooter.jsx";

import Sidebar from "./Sidebar.jsx";
import Users from "./Users.jsx";

import Loader from "./Loader.jsx";
import Content from "./Content.jsx";

import Login from "./Login.jsx";
import { useEffect, useState } from "react";

import axios from "../utils/axios";
import { isLoggedIn } from "../utils/auth.js";

const postsPerPage = 3;
let pageNumber = 1, activeTimeoutFlag = false, globalPostIdSet = new Set(), globalPostsArr = [];

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
        
        if(((pageNumber - 1) * postsPerPage) >= contentCards.length)
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

function Feed(){

    if(isLoggedIn()){

        const [primaryPostContainer, updatePrimaryPostContainer] = useState({ posts: [] });
        const [loaderStatus, setLoaderStatus] = useState(true);

        useEffect(() => {

            if(pageNumber === 1)
                getPosts(updatePrimaryPostContainer, setLoaderStatus);

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

                        <Sidebar />
                        <LeftFooter />

                    </div>
                    
                    <div id="content-card-container">

                        {primaryPostContainer && primaryPostContainer.posts.map((post, index) => {
                            
                            return(
                            
                                <Content 
                                
                                    key={"content" + (index + 1)}

                                    author={post.author.username} 
                                    date={post.dateEdited}

                                    title={post.title}
                                    body={post.body}

                                />                           
                            );
                        })}

                        {loaderStatus && <Loader />}

                    </div>

                    <div className="page-right-bottom">

                        <Users />                   
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