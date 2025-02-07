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

                    <form>

                        <input id="username-input" type="text" placeholder="Username"/>
                        <br></br>

                        <input id="password-input" type="text" placeholder="Password"/>
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