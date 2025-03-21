import { isLoggedIn } from "../utils/auth";
import axios from "../utils/axios";

import { useState, useEffect } from "react";
import Login from "./Login";

const usernamesPerPage = 20;

let totalUserCount = 0, pageNumber = 1, activeTimeoutFlag = false;
let globalUsernameSet = new Set();

async function getTotalUserCount(){

    axios.get("/users/count")

        .then((response) => totalUserCount = response.data)
        .catch((error) => console.log(error));
}

async function getUserList(setUserList, setLoaderStatus){

    const requestBody = JSON.stringify(
        { usernamesPerPage: usernamesPerPage, pageNumber: pageNumber });

    axios.post("/users", requestBody)

        .then((response) => {
        
            response.data.forEach((username) => {

                if(!globalUsernameSet.has(username))
                    globalUsernameSet.add(username);
            });

            setUserList({ usernames: Array.from(globalUsernameSet) })
            setLoaderStatus(false);
        })
        
        .catch((error) => console.log(error));
}

function infiniteScroll(setUserList, setLoaderStatus){

    const userListContainer = document.querySelector("#user-list-container");
    const userListItems = document.querySelectorAll(".user-list-item");

    if(userListContainer.clientHeight + userListContainer.scrollTop >= userListContainer.scrollHeight - 1){

        if(userListItems.length === totalUserCount)
            setLoaderStatus(false);

        else if(!activeTimeoutFlag){

            setLoaderStatus(true);
            activeTimeoutFlag = true;

            setTimeout(() => {

                pageNumber++;
                activeTimeoutFlag = true;

                getUserList(setUserList, setLoaderStatus);

            }, 2500);
        }
    }
}

function Users(){

    if(isLoggedIn()){

        const [userList, setUserList] = useState();
        const [loaderStatus, setLoaderStatus] = useState(true);
        
        useEffect(() => {

            if(pageNumber === 1){

                getTotalUserCount();
                getUserList(setUserList, setLoaderStatus);
            }

            const userListContainer = document.querySelector("#user-list-container");
            userListContainer.addEventListener("scroll", () => infiniteScroll(setUserList, setLoaderStatus));

            return () => userListContainer.removeEventListener("scroll", () => infiniteScroll(setUserList, setLoaderStatus));

        }, []);

        return(

            <div id="users-component" className="component">
                
                <div id="user-list-header-container">
                
                    <div id="user-list-header">Fellow Babylonians</div>
                    
                </div>

                <div id="user-list-container">
                    
                    { userList && userList.usernames.map((user, index) => {
                        return(<div key={"user" + (index + 1)} className="user-list-item">{user}</div>); })}

                    { loaderStatus && "..." }

                </div>

            </div>
        );
    }

    else
        return <Login />;
}

export default Users;