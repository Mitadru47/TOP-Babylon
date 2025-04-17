import axios from "../utils/axios";

import { isLoggedIn } from "../utils/auth";
import Login from "./Login";

async function handleSubmit(event){

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formDataJSON = Object.fromEntries(formData.entries());
	const formDataString = JSON.stringify(formDataJSON);

    if(isLoggedIn()){

        axios.post("/posts/create", formDataString)

            .then((response) => {

                if(response){

                }

                console.log(response);
                
            })

            .catch((error) => {
                
                console.log(error.response.data.error);
            
                if(error.response.data.status === "Failure!"){

                    // Parsing Error Text

                    let errorText = "";
                    error.response.data.error.map((errorEntry, index) => {
                        
                        console.log(errorEntry.msg);
                        
                        if(index === 0)
                            errorText = errorEntry.msg;

                        else
                            errorText = errorText + "\n" + errorEntry.msg

                        if(((error.response.data.error.length - 1) === index)){

                            if(index > 0) 
                                errorText = errorText + "\n\n\tPlease try again!";
    
                            else
                                errorText = errorText + "\nPlease try again!";
                        }
                    
                    });


                    console.log(errorText);
                    
                

                    const statusElement = document.querySelector("#post-creator-status");
                    statusElement.style.display = "flex";

                    const statusElementText = document.querySelector("#post-creator-status-right");
                    statusElementText.innerText= errorText;
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
                <div id="post-creator-status-right">{"Error Message\nPlease try again!"}</div>
                    
            </div>       

        </div>
    );
}

export default PostCreator;