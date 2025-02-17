import Header from "./Header.jsx";

import LeftFooter from "./LeftFooter.jsx";
import RightFooter from "./RightFooter.jsx";

import Sidebar from "./Sidebar.jsx";
import Users from "./Users.jsx";

import Content from "./Content.jsx";

import axios from "axios";
import { BABYLON_SERVER_URL } from "../utils/urls";

import { useEffect, useState } from "react";

import { isLoggedIn } from "../utils/auth.js";
import Login from "./Login.jsx";

async function getPosts(setPosts){

    axios.get(BABYLON_SERVER_URL + "/posts")

        .then((response) => setPosts(response.data))
        .catch((error) => console.log(error));
}

function Feed(){

    if(isLoggedIn()){

        const [posts, setPosts] = useState();

        useEffect(() => {
            getPosts(setPosts);

        }, []);

        if(posts){

            return(

                <div id="feed-page" className="page">
                
                    <div className="page-top page-section">
                        <Header />
                    
                    </div>

                    <div className="page-middle page-section">

                        <div className="page-left-bottom page-section">

                            <Sidebar />
                            <LeftFooter />

                        </div>
                        
                        <div id="content-card-container">

                            {posts.map((post, index) => {
                                
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

                        </div>
                        
                        <div className="page-right-bottom page-section">

                            <Users />                   
                            <RightFooter />

                        </div>

                    </div>

                </div>
            );
        }

        else{

            return(
            
                <div id="feed-page" className="page">
                    
                    <div className="page-top page-section">
                        <Header />
                        
                    </div>

                    <div className="page-middle page-section">

                        <div className="page-left-bottom page-section">

                            <Sidebar />
                            <LeftFooter />

                        </div>

                        <div id="content-card-container">Loading..</div>

                        <div className="page-right-bottom page-section">

                            <Users />                   
                            <RightFooter />

                        </div>

                    </div>

                </div>
            
            );
        }
    }

    else
        return <Login />;
}

export default Feed;