import axios from "../utils/axios";
import { useState, useEffect } from "react";

async function getUserList(setUserList, setLoaderStatus){

    axios.get("/users")

        .then((response) => {
        
            setUserList(response.data)
            setLoaderStatus(false);
        })
        .catch((error) => console.log(error));
}

function Users(){

    const [userList, setUserList] = useState();
    const [loaderStatus, setLoaderStatus] = useState(true);
    
    useEffect(() => {
        getUserList(setUserList, setLoaderStatus);

    }, []);

    return(

        <div id="users-component" className="component">
            
            <div id="user-list-header-container">
            
                <div id="user-list-header">Fellow Babylonians</div>
                
            </div>

            <div id="user-list-container">
                
                { userList && userList.map((user, index) => {
                    return(<div key={"user" + (index + 1)} className="user-list">{user}</div>); })}

                { loaderStatus && "Loading.." }

            </div>

        </div>
    );
}

export default Users;