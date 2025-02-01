import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import Sidebar from "./Sidebar.jsx";
import Users from "./Users.jsx";

import Content from "./Content.jsx";

function Feed(){
    return(

        <div id="feed-page" className="page">
        
            <div className="page-top page-section">
                <Header />
            
            </div>

            <div className="page-middle page-section">

                <Sidebar />
                
                <div id="content-card-container">

                    <Content 
                    
                        author="Ned" 
                        date="Tue Jan 28 2025 19:24:51 GMT+0530 (India Standard Time)"

                        title="Eddard To Arya Stark"
                        body="When the snows fall and the white winds blow, the lone wolf dies, but the pack survives."

                    />

                    <Content 
                    
                        author="LordOfCasterlyRock" 
                        date="Tue Jan 28 2025 19:24:51 GMT+0530 (India Standard Time)"

                        title="Tywin To Tyrion Lannister"
                        body="The greatest fools are ofttimes more clever than the men who laugh at them."
                                
                    />

                    {/* <Content 
                    
                        author="MaceTheAce" 
                        date="Tue Jan 28 2025 19:24:51 GMT+0530 (India Standard Time)"

                        title="Mace to Joffrey I Baratheon"
                        body="Is there anything as pointless as a king without a kingdom? No, it's plain, the boy must abandon the riverlands, join his forces to Roose Bolton's once more, and throw all his strength against Moat Cailin. That is what I would do."
                                
                    />

                    <Content 
                    
                        author="Ned" 
                        date="Tue Jan 28 2025 19:24:51 GMT+0530 (India Standard Time)"

                        title="Eddard To Robb Stark"
                        body="Know the men who follow you and let them know you. Don't ask your men to die for a stranger."

                    /> */}

                </div>
                
                <Users />

            </div>

            <div className="page-bottom page-section">
                <Footer />

            </div>

        </div>
    );
}

export default Feed;