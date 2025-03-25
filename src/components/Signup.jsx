import axios from "../utils/axios";

import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";

import { useNavigate } from "react-router-dom";

function handleSignUp(event, setApiResponse){

    event.preventDefault();

    const formData = new FormData(event.target);

    const formDataObj = Object.fromEntries(formData.entries());
    const formDataStr = JSON.stringify(formDataObj);

    axios.post("/signup", formDataStr)
        
        .then((response) => {
            
            if(response.status === 200){

                const errorLine2 = document.getElementsByClassName("error-line2");
                errorLine2[0].style.margin = "0px";

                const errorBlock = document.getElementById("signup-error-container");

                errorBlock.classList.remove("showElement");
                errorBlock.classList.add("hideElement");

                setApiResponse("Registered with no errors");
            }

            else
                console.log(response);
        })
    
        .catch((error) => {
            
            console.log(error);

            if(error.response.status === 400 && typeof(error.response.data) == "object"){

                let compiledErrorMessages = "";

                error.response.data.forEach((errorMessage) => {
                    compiledErrorMessages = compiledErrorMessages +  errorMessage.msg + "\n";
                });

                if(error.response.data.length > 1){

                    const errorLine2 = document.getElementsByClassName("error-line2");
                    errorLine2[0].style.marginTop = "5px";
                }

                else{

                    const errorLine2 = document.getElementsByClassName("error-line2");
                    errorLine2[0].style.margin = "0px";
                }

                const errorBlock = document.getElementById("signup-error-container");

                errorBlock.classList.remove("hideElement");
                errorBlock.classList.add("showElement");

                setApiResponse(compiledErrorMessages);
            }

            else{

                const errorLine2 = document.getElementsByClassName("error-line2");
                errorLine2[0].style.margin = "0px";

                const errorBlock = document.getElementById("signup-error-container");

                errorBlock.classList.remove("hideElement");
                errorBlock.classList.add("showElement");

                setApiResponse(error.response.data);
            }
        }
    );
}

function Signup(){

    const navigate = useNavigate();
    const [apiResponse, setApiResponse] = useState();

    useEffect(() => {

        if(isLoggedIn())
            navigate("/");

        if(apiResponse === "Registered with no errors")
            navigate("/login");

    }, [apiResponse]);

    return(

        <div id="signup-component" className="component">

            <div id="left-signup-page-container">

                <div id="signup-header">Babylon</div>
                <div id="signup-header-info">Babylon helps you connect and share with the people in your life.</div>

            </div>

            <div id="right-signup-page-container">

                <div id="signup-form-container">

                    <div id="sign-up-info-line1">Wanna be a Babylonian?</div>
                    <div id="sign-up-info-line2">sign right up!</div>
                    <br></br>

                    <form onSubmit={(event) => handleSignUp(event, setApiResponse)}>

                        <input id="firstName-input" name="firstName" type="text" placeholder="FirstName"/>
                        <br></br>

                        <input id="lastName-input" name="lastName" type="text" placeholder="LastName"/>
                        <br></br>

                        <input id="email-input" name="email" type="text" placeholder="Email"/>
                        <br></br>

                        <input id="username-input" name="username" type="text" placeholder="Username"/>
                        <br></br>

                        <input id="password-input" name="password" type="text" placeholder="Password"/>
                        <br></br>

                        <button id="signup-button">Sign up</button>

                    </form>

                    <div id="signup-error-container">
                    
                        <div className="error-line1">{apiResponse ? apiResponse : ""}</div>
                        <div className="error-line2">{apiResponse ? "Please try again!" : ""}</div>
                        
                    </div>

                </div>

                <div id="sign-up-info-container">

                    <div id="sign-up-info">Already a fellow Babylonian?</div>
                    <div id="sign-up-link"><a href="/login">Log in</a></div>

                </div>

            </div>

        </div>
    );
}

export default Signup;