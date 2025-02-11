import { useEffect, useState } from "react";
import axios from "../utils/axios";

function handleLogIn(event, setErrorMessage){

    event.preventDefault();

    const formData = new FormData(event.target);

    const formDataObj = Object.fromEntries(formData.entries());
    const formDataStr = JSON.stringify(formDataObj);

    console.log(formDataStr);
    
    axios.post("/login", formDataStr)
        
        .then((response) => {
            
            if(response.data === "Login Successful!"){

                const errorLine2 = document.getElementsByClassName("error-line2");
                errorLine2[0].style.margin = "0px";

                const errorBlock = document.getElementById("login-error-container");

                errorBlock.classList.remove("showElement");
                errorBlock.classList.add("hideElement");             
            }
        })
    
        .catch((error) => {
            
            if(error.response.status === 400 && typeof(error.response.data) == "object"){

                let compiledErrorMessages = "";

                error.response.data.forEach((errorMessage) => {
                    compiledErrorMessages = compiledErrorMessages +  errorMessage.msg + "\n";
                });

                console.log(compiledErrorMessages);
                setErrorMessage(compiledErrorMessages);

                if(error.response.data.length > 1){

                    const errorLine2 = document.getElementsByClassName("error-line2");
                    errorLine2[0].style.marginTop = "5px";
                }

                else{
                    
                    const errorLine2 = document.getElementsByClassName("error-line2");
                    errorLine2[0].style.margin = "0px";
                }

                const errorBlock = document.getElementById("login-error-container");

                errorBlock.classList.remove("hideElement");
                errorBlock.classList.add("showElement");
            }

            else{

                setErrorMessage(error.response.data);

                const errorLine2 = document.getElementsByClassName("error-line2");
                errorLine2[0].style.margin = "0px";

                const errorBlock = document.getElementById("login-error-container");

                errorBlock.classList.remove("hideElement");
                errorBlock.classList.add("showElement");
            }
        });
}

function Login(){

    const [errorMessage, setErrorMessage] = useState();
    
    return(

        <div id="login-component" className="component">

            <div id="left-login-page-container">

                <div id="login-header">Babylon</div>
                <div id="login-header-info">Babylon helps you connect and share with the people in your life.</div>

            </div>

            <div id="right-login-page-container">

                <div id="login-form-container">

                    <div id="log-in-info-line1">Already a fellow Babylonian?</div>
                    <div id="log-in-info-line2">log right in!</div>
                    <br></br>

                    <form onSubmit={(event) => handleLogIn(event, setErrorMessage)}>

                        <input id="username-input" name="username" type="text" placeholder="Username"/>
                        <br></br>

                        <input id="password-input" name="password" type="text" placeholder="Password"/>
                        <br></br>

                        <button id="login-button">Log in</button>

                    </form>

                    <div id="login-error-container">
                    
                        <div className="error-line1">{errorMessage ? errorMessage : ""}</div>
                        <div className="error-line2">{errorMessage ? "Please try again!" : ""}</div>
                        
                    </div>

                </div>

                <div id="sign-up-info-container">

                    <div id="sign-up-info">Wanna be a Babylonian?</div>
                    <div id="sign-up-link"><a href="">Sign up</a></div>

                </div>

            </div>

        </div>
    );
}

export default Login;