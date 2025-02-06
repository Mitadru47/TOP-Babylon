import { useEffect, useState } from "react";

function Header(){
    
    const [ timestamp, setTimestamp ] = useState();

    useEffect(() => {

        const intervalID = setInterval(() => {
            setTimestamp(() => new Date().toString());

        }, 1000);

        return () => {
            clearInterval(intervalID);
        }

    }, []);

    if(timestamp){
    
        return(

            <div id="header-component" className="component">
                
                <div id="site-title-container">

                    <div id="site-title">Babylon</div>

                </div>
                
                <div id="greeting-date-time-container">

                    <div id="greeting">Hi User!</div>
                    <div id="header-date-time">{timestamp}</div>

                </div>

            </div>
        );
    }

    else{

        return(

            <div id="header-component" className="component">
                
                <div id="site-title-container">

                    <div id="site-title">Babylon</div>

                </div>
                
                <div id="greeting-date-time-container">

                    <div id="greeting">Hi User!</div>
                    <div id="header-date-time">Loading..</div>

                </div>

            </div>
        );
    }
}

export default Header;