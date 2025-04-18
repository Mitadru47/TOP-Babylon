import axios from "../utils/axios";

import { isLoggedIn } from "../utils/auth";
import Login from "./Login";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BABYLON_URL } from "../utils/constants";

async function handleSubmit(event){

    event.preventDefault();

    const submitButton = document.querySelector("#post-creator-submit-button");
    submitButton.disabled = true;

    const formData = new FormData(event.currentTarget);

    const formDataJSON = Object.fromEntries(formData.entries());
	const formDataString = JSON.stringify(formDataJSON);

    if(isLoggedIn()){

        axios.post("/posts/create", formDataString)

            .then((response) => {

                console.log(response.data);
                
                if(response.data.status === "Success!"){
                    
                    const statusElement = document.querySelector("#post-creator-status");
                    statusElement.style.display = "flex";

                    const statusElementText = document.querySelector("#post-creator-status-right");

                    statusElementText.style.color = "black";
                    statusElementText.innerText = "Post Creation Successful!\n";
                    
                    const newPostInfo = document.createElement("span");
                    
                    newPostInfo.style.fontSize = "0.65rem";
                    newPostInfo.innerText = "Post ID: " + response.data.id;
                    
                    statusElementText.appendChild(newPostInfo);
                    setTimeout(() => window.location.href = BABYLON_URL, 2000);
                }
            })

            .catch((error) => {
                
                submitButton.disabled = false;
                console.log(error.response.data.error);
            
                if(error.response.data.status === "Failure!"){

                    let errorText = "";
                    error.response.data.error.map((errorEntry, index) => {
                        
                        if(index === 0)
                            errorText = errorEntry.msg;

                        else
                            errorText = errorText + "\n" + errorEntry.msg

                        if(((error.response.data.error.length - 1) === index)){

                            if(index > 0) 
                                errorText = errorText + "\n\nPlease try again!";
    
                            else
                                errorText = errorText + "\nPlease try again!";
                        }
                    
                    });

                    const statusElement = document.querySelector("#post-creator-status");
                    statusElement.style.display = "flex";

                    const statusElementText = document.querySelector("#post-creator-status-right");

                    statusElementText.style.color = "brown";
                    statusElementText.innerText = errorText;
                }
            })
    }

    else
        return <Login />
}

function PostCreator(props){

    return(

        <div id="post-creator">

            <div id="post-creator-header">Create a Post</div>

            <form id="post-creator-form" onSubmit={handleSubmit}>
                
                <div id="post-creator-top">

                    <input id="post-creator-title" name="title" placeholder="Title"/>
                    <textarea rows={4} cols={50} id="post-creator-body" name="body" placeholder="Start composing.."/>

                </div>

                <div id="post-creator-bottom">

                    <div id="post-author-container">

                        <label className="authorid-label" htmlFor="author">Author ID:</label> <br></br>
                        <input id="author" name="author" defaultValue={localStorage.getItem("uid")} readOnly/>

                    </div>
                    
                    <div id="post-creator-buttons">

                        <button id="post-creator-submit-button" type="submit">Create</button>
                        <button id="post-creator-reset-button" type="reset">Reset</button>

                    </div>

                </div>
                
            </form>

            <div id="post-creator-status" style={{display: "none"}}>

                <div id="post-creator-status-left">Operation Status</div>
                <div id="post-creator-status-right"></div>
                    
            </div>       

        </div>
    );
}

export default PostCreator;