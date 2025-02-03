import { useState, useEffect } from "react";

import axios from "axios";
import { BABYLON_SERVER_URL } from "../utils/urls";

async function getUserList(setUserList){

    axios.get(BABYLON_SERVER_URL + "/users")

        .then((response) => setUserList(response.data))
        .catch((error) => console.log(error));
}

function Users(){

    const [userList, setUserList] = useState();
    
    useEffect(() => {
        getUserList(setUserList);

    }, []);

    if(userList){

        return(

            <div id="users-component" className="component">
                
                <div id="user-list-header-container">
                
                    <div id="user-list-header">Fellow Babylonians</div>
                    
                </div>

                <div id="user-list-container">
                    
                    { userList.map((user, index) => {
                        return(<div key={"user" + (index + 1)} className="user-list">{user}</div>); })}

                </div>
    
            </div>
        );
    }

    else
        return(<div id="users-component" className="component">Loading..</div>);
}

export default Users;