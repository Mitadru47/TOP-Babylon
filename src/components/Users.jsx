import { useState, useEffect } from "react";
import axios from "axios";

async function getUserList(setUserList){

    axios.get("http://localhost:3000/users")

        .then((response) => setUserList(response.data))
        .catch((error) => console.log(error));
}

function Users(){

    const [userList, setUserList] = useState();
    
    useEffect(() => {
        getUserList(setUserList);

    }, []);

    console.log(userList);

    if(userList){

        return(

            <div id="users-component" className="component">
                
                <div id="user-list-header-container">
                
                    <div id="user-list-header">Fellow Babylonians</div>
                    
                </div>

                <div id="user-list-container">
                    
                    { userList.map((user, index) => {
                        return(<div key={"user" + (index + 1)} className="user-list">{user.username}</div>); })}

                </div>
    
            </div>
        );
    }

    else
        return(<div id="users-component" className="component">Loading..</div>);
}

export default Users;