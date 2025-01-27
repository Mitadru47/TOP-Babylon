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
                
                <Content />
                
                <Users />

            </div>

            <div className="page-bottom page-section">
                <Footer />

            </div>

        </div>
    );
}

export default Feed;