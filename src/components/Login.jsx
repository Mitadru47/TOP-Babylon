import axios from "../utils/axios";

function handleLogIn(event){

    event.preventDefault();

    const formData = new FormData(event.target);

    const formDataObj = Object.fromEntries(formData.entries());
    const formDataStr = JSON.stringify(formDataObj);

    console.log(formDataStr);
    
    axios.post("/login", formDataStr)
        
        .then((response) => {
            console.log(response.data);

        })
    
        .catch((error) => console.log(error.response.data));
}

function Login(){

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

                    <form onSubmit={handleLogIn}>

                        <input id="username-input" name="username" type="text" placeholder="Username"/>
                        <br></br>

                        <input id="password-input" name="password" type="text" placeholder="Password"/>
                        <br></br>

                        <button id="login-button">Log in</button>

                    </form>

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